//WTUA:Planning/Project Management Record/NA/NA

if (wfTask.equals("Project Review Intake") && wfStatus.equals("No Action")) {
	closeTask("Plan Review Scheduled","No Action","Closed via Script","Closed via Script");
	}
	
if (wfTask.equals("Plan Review Scheduled") && matches(wfStatus,"Submit CPR","Submit CPR and SPR")) {
	createChild("Planning","Plan Review","NA","NA",capName);
	}
	
if (wfTask.equals("Plan Review Scheduled") && matches(wfStatus,"Submit SPR","Submit CPR and SPR")) {
	createChild("Planning","Site Plan Review","NA","NA",capName);
	}

	
	