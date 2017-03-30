//CTRCA;PLANNING!PROJECT REVIEWS!PROJECT MANAGEMENT RECORD!NA.js
//Created 05/05/2016 by Greg Soter

//CTRCA:Planning/Project Reviews/Project Management Record/NA
//Testing in AIUA and then in CTRCA

showDebug = true;
var feeCode = "PMT_BLD";
var feeSchedule = "PLNPMR";
var feePeriod = "FINAL";
var feeQuantity = estValue;//Set from AInfo["Estimated Cost"] in ASA


//logDebug("Preliminary Project Review # is: " +pprNbr);
if (feeQuantity > 0){
    updateFee(feeCode, feeSchedule, feePeriod, feeQuantity, "N", "N", null);
}
else{
    showMessage=true;
    logDebug("Failed to add fee: Contractor Estimated Job Value missing or zero");
    logMessage("Failed to add fee: Contractor Estimated Job Value missing or zero");
}