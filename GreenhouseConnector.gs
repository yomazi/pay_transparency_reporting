const JOB_BOARD_BASE_URL = "https://boards-api.greenhouse.io/v1/boards/";

/*
 * This encoded API key can ONLY be used for accessing the GET endpoint(s) required by this script.
 * Trying to access any other Harvest endpoint will result in a HTTP 403 error (client is not authorized.)
 */

const ENCODED_API_KEY = "ZDE0NWQyZGUyZTZhZWQ1ZmE2MTgwZTBjMDJhMTA0MDEtNDo=";
const SANDBOX_ENCODED_API_KEY = "Y2VmNjQxYjBlYjE4NTU0ZjQ5OWUwNWEzNDVlNmY4YTMtNDo=";

class GreenhouseConnector {
  constructor(settings) {
    this._settings = settings;
    const shouldUseSandbox = !!(settings.getValue("greenhouseEnvironment") === "sandbox");
    
    this._apiKey = (shouldUseSandbox) ? SANDBOX_ENCODED_API_KEY : ENCODED_API_KEY;
    this._pzr = new PayZoneReference();
    this._smr = new SalaryMapReference();
  }

  _buildUrlParameters(params = {}) {
    const keys = Object.keys(params);
    const allParameters = keys.map(key => `${key}=${params[key]}`);   
    const joinedParameters = allParameters.join('&');

    return joinedParameters;
  }

  _fetch(requestUrl, getParams = {}) {
    Logger.log(`pay_transparency_reporting:GreenhouseConnector:_fetch(): ${requestUrl}`);
    const parameters = this._buildUrlParameters(getParams);
    const url = `${requestUrl}?${parameters}`;
    const response = UrlFetchApp.fetch(url);

    return JSON.parse(response.getContentText());
  }

  _getGreenhouseJob(jobId) {
    const url = `https://harvest.greenhouse.io/v1/jobs/${jobId}`;  
    const headers = {
        Authorization: `Basic ${this._apiKey}`,
    };
    const json = arcanite.doGet(url, headers);
    
    const customFields = json.custom_fields  ?? {};  
    const hiringTeam =  json.hiring_team ?? {};
 
    const profileData = this._getJobProfileData(customFields.job_profile); 
    const salaryRange = this._getSalaryRange(customFields.salary_range);
    const officeList = this._getOfficeList(json.offices);
    const primaryRecruiter = this._getPrimaryRecruiter(hiringTeam);

    const job = {
      isProspectPost: false,
      id: json.id,
      reqId:json.requisition_id,
      name: json.name,
      ...profileData,
      level: customFields.job_level ?? "",
      salaryRange,
      officeList,
      primaryRecruiter,
      openReason: customFields.open_reason ?? "",
      companyName: customFields.company_name ?? "",
    };    

    return job;
  }

  _getJobStub() {

    const job = {
      isProspectPost: true,
      id: "",
      reqId:"",
      name: "",
      profile: "",
      profileCode: "",
      profileName: "",
      level: "",
      salaryRange: "",
      officeList: "",
      primaryRecruiter: "",
      openReason: "",
      companyName: "",
    };    

    return job;
  }

  _getJob(jobId) {
    const job = jobId ? this._getGreenhouseJob(jobId) : this._getJobStub();

    return job;  
  }

  _getOfficeList(officeData) {
    const jobOffices = officeData || [];
    const officeList = jobOffices.map(descriptor => descriptor.name);
    const offices = officeList.join(', ');

    return offices;
  }

  _getPrimaryRecruiter(hiringTeam) {
    const recruiters = hiringTeam?.recruiters ?? [];
    const primaryRecruiter = recruiters.length ? recruiters[0].name : "";

    return primaryRecruiter;
  }

  _getSalaryRange(range) {
    const salaryMin = range ? range.min_value : "(not found)";
    const salaryMax = range ? range.max_value : "(not found)";
    const currency = range ? range.unit : "(not found)";
    const salaryRange = `${salaryMin} - ${salaryMax} ${currency}`;

    return salaryRange;
  }

  _getJobProfileData(jobProfile) {
    const profile = jobProfile || "";
    const [profileCode, profileName] = profile.split(" - ");
    return {
      profile, profileCode, profileName
    };
  }

  _isPostLocationUnitedStates(location) {
    const unitedStates = Strings.UNITED_STATES.toLowerCase();
    const isPostLocationUnitedStates = location.toLowerCase().indexOf(unitedStates) === 0;

    return isPostLocationUnitedStates;
  }

