/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;BUSINESSLICENSE!RETAIL!RETAIL!APPLICATION.js
 *  
 * Issues the business license by doing the following:- Create the license record,
 * expiration date and status.
 * Ensures that all record contacts are based on reference contacts.
 * 
 * Standard Choice:- 1. LIC Issue Business License	2. LIC Establish Links to Reference Contacts
 * 
 * 09/27/2016 Chaitanya Tanna, FutureNet Group, Inc. 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if (wfTask == "Application Intake" && wfStatus == "Application Accepted") {	
	if ((AInfo["License Type"] == "Beverage Retail")) {
		logDebug("Fees assessed on next line.");
		updateFee("BEVRETAIL", "BUSLICRET_F", "FINAL", 1, "N");
	} else if ((AInfo["License Type"] == "Cigarette Retail")) {
		logDebug("Fees assessed on next line.");
		updateFee("CIGRETAIL", "BUSLICRET_F", "FINAL", 1, "N");
	} else if ((AInfo["License Type"] == "Ice Packing Unit")) {
		logDebug("Fees assessed on next line.");
		updateFee("ICEPACK", "BUSLICRET_F", "FINAL", 1, "N");
	} else if ((AInfo["License Type"] == "Pet Shop")) {
		logDebug("Fees assessed on next line.");
		updateFee("PETSHOP", "BUSLICRET_F", "FINAL", 1, "N");
	}
}