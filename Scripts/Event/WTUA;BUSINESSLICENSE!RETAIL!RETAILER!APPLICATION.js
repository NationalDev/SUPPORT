/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: WorkflowTaskUpdateAfter
 * Event Description:After Event for Work flow Task Status Submittal
 * Master Script: WorkflowTaskUpdateAfterV3.0
 *
 * Record Type: WTUA;BUSINESSLICENSE!RETAIL!RETAILER!APPLICATION.js
 * 09/27/2016 Chaitanya Tanna, FutureNet Group, Inc.
 *
 */

if (wfTask == "Application Intake" && wfStatus == "Application Accepted") {
	
	if ((AInfo["License Type"] == "Beverage Retail")) {
		logDebug("Fees assessed on next line.");
		updateFee("BEVRETAIL", "BUSLICRET_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Cigarette Retail")) {
		logDebug("Fees assessed on next line.");
		updateFee("CIGRETAIL", "BUSLICRET_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Ice Packing Unit")) {
		logDebug("Fees assessed on next line.");
		updateFee("ICEPACK", "BUSLICRET_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Pet Shop")) {
		logDebug("Fees assessed on next line.");
		updateFee("PETSHOP", "BUSLICRET_F", "FINAL", 1, "N");
	}
	
}