  _isPostLocationFromJobReq(location) {
    const fromJobRequisition = Strings.FROM_JOB_REQUISITION.toLowerCase();
    const isPostLocationFromJobReq = location.toLowerCase().indexOf(fromJobRequisition) === 0;

    return isPostLocationFromJobReq;
  }

  _isJobOfficeUSA(office) { 
    const usa = Strings.USA.toLowerCase();
    const isJobOfficeUSA = office.toLowerCase().indexOf(usa) === 0;

    return isJobOfficeUSA;    
  }

  _getPayTransparencyData(post) {
    const isPostUnitedStates = this._isPostLocationUnitedStates(post.location);
    const isPostFromJobReq = this._isPostLocationFromJobReq(post.location);
    const isOfficeUSA = this._isJobOfficeUSA(post.job.officeList);
    
    const shouldCheckPayTransparency = isPostUnitedStates || (isPostFromJobReq && isOfficeUSA);

    if (shouldCheckPayTransparency) {
      let zone = undefined;
      
      if (isPostUnitedStates) {
        zone = this._pzr.getZoneByLocation(post.location) || Strings.NEEDS_UPDATED_LOCATION;
      } else if (isPostFromJobReq && isOfficeUSA) {
        zone = this._pzr.getZoneByOffice(post.job.officeList) || Strings.NEEDS_UPDATED_LOCATION;
      }

      const annotatedContent = this._annotateContent(post.content);

      return {
        payTransparencyUpdated: annotatedContent.hasPayTransparency ? Strings.YES : Strings.NO,
        payRangeStart: annotatedContent.payStart || "",
        payRangeEnd: annotatedContent.payEnd || "",
        currency: annotatedContent.currency || "",
        zone: zone
      }
    }

    return {
      payTransparencyUpdated: Strings.NA,
      payRangeStart: "",
      payRangeEnd: "",
      currency: "",
      zone: Strings.NA
    }
  }

  _getCompGradeProfileData(profileCode, payZone) {
    const isProfileCodeValid = !!profileCode;
    const isPayZoneValid = (payZone !== Strings.NA && payZone !== Strings.NEEDS_UPDATED_LOCATION);
    const key = (isProfileCodeValid && isPayZoneValid) ? `${profileCode}_${payZone}` : "";
    const smr = this._smr;
    const rangeData = key ? smr.getCorrectSalaryRange(key) : {};
    const cgp = {
      compGradeProfile: key,
      correctPayRangeCurrency: rangeData.currency ?? "",
      correctPayRangeMinimum: rangeData.min ?? "",
      correctPayRangeMedian: rangeData.mid ?? "",
      correctPayRangeMaximum: rangeData.max ?? ""
    };

    return cgp;
  }

  _normalizeCurrencyString(currencyString) {
    const originalString = `${currencyString}` ?? "";
    Logger.log(`currencyString is "${currencyString}"; originalString is "${originalString}"`);
    const ungroupedCurrencyString = originalString.replace(/[^0-9.-]+/g,"");

    const formatter = new Intl.NumberFormat('en-US', { 
      style: "decimal", 
      useGrouping: false, 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });

    const normalizedCurrencyString = formatter.format(ungroupedCurrencyString);

    return normalizedCurrencyString;
  }

  _isPayRangeCorrect(ptd, cgp) {
    if (ptd.payTransparencyUpdated === Strings.NA) {
      return Strings.NA;
    }

    if (ptd.payTransparencyUpdated === Strings.NO) {
      return Strings.PAY_TRANSPARENCY_NOT_YET_UPDATED;
    }

    const payRangeStart = this._normalizeCurrencyString(ptd.payRangeStart);
    const payRangeEnd = this._normalizeCurrencyString(ptd.payRangeEnd);
    const correctPayRangeMinimum = this._normalizeCurrencyString(cgp.correctPayRangeMinimum);
    const correctPayRangeMaximum = this._normalizeCurrencyString(cgp.correctPayRangeMaximum);
    const isPayMinimumCorrect = (payRangeStart === correctPayRangeMinimum);
    const isPayMaximumCorrect = (payRangeEnd === correctPayRangeMaximum);
    const isPayRangeCorrect = `${isPayMinimumCorrect && isPayMaximumCorrect}`;

    return isPayRangeCorrect;
  }

