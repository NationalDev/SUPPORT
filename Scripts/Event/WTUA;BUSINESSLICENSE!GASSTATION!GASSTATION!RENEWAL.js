/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: WorkflowTaskUpdateAfter
 * Event Description:After Event for Work flow Task Status Submittal
 * Master Script: WorkflowTaskUpdateAfterV3.0
 *
 * Record Type: WTUA;BUSINESSLICENSE!GASSTATION!GASSTATION!RENEWAL.js
 * 09/27/2016 Chaitanya Tanna, FutureNet Group, Inc.
 *
 */

if (wfTask == "Renewal Intake" && wfStatus == "Accepted") {
	
	if ((AInfo["License Type"] == "Gas Station Full Service")) {
		logDebug("Fees assessed on next line.");
		updateFee("GASST_FULL", "BUSLICGAST_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Gas Station Self Service")) {
		logDebug("Fees assessed on next line.");
		updateFee("GASST_SELF", "BUSLICGAST_F", "FINAL", 1, "N");
	}
	
}