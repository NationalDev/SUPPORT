/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record.
 * 
 * Event Name:- Convert To Real CAP After
 * Event Description:- The after event for converting a partial record ID to a real record ID.
 * MasterScript:- ConvertToRealCAPAfterV3.0.js
 * Record Type:- CTRCA;PLANNING!SITEPLANREVIEW!NA!NA.js
 *
 * Preliminaray Plan Review is a prerequisite os SPR
 * When PPR# is entered, script verifies it exists and links PPR as parentcap to SPR
 * When PPR# entered and not found, stop - message user
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

var pprNbr = AInfo["Preliminary Project Review #"]; 
if (getApplication(pprNbr)) {
	showDebug = true;
	logDebug("Preliminary Project Review # is: " +pprNbr); //PPR2015-00001	
	addParent(aa.cap.getCapID(pprNbr).getOutput()); //CIH 1.5.16 reportMsg working; addParent() to occur in CTRCA 	
}	
//else {
	//reportMsg = "You must first apply for a Preliminary Project Review Consultation before applying for a Site Plan Review."
	//reportMsg to trigger in page flow script only
	//message = reportMsg;
	//debug = reportMsg;
	//showMessage = true;
	//cancel = true;	
//}