/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;BUSINESSLICENSE!~!~!APPLICATION.js
 *  
 * Issues the business license by doing the following:- Create the license record,
 * expiration date and status.
 * Ensures that all record contacts are based on reference contacts.
 * 
 * Standard Choice:- 1. LIC Issue Business License	2. LIC Establish Links to Reference Contacts
 * 
 * Accela 02/08/2016 - Also calledby the WTUA;BUSINESSLICENSE!~!~!APPLICATION script for CoD
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//showDebug = true, showMessage = true;
if (wfTask == "License Issuance" && wfStatus == "Issued") { 	//Status on businesslicense Application record to trigger creation of parent License record
	//branch("LIC Establish Links to Reference Contacts"); 		// May not be needed on BusinessLicense 
	//branch("LIC Issue Business License");						//added line 04 to this SC to getAppName from Application record and copy to parent Liceense record
	newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = "Business";
    monthsToInitialExpire = 12;
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
    // create the license record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        updateAppStatus("Active","Originally Issued",newLicId);
        //editAppName(AInfo['Doing Business As (DBA) Name'],newLicId);
    }
//    appName = getAppName(capId);
//    editAppName(appName,newLicId);
//    line added by CIH 03012016;
//    var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
//    var ignore = ASICopyExceptions(newLicId);
//    var ignoreArr = new Array();
//    if(ignore != null) ignoreArr = ignore.split("|");
//    copyAppSpecific(newLicId,ignoreArr);
//    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);    
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(dateAdd(tmpNewDate,0));
        thisLic.setStatus("Active");
    }
    if (newLicId) {
        changeCapContactTypes("Applicant","License Holder", newLicId);
    }
    if (newLicId) {
        copyOwner(capId, newLicId);
    }
    if (newLicId) {
        copyASITables(capId,newLicId);
    }
    logDebug("Business License Issued");
}