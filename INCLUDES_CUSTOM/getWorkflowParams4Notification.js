/**
 * This function gets the Workflow for the notification.
 * @param params
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function getWorkflowParams4Notification(params) {
	
	//Pass in a hashtable and it will add the additional parameters to the table
	//Testing Purpose Begins
	var wfTask = aa.env.getValue("WorkflowTask");				// Workflow Task Triggered event
	var wfStatus = aa.env.getValue("WorkflowStatus");			// Status of workflow that triggered event
	var wfDate = aa.env.getValue("WorkflowStatusDate");			// date of status of workflow that triggered event
	var wfDateMMDDYYYY = wfDate.substr(5,2) + "/" + wfDate.substr(8,2) + "/" + wfDate.substr(0,4);	// date of status of workflow that triggered event in format MM/DD/YYYY
	var wfProcessID = aa.env.getValue("ProcessID");				// Process ID of workflow
	var wfStep ; var wfComment ; var wfNote ; var wfDue ; var wfHours;			// Initialize
	var wfProcess ; 							// Initialize
	// Go get other task details
	var wfObj = aa.workflow.getTasks(capId).getOutput();
	for (i in wfObj) {
		fTask = wfObj[i];
		if (fTask.getTaskDescription().equals(wfTask) && (fTask.getProcessID() == wfProcessID)) {
			wfStep = fTask.getStepNumber();
			wfProcess = fTask.getProcessCode();
			wfComment = fTask.getDispositionComment();
			wfNote = fTask.getDispositionNote();
			wfDue = fTask.getDueDate();
			wfHours = fTask.getHoursSpent();
			wfTaskObj = fTask
		}
	}
	logDebug("wfTask = " + wfTask);
	logDebug("wfTaskObj = " + wfTask.getClass());
	logDebug("wfStatus = " + wfStatus);
	logDebug("wfDate = " + wfDate);
	logDebug("wfDateMMDDYYYY = " + wfDateMMDDYYYY);
	logDebug("wfStep = " + wfStep);
	logDebug("wfComment = " + wfComment);
	logDebug("wfProcess = " + wfProcess);
	logDebug("wfNote = " + wfNote);

	/* Added for version 1.7 */
	var wfStaffUserID = aa.env.getValue("StaffUserID");
	var wfTimeOT = aa.env.getValue("Overtime");
	logDebug("wfStaffUserID = " + wfStaffUserID);
	logDebug("wfHours = " + wfHours);
	
	//Testing purpose ends
	
	addParameter(params, "$$wfTask$$", wfTask);
	addParameter(params, "$$wfStatus$$", wfStatus);
	addParameter(params, "$$wfDate$$", wfDate);
	addParameter(params, "$$wfComment$$", wfComment);
	addParameter(params, "$$wfStaffUserID$$", wfStaffUserID);
	addParameter(params, "$$wfHours$$", "$" + wfHours);
	
	return params;
}