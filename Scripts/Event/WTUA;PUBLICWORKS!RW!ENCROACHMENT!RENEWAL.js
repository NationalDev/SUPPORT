//WTUA;PUBLICWORKS!RW!ENCROACHMENT!RENEWAL.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//WTUA:PUBLICWORKS/RW/ENCROACHMENT/RENEWAL
//if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
if (false) {
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
        }

    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(dateAdd(tmpNewDate,0));
        thisLic.setStatus("Active");
        }

/*    if (newLicId) {
        conToChange = null;
        cons = aa.people.getCapContactByCapID(newLicId).getOutput();
        for (thisCon in cons) if (cons[thisCon].getCapContactModel().getPeople().getContactType() == "Applicant") conToChange = cons[thisCon].getCapContactModel();
        } else {
        conToChange = null;
        }

    if (conToChange) {
        p = conToChange.getPeople();
        p.setContactType("Independant Contractor");
        conToChange.setPeople(p);
        aa.people.editCapContact(conToChange);
        }*/

    copyASITables(capId,newLicId);
}
/*
    if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
        branch("EMSE:LicProfLookup");
        }
*/