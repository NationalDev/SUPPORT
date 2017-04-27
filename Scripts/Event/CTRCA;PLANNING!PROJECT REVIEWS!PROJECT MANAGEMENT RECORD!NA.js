/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record.
 * 
 * Event Name:- Convert To Real CAP After
 * Event Description:- The after event for converting a partial record ID to a real record ID.
 * MasterScript:- ConvertToRealCAPAfterV3.0.js
 * Record Type:- CTRCA;PLANNING!PROJECTREVIEWS!PROJECTMANAGEMENTRECORD!NA.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * 05/05/2016 Greg Soter, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

showDebug = true;
var feeCode = "PMT_BLD";
var feeSchedule = "PLNPMR";
var feePeriod = "FINAL";
var feeQuantity = estValue;//Set from AInfo["Estimated Cost"] in ASA

//logDebug("Preliminary Project Review # is: " +pprNbr);
if (feeQuantity > 0) {
    updateFee(feeCode, feeSchedule, feePeriod, feeQuantity, "N", "N", null);
} else {
    showMessage=true;
    logDebug("Failed to add fee: Contractor Estimated Job Value missing or zero");
    logMessage("Failed to add fee: Contractor Estimated Job Value missing or zero");
}