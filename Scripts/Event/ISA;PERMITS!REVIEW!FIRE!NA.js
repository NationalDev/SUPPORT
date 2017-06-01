/**  
 * Event Name:- Inspection Schedule After
 * Event Description:- The after event for when a user schedules one or more inspections.
 * MasterScript:- InspectionScheduleAfterV3.0.js
 * Record Type:- ISA;PERMITS!REVIEW!FIRE!NA.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

showDebug = true; 
showMessage = true;
var qty = 1;
if (inspType == "Fire Alarm Test") {
	checkInspectionResult("Fire Alarm Test","Scheduled");
	updateFee("PMTINSP_FAT","PMTPRVFIR_F","FINAL",qty,"N");
}
if (inspType == "Post and Measure Test - Within Tent") {
	updateFee("PMTINSP_PAM","PMTPRVFIR_F","FINAL",qty,"N");
}
if (inspType == "Sprinkler System Rough Inspection") {
	updateFee("PMTINSP_SSR","PMTPRVFIR_F","FINAL",qty,"N");
}
if (inspType == "Tent Inspection - Per Tent") {
	updateFee("PMTINSP_TPT","PMTPRVFIR_F","FINAL",qty,"N");
}
if (inspType == "FM 200 Systems") {
	updateFee("PMTINSP_FM2","PMTPRVFIR_F","FINAL",qty,"N");
}
if (inspType == "Fire Pump Test") {
	updateFee("PMTINSP_FPT","PMTPRVFIR_F","FINAL",qty,"N");
}
if (inspType == "Generator Test") {
	updateFee("PMTINSP_GEN","PMTPRVFIR_F","FINAL",qty,"N");
}
if (inspType == "Hood System") {
	updateFee("PMTINSP_HOOD","PMTPRVFIR_F","FINAL",qty,"N");
}
if (inspType == "Hydrostatic Test") {
	updateFee("PMTINSP_HST","PMTPRVFIR_F","FINAL",qty,"N");
}
if (inspType == "Hydrant Flow Test") {
	updateFee("PMTINSP_HFT","PMTPRVFIR_F","FINAL",qty,"N");
}