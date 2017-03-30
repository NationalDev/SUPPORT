//WTUA:PLANNING/PRELIMINARY PROJECT REVIEW/NA/NA
var appName = getAppName(capId);
logDebug("appName is: " +appName);

if ((wfTask == "Project Review Intake") && (wfStatus == "No Action")) {
	closeTask("Plan Review Scheduled","No Action","Closed via Script","Closed via Script");
	}
	
if ((wfTask == "Project Review Intake") && (wfStatus == "Schedule Plan Review")) {	
	deactivateTask("Project Review Meeting");
	activateTask("Plan Review Scheduled");
	}
	
if ((wfTask == "Plan Review Scheduled") && (wfStatus == "Submit CPR")) {
	createChild("Permits","Review","Structural","NA",appName);		 //ToDo - call custom function appName as desc parameter
	closeTask("Plan Review Scheduled","Submit CPR","Plan Review Child Record(s) Created","Closed via Script");
	}
	
if ((wfTask == "Plan Review Scheduled") && (wfStatus == "Submit SPR")) {
	createChild("Planning","Site Plan Review","NA","NA",appName);	 //ToDo - call custom function appName as desc parameter
	closeTask("Plan Review Scheduled","Submit SPR","Plan Review Child Record(s) Created","Closed via Script");
	}
	
if ((wfTask == "Plan Review Scheduled") && (wfStatus == "Submit CPR and SPR")) {
	createChild("Permits","Review","Structural","NA",appName);		 //ToDo - call custom function appName as desc parameter
	createChild("Planning","Site Plan Review","NA","NA",appName);	 //ToDo - call custom function appName as desc parameter
	closeTask("Plan Review Scheduled","Submit CPR and SPR","Plan Review Child Record(s) Created","Closed via Script");
	}

	
	