/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: WorkflowTaskUpdateAfter
 * Event Description:After Event for Work flow Task Status Submittal
 * Master Script: WorkflowTaskUpdateAfterV3.0
 *
 * Record Type: WTUA;BUSINESSLICENSE!SEXUALLYORIENTED!SORLOCATION!APPLICATION.js
 * 09/26/2016 Chaitanya Tanna, FutureNet Group, Inc.
 *
 */



if (wfTask == "Application Intake" && wfStatus == "Application Accepted") {
	
	if ((AInfo["License Type"] == "Adult Supply Store")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTSUPSTR", "BUSLICSOR_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Adult Topless W/ Liquor")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTCABD", "BUSLICSOR_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Adult Topless W/O MLCC")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTCABE", "BUSLICSOR_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Business")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTBUS", "BUSLICSOR_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Coin-Op Motion Picture Developer")) {
		logDebug("Fees assessed on next line.");
		updateFee("ADULTCOPPIC", "BUSLICSOR_F", "FINAL", 1, "N");
	}
	
}