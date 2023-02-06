function addMenuItems(title, items) {
  arcanite.addMenuItems(title, items);
}

function generatePayTransparencyReport() {
  const settings = arcanite.init(DEFAULTS);  
  const ghConnector = new GreenhouseConnector(settings);  
  const shouldUseSandbox = settings.getValue("greenhouseEnvironment") === "sandbox";
  const boards = shouldUseSandbox ? settings.getValue("sandboxBoards") : settings.getValue("boards");
  
  let allData = [];

  boards.forEach((board, index) => {
    arcanite.toast(`${index + 1} of ${boards.length}`, `auditing posts on job board "${board.name}"...`, { autoHide: false });
    const boardData = ghConnector.getAnnotatedJobBoard(board);

    allData = allData.concat(boardData);
  });

  const reportGenerator = new ReportGenerator(settings); 
  reportGenerator.annotateJobBoards(allData);
  arcanite.toast(`done!`, "");
}

function annotatePayRange() {
  const settings = arcanite.initWithoutSpreadsheet(DEFAULTS);
  const ghConnector = new GreenhouseConnector(settings); 
  const payRange = ghConnector._getPayRange(BIG_CONTENT_NO_PAY);

  Logger.log(payRange);
}

function createPayZoneReference() {
  const pzr = new PayZoneReference();
  const locations = pzr.getAllLocations();
  locations.forEach(location => {
    if (!pzr.hasLocation(location)) {
      Logger.log(`PROBLEM: location not found ${location}`);
    }
  });

  const offices = pzr.getAllOffices();
  offices.forEach(office => {
    if (!pzr.hasOffice(office)) {
      Logger.log(`PROBLEM: office not found ${office}`);
    }
  })
}

function createSalaryRangeMap() {
  const smr = new SalaryMapReference();
  const compGradeProfiles = smr.getAllKeys();

  compGradeProfiles.forEach(compGradeProfile => {
    const r = smr.getSalaryRangeForCompGradeProfile(compGradeProfile);

    Logger.log(`${compGradeProfile}: ${r.min} - ${r.mid} - ${r.max} ${r.currency}`);
  })
}

function normalizeCurrencyString(currencyString) {
  const originalString = currencyString ?? "";
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

function compareSalary() {
  const values = [ "n/a", "", null, undefined, "$92,900", "$139,300", "77200", "115800" ];

  const normalizedValues = values.map(value => normalizeCurrencyString(value));

  values.forEach((value, index) => {
    Logger.log(`${values[index]}   ${normalizedValues[index]}`);
  })
}
