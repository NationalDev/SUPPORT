/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;BUSINESSLICENSE!SEXUALLYORIENTED!SORLOCATION!APPLICATION.js
 *  
 * Issues the business license by doing the following:- Create the license record,
 * expiration date and status.
 * Ensures that all record contacts are based on reference contacts.
 * 
 * Standard Choice:- 1. LIC Issue Business License	2. LIC Establish Links to Reference Contacts
 *  
 * 09/26/2016 Chaitanya Tanna, FutureNet Group, Inc. 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if (wfTask == "Application Intake" && wfStatus == "Application Accepted") {
	if ((AInfo["License Type"] == "Adult Supply Store")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTSUPSTR", "BUSLICSOR_F", "FINAL", 1, "N");
	} else if ((AInfo["License Type"] == "Adult Topless W/ Liquor")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTCABD", "BUSLICSOR_F", "FINAL", 1, "N");
	} else if ((AInfo["License Type"] == "Adult Topless W/O MLCC")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTCABE", "BUSLICSOR_F", "FINAL", 1, "N");
	} else if ((AInfo["License Type"] == "Business")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTBUS", "BUSLICSOR_F", "FINAL", 1, "N");
	}else if ((AInfo["License Type"] == "Coin-Op Motion Picture Developer")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTCOPPIC", "BUSLICSOR_F", "FINAL", 1, "N");
	}
}