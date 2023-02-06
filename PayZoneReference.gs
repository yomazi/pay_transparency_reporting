class PayZoneReference {
  constructor() {
    arcanite.toast("Pay Zones", "loading pay zone reference data...");
    const ss = SpreadsheetApp.openById(SheetIds.PAY_ZONE_REFERENCE_SHEET_ID);
    const ssw = arcanite.newSpreadsheetWrapper(ss);

    ssw.activateSheet("Job Board Location to Zone");

    const locationHash = ssw.convertToHash("jobBoardLocations");

    ssw.activateSheet("Office To Zone");

    const officeHash = ssw.convertToHash("offices");

    this._locationHash = locationHash;
    this._officeHash = officeHash;
    this._ssw = ssw;
  }

/*
  getAllLocations() {
    const locations = Object.keys(this._locationHash);

    return locations;
  }

  hasLocation(location) {
    const locationHash = this._locationHash;

    return locationHash.hasOwnProperty(location);
  }
*/

  getZoneByLocation(locationId) {
    const locationHash = this._locationHash;
    const location = locationHash[locationId];
    const zone = location ? location.zone : null;

    return zone;
  }

/*
  getAllOffices() {
    const offices = Object.keys(this._officeHash);

    return offices;
  }

  hasOffice(office) {
    const officeHash = this._officeHash;

    return officeHash.hasOwnProperty(office);
  }
*/

  getZoneByOffice(officeId) {
    const officeHash = this._officeHash;
    const office = officeHash[officeId];
    const zone = office ? office.zone : null;

    return zone;
  }  
}