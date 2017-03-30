//WTUA:Permits/Review/*/NA
//logDebug("Plan Distribution task is choosing the department reviewers via TSI");
var TSI = new Array();
if (wfTask == "Plan Distribution" && wfStatus == "Distribute for Review") {
	loadTaskSpecific(TSI,capId);
	if ((AInfo["Zoning Review"]) == "Yes") {
		activateTask("Zoning Review");
	}
	else (deactivateTask("Zoning Review"));
	
	if ((AInfo["Structural"]) == "Yes") {
		activateTask("Structural");
	}
	else (deactivateTask("Structural"));

	if ((AInfo["Electrical"]) == "Yes") {
		activateTask("Electrical");
	}	
	else (deactivateTask("Electrical"));

	if ((AInfo["Plumbing"]) == "Yes") {
		activateTask("Plumbing");
	}
	else (deactivateTask("Plumbing"));

	if ((AInfo["Mechanical"]) == "Yes") {
		activateTask("Mechanical");
	}
	else (deactivateTask("Mechanical"));

	if ((AInfo["Fire Marshal"]) == "Yes") {
		activateTask("Fire Marshal");
	}
	else (deactivateTask("Fire Marshal"));

	if ((AInfo["DWSD"]) == "Yes") {
		activateTask("DWSD");
	}
	else (deactivateTask("DWSD"));

	if ((AInfo["Planning and Development"]) == "Yes") {
		activateTask("Planning and Development");
	}
	else (deactivateTask("Planning and Development"));

	if ((AInfo["Traffic Engineering-Curb Cuts"]) == "Yes") {
		activateTask("Traffic Engineering-Curb Cuts");
	}
	else (deactivateTask("Traffic Engineering-Curb Cuts"));

	if ((AInfo["Encroachments"]) == "Yes") {
		activateTask("Encroachments");
	}
	else (deactivateTask("Encroachments"));

	if ((AInfo["City Planning"]) == "Yes") {
		activateTask("City Planning");
	}
	else (deactivateTask("City Planning"));

	if ((AInfo["Historic District Commission"]) == "Yes") {
		activateTask("Historic District Commission");
	}
	else (deactivateTask("Historic District Commission"));

	if ((AInfo["Institute of Public Health"])== "Yes") {
		activateTask("Institute of Public Health");
	}
	else (deactivateTask("Institute of Public Health"));
}