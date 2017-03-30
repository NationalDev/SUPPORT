//ASA;PLANNING!PROJECT REVIEWS!PROJECT MANAGEMENT RECORD!NA.js
//Created 05/05/2016 by Greg Soter

//ASA:Planning/Project Reviews/Project Management Record/NA
//Testing in AIUA and then in ASA

showDebug = true;
var feeCode = "PLN_PPR";
var feeSchedule = "PLNPMR";
var feePeriod = "FINAL";
var feeQuantity = 1;

editEstimatedJobValue(AInfo["Estimated Cost"]);
copyParcelGisObjects();
//logDebug("Preliminary Project Review # is: " +pprNbr);
if (getAppSpecific("Preliminary Project Review Needed?") == "Yes"){
    //updateFee(feeCode, feeSchedule, feePeriod, feeQuantity, "N", "N", null); 
    //Fee should be assessed/invoiced after meeting is scheduled
}
else{
    logDebug("PPR Not Requested");
    //logMessage("Failed to add fee: Contractor Estimated Job Value missing or zero");
}
