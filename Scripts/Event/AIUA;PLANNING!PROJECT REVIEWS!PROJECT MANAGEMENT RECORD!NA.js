/**
 * To calculate and assess estimated cost of Project Management.
 * 
 * Event Name:- Additional Info Update After
 * Event Description:- After Event for Additonal Information Subimttal
 * MasterScript:- AdditionalInfoUpdateAfterV3.0.js
 * 
 * Record Type:- AIUA;PLANNING!PROJECT REVIEWS!PROJECT MANAGEMENT RECORD!NA.js
 * Created 05/05/2016 by Greg Soter
 * 
 * 	Formatted By:- Chaitanya Tanna, City of Detroit
 */

showDebug = true;
var feeCode = "PMT_BLD";
var feeSchedule = "PLNPMR";
var feePeriod = "FINAL";
var feeQuantity = estValue;	//Set to zero upon declaration by ACCELA GLOBAL VARIABLES
 
editAppSpecific("Estimated Cost",estValue);
if (feeQuantity > 0) {
	/**
	 * Will add building permit fee item if not already assessed.
	 * Will update fee quantity if assessed building permit fee item exists.
	 * Will NOT update invoiced fee item.
	 * Will NOT add another building permit fee item if invoiced fee item exists.
	 */
    updateFee(feeCode, feeSchedule, feePeriod, feeQuantity, "N", "Y", null);
} else {
    logDebug("Failed to add fee: Contractor Estimated Job Value missing or zero");
    logMessage("Failed to add fee: Contractor Estimated Job Value missing or zero");
}

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