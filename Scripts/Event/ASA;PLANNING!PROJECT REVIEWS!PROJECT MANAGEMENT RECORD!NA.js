/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * MasterScript:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;PLANNING!PROJECTREVIEWS!PROJECTMANAGEMENTRECORD!NA.js
 * 
 * 05/05/2016 Greg Soter, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

showDebug = true;
var feeCode = "PLN_PPR";
var feeSchedule = "PLNPMR";
var feePeriod = "FINAL";
var feeQuantity = 1;
editEstimatedJobValue(AInfo["Estimated Cost"]);
copyParcelGisObjects();
//logDebug("Preliminary Project Review # is: " +pprNbr);
if (getAppSpecific("Preliminary Project Review Needed?") == "Yes") {
    //updateFee(feeCode, feeSchedule, feePeriod, feeQuantity, "N", "N", null); 
    //Fee should be assessed/invoiced after meeting is scheduled
} else {
    logDebug("PPR Not Requested");
    //logMessage("Failed to add fee: Contractor Estimated Job Value missing or zero");
}