//WTUA:Planning/Project Management Record/NA/NA

if (wfTask.equals("Project Review Intake") && wfStatus.equal("Submit Review Request")) {

	if (AInfo['Construction Plan Review'] == "CHECKED"){
		createChild("Planning","Plan Review","NA","NA",capName);
		editTaskSpecific("Project Review Intake","Construction Plan Review","UNCHECKED");
	}
	if (AInfo['Site Plan Review'] == "CHECKED"){
		createChild("Planning","Site Plan Review","NA","NA",capName);
		editTaskSpecific("Project Review Intake","Site Plan Review","UNCHECKED");
	}
	if (AInfo['Fire Plan Review'] == "CHECKED"){
		createChild("Planning","Fire Plan Review","NA","NA",capName);
		editTaskSpecific("Project Review Intake","Fire Plan Review","UNCHECKED");
	}
	if (AInfo['Preliminary Plan Review'] == "CHECKED"){
		var pprCapId = createChild("Planning","Preliminary Project Review","NA","NA",capName);
		var holdId = capId;
		capId = pprCapId;
		updateFee("PPR","PLNPPR_F","FINAL",1,"Y");
		capId = holdId;
		
		editTaskSpecific("Project Review Intake","Preliminary Plan Review","UNCHECKED");
	}
	if (AInfo['Zoning Verification'] == "CHECKED"){
		createChild("Planning","Verification","NA","NA",capName);
		editTaskSpecific("Project Review Intake","Zoning Verification","UNCHECKED");
	}
}
	


	
	