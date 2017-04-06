//WTUA;PUBLICWORKS!RW_USE!VALET_ANNUAL!RENEWAL.js
//Iman Sallam, City of Detroit
//Deploy with the script code and script title below (all caps)
//WTUA:LICENSES/*/*/RENEWAL
if (wfTask == "License Issuance" && wfStatus == "Renewed") {
    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = appTypeArray[2];
    monthsToInitialExpire = 12;
    newLicId = getParentCapID4Renewal();
    // create the permit record;
    if (newLicId) {
        //newLicIdString = newLicId.getCustomID();
        updateAppStatus("Issued","Originally Issued",newLicId);
        copyAppSpecific(newLicId,"");
        copyASITables(capId,newLicId);
        }

    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(dateAdd(tmpNewDate,0));
        thisLic.setStatus("Active");
        }

    
    
}