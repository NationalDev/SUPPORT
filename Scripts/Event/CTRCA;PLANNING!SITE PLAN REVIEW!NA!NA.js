//DETROIT-CTRCA:PLANNING/SITE PLAN REVIEW/NA/NA
//Preliminaray Plan Review is a prerequisite of SPR
//When PPR# is entered, script verifies it exists and links PPR as parent cap to SPR
//When PPR # entered and not found,
//stop - message user
//
//var pprNbr = getAppSpecific("Preliminary Project Review #"); 
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