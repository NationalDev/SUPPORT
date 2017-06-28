/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;PLANNING!PRELIMINARY PROJECT REVIEW!NA!NA.js
 *  
 * Ensures that all record contacts are based on reference contacts.
 *   
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
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