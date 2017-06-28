/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;LICENSES!ELECTRICAL!CONTRACTORREGISTRATION!RENEWAL.js
 *  
 * Issues the license by doing the following:- Create the license record,
 * expiration date and status.
 * Ensures that all record contacts are based on reference contacts.
 * 
 * Standard Choice:- 1. LIC Issue License	2. LIC Establish Links to Reference Contacts
 * 
 * Greg Soter, Futurenet Grpup Inc. 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
if (wfTask == "Registration Renewal" && wfStatus == "Renewed") {
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
	copyASITables(capId,newLicId);
}