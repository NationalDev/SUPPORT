/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: WorkflowTaskUpdateAfter
 * Event Description:After Event for Work flow Task Status Submittal
 * Master Script: WorkflowTaskUpdateAfterV3.0
 *
 * Record Type: WTUA;BUSINESSLICENSE!SECONDHANDSALES!SECONDHANDSTORE!APPLICATION.js
 * 09/22/2016 Chaitanya Tanna, FutureNet Group, Inc.
 *
 */

if (wfTask == "Application Intake" && wfStatus == "Application Accepted") {
	
	if ((AInfo["License Type"] == "Appliance Store")) {
		logDebug("Fees assessed on next line.");
		updateFee("SHMAJAPPL", "BUSLICSHS_F", "FINAL", 1, "N");
	} 
	
	else if ((AInfo["License Type"] == "Battery and Appliance")) {
		logDebug("Fees assessed on next line.");
		updateFee("SHBATTAPPL", "BUSLICSHS_F", "FINAL", 1, "N");
	} 
	
	else if ((AInfo["License Type"] == "Bicycle and Book")) {
		logDebug("Fees assessed on next line.");
		updateFee("SHBIKEBOOK", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Jewelry Store")) {
		logDebug("Fees assessed on next line.");
		updateFee("SHJEWELSTORE", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Junk Yard Dealer")) {
		logDebug("Fees assessed on next line.");
		updateFee("JUNKYARDLC", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Motor Cycle Rental")) {
		logDebug("Fees assessed on next line.");
		updateFee("MOTORRENT", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "PawnBroker")) {
		logDebug("Fees assessed on next line.");
		updateFee("PAWNBROKER", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Scarp Iron & Metal Processor")) {
		logDebug("Fees assessed on next line.");
		updateFee("SCARPIRON", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Second Hand and CLothing")) {
		logDebug("Fees assessed on next line.");
		updateFee("SHCLOTHSTORE", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Tire Store")) {
		logDebug("Fees assessed on next line.");
		updateFee("SHTIREBLDG", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Used Auto Dealer")) {
		logDebug("Fees assessed on next line.");
		updateFee("UADUAWD", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Used Auto Dealer & Parts")) {
		logDebug("Fees assessed on next line.");
		updateFee("UADPARTS", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Used Auto Parts")) {
		logDebug("Fees assessed on next line.");
		updateFee("UADUAPUAWD", "BUSLICSHS_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Wrecking & Dismantling Yard")) {
		logDebug("Fees assessed on next line.");
		updateFee("UADUAWD", "BUSLICSHS_F", "FINAL", 1, "N");
	}
}
