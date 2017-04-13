/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * MasterScript:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;PLANNING!SITEPLANREVIEW!NA!NA.js
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//DETROIT-ASA:Planning/Site Plan Review/NA/NA
//Testing in ASIUA and then in ASA
//Preliminary Plan Review is a prerequisite of SPR
//addParent(PPR capid) at submittal of SPR record
showDebug = true;
var pprNbr = AInfo["Preliminary Project Review #"];
logDebug("Preliminary Project Review # is: " +pprNbr);
//addParent(aa.cap.getCapID("PPR2015-00001").getOutput()); //js 12.30.15
addParent(aa.cap.getCapID(pprNbr).getOutput()); //cih 12.30.15