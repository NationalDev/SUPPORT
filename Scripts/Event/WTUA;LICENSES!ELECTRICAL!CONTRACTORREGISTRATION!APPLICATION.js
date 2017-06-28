/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;LICENSES!ELECTRICAL!CONTRACTORREGISTRATION!APPLICATION.js
 *  
 * Issues the license by doing the following:- Create the license record,
 * expiration date and status.
 * Ensures that all record contacts are based on reference contacts.
 * 
 * Standard Choice:- 1. LIC Issue License	2. LIC Establish Links to Reference Contacts
 * 
 * Greg Soter, Futurenet Group Inc. 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
var wfTaskBool = wfTask == "License Issuance";
var wfStatusBool = wfStatus == "Registration Issued";
logDebug(wfTaskBool + "::" + wfStatusBool);
showDebug = true;
showMessage = true;
if ((wfTask == "License Issuance") && (wfStatus == "Registration Issued")) {
    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = appTypeArray[2];
    monthsToInitialExpire = 12;
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "NA",null);
    // create the License record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        updateAppStatus("Active","Originally Issued",newLicId);
        copyAppSpecific(newLicId,"");
    } else {
        logDebug("Failed to Create Parent");
    }
    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(dateAdd(tmpNewDate,0));
        thisLic.setStatus("Active");
    } else {
        logDebug("Failed to Set Expiration Status");
    }
} else {
    logDebug(wfTask + " is " + wfTaskBool);
    logDebug(wfStatus + " is " + wfStatusBool);
}
try {
    showDebug = true;
    
}
catch (err) {
    logDebug("A JavaScript Error occured: " + err.message);
}
// end user code
aa.env.setValue("ScriptReturnCode", "0"); 	aa.env.setValue("ScriptReturnMessage", debug)