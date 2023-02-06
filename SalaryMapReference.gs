class SalaryMapReference {
  constructor() {
    arcanite.toast("Salary Map", "loading salary mapping reference data...");    
    const ss = SpreadsheetApp.openById(SheetIds.SALARY_MAP_REFERENCE_SHEET_ID);
    const ssw = arcanite.newSpreadsheetWrapper(ss);

    ssw.activateSheet("Salary Ranges");

    const hash = ssw.convertToHash("compGradeProfile");

    this._hash = hash;
    this._ssw = ssw;    
  }

  getAllKeys() {
    const hash = this._hash;
    const keys = Object.keys(hash);

    return keys;
  }

  getCorrectSalaryRange(key) {
    const hash = this._hash;    
    const item = hash[key];
    const payRangeData = {
      currency: item?.currency ?? "(not found)",
      min: item?.min ?? "(not found)",
      mid: item?.mid ?? "(not found)",
      max: item?.max ?? "(not found)"
    };

    return payRangeData;
  }
}