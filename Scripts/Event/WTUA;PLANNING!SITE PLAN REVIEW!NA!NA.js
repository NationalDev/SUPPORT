//WTUA:PLANNING/SITE PLAN REVIEW/NA/NA
//logDebug("Project Manager task is choosing the department reviewers via TSI");
//TODO:Transfer these statements to the WTUA:Plannning/Project Reviews/Project Management Record/NA
var TSI = new Array();
if (wfTask == "Project Manager" && wfStatus == "Completed") {
	loadTaskSpecific(TSI,capId);
	
	if ((AInfo["Zoning Review"]) == "Yes") {
		activateTask("Zoning Review");
	}
	else (deactivateTask("Zoning Review"));
	
	if ((AInfo["Planning/Design Review"]) == "Yes") {
		activateTask("Planning/Design Review");
	}
	else (deactivateTask("Planning/Design Review"));

	if ((AInfo["Traffic Engineering Review"]) == "Yes") {
		activateTask("Traffic Engineering Review");
	}	
	else (deactivateTask("Traffic Engineering Review"));

	if ((AInfo["DWSD Review"]) == "Yes") {
		activateTask("DWSD Review");
	}
	else (deactivateTask("DWSD Review"));

	if ((AInfo["Public Lighting Review"]) == "Yes") {
		activateTask("Public Lighting Review");
	}
	else (deactivateTask("Public Lighting Review"));

	if ((AInfo["Stormwater Review"]) == "Yes") {
		activateTask("Stormwater Review");
	}
	else (deactivateTask("Stormwater Review"));

	if ((AInfo["Public Works Review"]) == "Yes") {
		activateTask("Public Works Review");
	}
	else (deactivateTask("Public Works Review"));

	if ((AInfo["Fire Review"]) == "Yes") {
		activateTask("Fire Review");
	}
	else (deactivateTask("Fire Review"));

	if ((AInfo["Environmental Review"]) == "Yes") {
		activateTask("Environmental Review");
	}
	else (deactivateTask("Environmental Review"));

	if ((AInfo["DTE Review"]) == "Yes") {
		activateTask("DTE Review");
	}
	else (deactivateTask("DTE Review"));
}