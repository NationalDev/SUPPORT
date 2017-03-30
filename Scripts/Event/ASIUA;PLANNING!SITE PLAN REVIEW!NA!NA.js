//DETROIT-ASIUA:Planning/Site Plan Review/NA/NA
//Testing in ASIUA first to debug
//Preliminary Plan Review is a prerequisite of SPR
//addParent(PPR capid) at submittal of SPR record shall be triggered via ASA and CTRCA
//reportMsg shall be triggered via page flow script on PLNSPR_PF page flow
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