  _annotatePost(post) {
    console.log(`inspecting job ${post.job.id}`);
    const job = post.job.isProspectPost ? "" : {
        linkUrl: `https://app4.greenhouse.io/sdash/${post.job.id}`,
        text: post.job.name      
    }
    
    const ptd = this._getPayTransparencyData(post);
    const cgp = this._getCompGradeProfileData(post.job.profileCode, ptd.zone);
    const payRangeCorrect = this._isPayRangeCorrect(ptd, cgp);
  
    const annotatedPost = {
      reqId: post.job.reqId,
      job, 
      postType: post.job.isProspectPost ? "prospect" : "job",
      jobProfile: post.job.profile,
      jobProfileCode: post.job.profileCode,
      jobProfileName: post.job.profileName,
      jobLevel: post.job.level,
      offices: post.job.officeList,
      salaryRange: post.job.salaryRange,
      primaryRecruiter: post.job.primaryRecruiter,
      openReason: post.job.openReason,
      companyName: post.job.companyName,
      jobBoard: {
        linkUrl: `https://app4.greenhouse.io/jobboard/${post.board.id}`,
        text: post.board.name
      }, 
      jobPost: {
        linkUrl: `https://app4.greenhouse.io/jobapps/${post.id}/edit`,
        text: `${post.title}`
      }, 
      jobPostId: post.id,
      location: post.location,
      dateOfLastJobPostUpdate: post.updatedAt,   
      ...ptd,
      ...cgp,
      payRangeCorrect
    }

    return annotatedPost;
  }

  _hasMatch(content, searchString) {
    const regexp = new RegExp(searchString, "i");
    const match = content.match(regexp);
    const hasMatch = !!match;

    return hasMatch;
  }

  _getHTML(contentString) {
    const replacements = [
      { searchFor: "&lt;", replaceWith: "<" },
      { searchFor: "&gt;", replaceWith: ">" },
      { searchFor: "&quot;", replaceWith: `"` },
    ]

    const html = replacements.reduce((result, replacement) => {
      const regexp = new RegExp(replacement.searchFor, "gi");
      const updatedResult = result.replace(regexp, replacement.replaceWith);

      return updatedResult;
    }, contentString);

    return html;    
  }

  _getPayRange(contentString) {
    let html = this._getHTML(contentString);
    
    try {
      const DIV_PAY_RANGE_OPEN = `<div class="pay-range">`;
      const DIV_CLOSE = `</div>`;
      const SPAN_OPEN = `<span>`;
      const SPAN_CLOSE = `</span>`;

      const divOpen = html.indexOf(DIV_PAY_RANGE_OPEN);
      
      html = html.substring(divOpen + DIV_PAY_RANGE_OPEN.length);

      const divClose = html.indexOf(DIV_CLOSE);

      html = html.substring(0, divClose);

      const firstSpan = html.indexOf(SPAN_OPEN);

      html = html.substring(firstSpan + SPAN_OPEN.length);

      const lastSpanClose = html.lastIndexOf(SPAN_CLOSE);

      html = html.substring(0, lastSpanClose);

      const items = html.split(SPAN_CLOSE);
      const payStart = items[0];

      html = items[2];
      html = html.substring(SPAN_OPEN.length);

      const [payEnd, currency] = html.split(" ");
      return { payStart, payEnd, currency };
    } catch (e) {
      return {};
    }
  }

  _annotateContent(contentString) {
      const settings = this._settings;
      const shouldUseCannedContent = settings.getValue("useCannedContent") === "yes";
      const content = shouldUseCannedContent ? CANNED_CONTENT : contentString;
      const hasPayTransparencyDiv = this._hasMatch(content, "content-pay-transparency");
      const payRange = this._getPayRange(content);
      const hasPayTransparency = hasPayTransparencyDiv &&
        payRange.hasOwnProperty("payStart") &&
        payRange.hasOwnProperty("payEnd") &&
        payRange.hasOwnProperty("currency");

      return {
        hasPayTransparency,
        ...payRange
      };
  }

  _getAnnotatedPost(jbPost, board) {
    const jobId = jbPost.internal_job_id;
    const job = this._getJob(jobId);

    const id = jbPost.id ?? "";
    const title = jbPost.title ?? "";
    const location = jbPost.location?.name ?? "";
    const updatedAt = arcanite.formatDateTime(jbPost.updated_at);
    const content = jbPost.content ?? "";

    const post = {
      job, board, id, title, location, updatedAt, content
    }

    const annotatedPost = this._annotatePost(post);

    return annotatedPost;
  }

  getAnnotatedJobBoard(board) {
    const url = `${JOB_BOARD_BASE_URL}${board.token}/jobs`;
    const data = this._fetch(url, { content: true });
    const postDescriptors = data["jobs"];
    const annotatedPosts = postDescriptors.map(post => {
      const annotatedPost = this._getAnnotatedPost(post, board);
      Utilities.sleep(100);      

      return annotatedPost;
    });

    return annotatedPosts;
  }
}