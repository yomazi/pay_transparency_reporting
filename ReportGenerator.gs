class ReportGenerator {
  constructor(settings) {
    this._settings = settings;
    this._ssw = this._createNewSpreadsheetWrapper();
  }

  _createNewSpreadsheetWrapper() {
    const rootFolder = DriveApp.getRootFolder();
    const userName = rootFolder.getOwner().getName(); 
    const date = Utilities.formatDate(new Date(), "GMT-7", "yyyy-MM-dd hh:mm:ss");
    const greenhouseEnvironment = this._settings.getValue("greenhouseEnvironment");
    const spreadsheetName = `${date} | ${greenhouseEnvironment} | ${userName}`;
    const settings = this._settings;    
    const reportFolderId = settings.getValue("reportFolderId");
    const spreadsheet = arcanite.newSpreadsheet(reportFolderId, spreadsheetName);
    const ssw = arcanite.newSpreadsheetWrapper(spreadsheet);    

    return ssw;
  }

  annotateJobBoards(data) {
    const ssw = this._ssw;
    const headers = [ 
      "reqId", "job", "postType", "jobProfile", "jobProfileCode", "jobProfileName", "jobLevel", "offices", "salaryRange", "primaryRecruiter", "openReason", "companyName", "jobBoard", "jobPost", "jobPostId", "location", 
      "dateOfLastJobPostUpdate", "payTransparencyUpdated", "zone", "payRangeStart", "payRangeEnd", "currency", "compGradeProfile", "correctPayRangeMinimum", "correctPayRangeMaximum", "correctPayRangeCurrency", "payRangeCorrect"
    ];
    ssw.addSheet();
    ssw.populateSheet(headers, data);
  }
}