/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Specific Info Update After
 * Event Description:- The after event for when a user updates application specific information
 * MasterScript:- ApplicationSpecificInfoUpdateAfterV3.0.js
 * Record Type:- ASIUA;PLANNING!PROJECTrEVIEWS!PROJECTMANAGEMENTRECORD!NA.js
 * 
 * 05/16/2016 Greg Soter, FutureNet Group, Inc.
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

editEstimatedJobValue(AInfo["Estimated Cost"]);
var fireFee = 0;
if ((AInfo["Fire Marshal Review"]) == "Yes") {
	if (estValue <= 101000) {
		fireFee = 155;
	} else if (101000 < estValue && estValue <= 1500000) {
		fireFee = estValue * 0.0016;
	} else if (1500000 < estValue && estValue <= 10000000) {
		fireFee = estValue * 0.0013;
	} else if (10000000 < estValue) {
		fireFee = estValue * 0.0011;
    } else {
    	logDebug("Failed to assess PRV_FIRE");
    }
	
	if (fireFee > 60000) {
		fireFee = 60000;
    }
       	updateFee("PRV_FIRE", "PLNPMR", "FINAL", fireFee, "N", "Y", null);
}

if ((AInfo["Plumbing Review"]) == "Yes") {
    updateFee("PRV_PLUM", "PLNPMR", "FINAL", 1, "N", "Y", null);
}
if ((AInfo["Electrical Review"]) == "Yes") {
    updateFee("PRV_ELEC", "PLNPMR", "FINAL", 1, "N", "Y", null);
}
if ((AInfo["Mechanical Review"]) == "Yes") {
    updateFee("PRV_MECH", "PLNPMR", "FINAL", 1, "N", "Y", null);
}
if ((AInfo["Structural Review"]) == "Yes" && estValue >= 50000) {
    updateFee("PRV_BLD", "PLNPMR", "FINAL", 1, "N", "Y", null);
}