/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit Before
 * Event Description:- Before Event for Application Submittal
 * MasterScript:- ApplicationSubmitBeforeV3.0.js
 * Record Type:- ASB;PLANNING!SITEPLANREVIEW!NA!NA.js
 *
 * Preliminaray Plan Review is a prerequisite of SPR
 * When PPR# is entered, script verifies it exists,
 * if PPR# exists, bypass the reportMsg and continue with application submittal
 * if PPR# does not exist and/or is not found, stop - message user
 * USE THIS SCRIPT - 1/19/2016 - UPDATED IN SUPP3 MANUALLY, OUTSIDE OF VERSION CONTROL
 * TESTED SUCCESSFULLY FOR EACH SCENARIO (GOOD PPR, BAD PPR :)
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

var pprNbr = getAppSpecific("Preliminary Project Review #"); 
logDebug("Preliminary Project Review # is: " +pprNbr); //PPR2015-00001
if (!getApplication(pprNbr)) {
	myMsg = "Found PPR record " +pprNbr
	message = myMsg;
	debug = myMsg;
	showMessage = true; //change to false after successfully testing
} else {
	reportMsg = "You must first apply for a Preliminary Project Review Consultation before applying for a Site Plan Review."
	message = reportMsg;
	debug = reportMsg;
	showMessage = true;
	cancel = true;	
}