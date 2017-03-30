/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: WorkflowTaskUpdateAfter
 * Event Description:After Event for Work flow Task Status Submittal
 * Master Script: WorkflowTaskUpdateAfterV3.0
 *
 * Record Type: WTUA;BUSINESSLICENSE!FOODSERVICES!~!APPLICATION.js
 * 08/26/2016/2016 Chaitanya Tanna, FutureNet Group, Inc.
 *
 */

if (wfTask == "Application Intake" && wfStatus == "Application Accepted") {
	
	if ((AInfo["License Type"] == "Candy Branch")) {
		logDebug("Fees assessed on next line.");
		updateFee("CANDYBRANCH", "BUSLICFOOD_F", "FINAL", 1, "N");
	} 
	
	else if ((AInfo["License Type"] == "Caterer")) {
		logDebug("Fees assessed on next line.");
		updateFee("RESTCATERER", "BUSLICFOOD_F", "FINAL", 1, "N");
	} 
	
	else if ((AInfo["License Type"] == "Deli")) {
		logDebug("Fees assessed on next line.");
		updateFee("RESTDELI", "BUSLICFOOD_F", "FINAL", 1, "N");
	} 
	
	else if ((AInfo["License Type"] == "General Food")) {
		logDebug("Fees assessed on next line.");
		updateFee("GENERALFOOD", "BUSLICFOOD_F", "FINAL", 1, "N");
	} 
	
	else if ((AInfo["License Type"] == "Meat Broker-Wholesale")) {
		logDebug("Fees assessed on next line.");
		updateFee("MEATBROKER", "BUSLICFOOD_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Carry Out")) {
		logDebug("Fees assessed on next line.");
		updateFee("RESTCARRYOUT", "BUSLICFOOD_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Coffee House")) {
		logDebug("Fees assessed on next line.");
		updateFee("COFFEEHOUSE", "BUSLICFOOD_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Concert Cafe")) {
		logDebug("Fees assessed on next line.");
		updateFee("CONCERTCAFE", "BUSLICFOOD_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Fast Food")) {
		logDebug("Fees assessed on next line.");
		updateFee("RESTFASTFOOD", "BUSLICFOOD_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Standard")) {
		logDebug("Fees assessed on next line.");
		updateFee("RESTSTANDARD", "BUSLICFOOD_F", "FINAL", 1, "N");
	}
	
	else if ((getAppSpecific("License Type") == "Fixed Food")) {
		
		logDebug("Number assessed on next line 65.");
		
		if (AInfo["Number of Seats"] == "1-30 Seats") {
			logDebug("Number assessed on next line.");
			updateFee("FIXFOOD0-30", "BUSLICFOOD_F", "FINAL", 1, "N");
		} 
		
		else if ((AInfo["Number of Seats"] == "31-50 Seats")) {
			logDebug("Fees assessed on next line.");
			updateFee("FIXFOOD31-50", "BUSLICFOOD_F", "FINAL", 1, "N");
		}
		
		else if ((AInfo["Number of Seats"] == "51-100 Seats")) {
			logDebug("Fees assessed on next line.");
			updateFee("FIXFOOD100", "BUSLICFOOD_F", "FINAL", 1, "N");
		}
		
		else if ((AInfo["Number of Seats"] == "101-150 Seats")) {
			logDebug("Fees assessed on next line.");
			updateFee("FIXFOOD150", "BUSLICFOOD_F", "FINAL", 1, "N");
		}
		
		else if ((AInfo["Number of Seats"] == "151 Seats and Up")) {
			logDebug("Fees assessed on next line.");
			updateFee("FIXFOOD151", "BUSLICFOOD_F", "FINAL", 1, "N");
		}
		
	}
	
	else if ((AInfo["License Type"] == "Restaurant MLCC")) {
		
		if (AInfo["Number of Seats"] == "1-30 Seats") {
			logDebug("Number assessed on next line.");
			updateFee("RESTMLCC1-30", "BUSLICFOOD_F", "FINAL", 1, "N");
		}
		
		else if (AInfo["Number of Seats"] == "31-50 Seats") {
			logDebug("Number assessed on next line.");
			updateFee("RESTMLCC31-5", "BUSLICFOOD_F", "FINAL", 1, "N");
		}
		
		else if (AInfo["Number of Seats"] == "51-100 Seats") {
			logDebug("Number assessed on next line.");
			updateFee("RESTMLCC100", "BUSLICFOOD_F", "FINAL", 1, "N");
		}
		
		else if (AInfo["Number of Seats"] == "101-150 Seats") {
			logDebug("Number assessed on next line.");
			updateFee("RESTMLCC150", "BUSLICFOOD_F", "FINAL", 1, "N");
		}
		
		else if (AInfo["Number of Seats"] == "151 Seats and Up") {
			logDebug("Number assessed on next line.");
			updateFee("RESTMLCC151", "BUSLICFOOD_F", "FINAL", 1, "N");
		}
		
	}
	
}