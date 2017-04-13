/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Specific Info Update After
 * Event Description:- The after event for when a user updates application specific information
 * MasterScript:- ApplicationSpecificInfoUpdateAfterV3.0.js
 * Record Type:- ASIUA;PLANNING!SITEPLANREVIEW!NA!NAjs
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//showDebug = true;
var pprNbr = AInfo["Preliminary Project Review #"];
//var pprString = pprNbr.toString();
logDebug("Preliminary Project Review # is: " +pprNbr);
//addParent("PPR2015-00001"); //this works of course
//addParent(aa.cap.getCapID("PPR2015-00001").getOutput()); //js 12.30.15
//addParent(aa.cap.getCapID(pprNbr).getOutput()); //cih 12.30.15
if (getApplication(pprNbr)) {
	addParent(aa.cap.getCapID(pprNbr).getOutput()); //cih 12.30.15
}	
//else {	
	//reportMsg = "You must first apply for a Preliminary Project Review Consultation before applying for a Site Plan Review."
	//message = reportMsg;
	//debug = reportMsg;
	//showMessage = true;
	//cancel = true;
//}
