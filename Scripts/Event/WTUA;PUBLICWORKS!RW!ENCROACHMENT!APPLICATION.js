/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;PUBLICWORKS!RW!ENCROACHMENT!APPLICATION.js
 *
 * Greg Soter, Futurenet Group, Inc.
 *    
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
if (false) {  
    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = appTypeArray[2];
    monthsToInitialExpire = 12;
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "Permit",null);
    // create the permit record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        updateAppStatus("Issued","Originally Issued",newLicId);
        copyAppSpecific(newLicId,"");
    }
    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(dateAdd(tmpNewDate,0));
        thisLic.setStatus("Active");
    }
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
    copyASITables(capId,newLicId);
}