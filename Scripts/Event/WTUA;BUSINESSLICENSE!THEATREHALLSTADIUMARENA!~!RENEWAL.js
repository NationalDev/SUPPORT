/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: WorkflowTaskUpdateAfter
 * Event Description:After Event for Workflow Task Status Submital
 * Master Script: WorkflowTaskUpdateAfterV3.0
 *
 * Record Type: WTUA;BUSINESSLICENSE!THEATREHALLSTADIUMARENA!~!RENEWAL.js
 * 09/22/2016 Vishal Upadhyay, FutureNet Group, Inc.  
 *
 */

//first task in WTUA is 'Renewal Intake'

//When status 'Accepted', assess the fee (applicant applied online)

if (wfTask == "Renewal Intake" && wfStatus == "Accepted") {
	
	if ((AInfo["License Type"] == "Burlesque")) {
		logDebug("Fees assessed on next line.");
		updateFee("BURLESQUE", "BUSLICTSSA_F", "FINAL", 1, "N");
	} 
	
	else if ((AInfo["License Type"] == "Concert Play Opera Comedy")) {
		logDebug("Fees assessed on next line.");
		updateFee("CONCERTPLAY", "BUSLICTSSA_F", "FINAL", 1, "N");
	} 
	
	else if ((getAppSpecific("License Type") == "Motion Picture")) {
		
		if (AInfo["Number of Seats"] == "Seats 1 - 500") {
			logDebug("Number assessed on next line.");
			updateFee("MOTION1-500", "BUSLICTSSA_F", "FINAL", 1, "N");
		} 
		else if ((AInfo["Number of Seats"] == "Seats 501 - 1000")) {
			logDebug("Fees assessed on next line.");
			updateFee("MOTION501", "BUSLICTSSA_F", "FINAL", 1, "N");
		}
		
		else if ((AInfo["Number of Seats"] == "Seats 1001 - 2000")) {
			logDebug("Fees assessed on next line.");
			updateFee("MOTION1001", "BUSLICTSSA_F", "FINAL", 1, "N");
		}
		
		else if ((AInfo["Number of Seats"] == "Seats 2001 and Up")) {
			logDebug("Fees assessed on next line.");
			updateFee("MOTION2000", "BUSLICTSSA_F", "FINAL", 1, "N");
		}	
	}
	
	else if ((AInfo["License Type"] == "Stage Show")) {
		logDebug("Fees assessed on next line.");
		updateFee("STAGESHOW", "BUSLICTSSA_F", "FINAL", 1, "N");
	} 
	
	else if ((getAppSpecific("License Type") == "Theatre")) {
		
		if (AInfo["Number of Seats"] == "Theatre 1 - 50") {
			logDebug("Number assessed on next line.");
			updateFee("THEATRE1-50", "BUSLICTSSA_F", "FINAL", 1, "N");
		} 
		else if ((AInfo["Number of Seats"] == "Theatre 51")) {
			logDebug("Fees assessed on next line.");
			updateFee("THEATRE51", "BUSLICTSSA_F", "FINAL", 1, "N");
		}		
	}
	
	else if ((AInfo["License Type"] == "Concert")) {
		logDebug("Fees assessed on next line.");
		updateFee("HALLCONCERT", "BUSLICTSSA_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Public Dance 2AM")) {
		logDebug("Fees assessed on next line.");
		updateFee("HALL2AM", "BUSLICTSSA_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Public Dance 4AM")) {
		logDebug("Fees assessed on next line.");
		updateFee("HALL4AM", "BUSLICTSSA_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Rental Hall")) {
		logDebug("Fees assessed on next line.");
		updateFee("HALLRENTAL", "BUSLICTSSA_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Dance Permit Special")) {
		logDebug("Fees assessed on next line.");
		updateFee("DANCEPERMIT", "BUSLICTSSA_F", "FINAL", 1, "N");
	}
	
	else if ((AInfo["License Type"] == "Dance Studio")) {
		logDebug("Fees assessed on next line.");
		updateFee("DANCDESTUDIO", "BUSLICTSSA_F", "FINAL", 1, "N");
	}
	
	else if ((getAppSpecific("License Type") == "Box Fight Wrestle")) {
		
		if (AInfo["Number of Seats"] == "Seats 1 - 1000") {
			logDebug("Number assessed on next line.");
			updateFee("BXPFW1-1000", "BUSLICTSSA_F", "FINAL", 1, "N");
		} 
		
		else if ((AInfo["Number of Seats"] == "Seats 10001 - 10,000")) {
			logDebug("Fees assessed on next line.");
			updateFee("BXPFW10000", "BUSLICTSSA_F", "FINAL", 1, "N");
		}
		
		else if ((AInfo["Number of Seats"] == "Seats 10001 and Up")) {
			logDebug("Fees assessed on next line.");
			updateFee("BXPFW10001", "BUSLICTSSA_F", "FINAL", 1, "N");
		}	
	}
	
	else if ((AInfo["License Type"] == "Sports Stadium")) {
		logDebug("Fees assessed on next line.");
		updateFee("SPORTSTADIUM", "BUSLICTSSA_F", "FINAL", 1, "N");
	}
}
