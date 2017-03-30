//WTUA;BUSINESSLICENSE!~!~!RENEWAL
//WTUA:BUSINESSLICENSE/*/*/RENEWAL (EMSE Script Name) 
//Alternative license renewal script - use if license is not renewed automatically when payment is made
//Business License Renewal must go through a review process before the license becomes Active for another year
/*	showMessage = true; showDebug = true;
	aa.runScriptInNewTransaction("WorkflowTaskUpdateAfter4Renew");
	aa.runScript("WORKFLOWTASKUPDATEAFTER4RENEW");
*/
if (wfTask == "Renewal Review" && wfStatus == "Approved") {
    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = appTypeArray[2];
    monthsToInitialExpire = 12;
    newLicId = getParentCapID4Renewal();
  //Update the LICENSE Record Application Status, Expiration Status, Expiration Date
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
	//If necessary, copy additional information to license record from renewal record
	copyASITables(capId,newLicId);
	}
/*
    if (newLicId) {
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
        }

    if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
        branch("EMSE:LicProfLookup");
        }
*/