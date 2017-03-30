//ASIUA;PLANNING!PROJECT REVIEWS!PROJECT MANAGEMENT RECORD!NA.js

//ASIUA = AppSpecificInfoUpdateAfterV3.0
//Created 05/16/2016 by Greg Soter
//ASIUA:Planning/Project Reviews/Project Management Record/NA

editEstimatedJobValue(AInfo["Estimated Cost"]);
var fireFee = 0;
if ((AInfo["Fire Marshal Review"]) == "Yes") {
        if (estValue <= 101000) {
            fireFee = 155;
        }
        else if (101000 < estValue && estValue <= 1500000) {
            fireFee = estValue * 0.0016;
        }
        else if (1500000 < estValue && estValue <= 10000000) {
            fireFee = estValue * 0.0013;
        }
        else if (10000000 < estValue) {
            fireFee = estValue * 0.0011;
        }
        else {
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