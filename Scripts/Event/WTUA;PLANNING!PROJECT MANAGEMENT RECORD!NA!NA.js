//WTUA:Planning/Project Management Record/NA/NA
var appName = getAppName(capId);
logDebug("appName is: " +appName);

if (wfTask.equals("Project Review Intake") && wfStatus.equals("No Action")) {
	closeTask("Plan Review Scheduled","No Action","Closed via Script","Closed via Script");
	}
	
if (wfTask.equals("Plan Review Scheduled") && matches(wfStatus,"Submit CPR","Submit CPR and SPR")) {
	createChild("Permits","Review","Structural","NA",appName);
	}
	
if (wfTask.equals("Plan Review Scheduled") && matches(wfStatus,"Submit SPR","Submit CPR and SPR")) {
	createChild("Planning","Site Plan Review","NA","NA",appName);
	}

	
	