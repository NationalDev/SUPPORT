/**
 * This function closes all tasks on the record except for tasks in the list wfTask1..wfTaskn.
 * If you only supply the parameters pStatus and pComment, the function closes all tasks on the
 * record.
 * @param pStatus
 * @param pComment
 * @returns
 * 
 * Note:- Before the fucntion closes each task, the function updates the task as follows:-
 * 		Status = pStatus
 * 		Status Date = current date
 * 		Status Comment = pComment
 * 		Action By = current user
 * 
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function taskCloseAllExcept(pStatus,pComment) {
	var taskArray = new Array();
	var closeAll = false;
	if (arguments.length > 2) { //Check for task names to exclude
		for (var i=2; i<arguments.length; i++)
			taskArray.push(arguments[i]);
	} else{
		closeAll = true;
	}
	
	var workflowResult = aa.workflow.getTasks(capId);
	if (workflowResult.getSuccess()) {
		var wfObj = workflowResult.getOutput();
	} else {
		logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage());
		return false;
	}
	
	var fTask;
	var stepnumber;
	var processID;
	var dispositionDate = aa.date.getCurrentDate();
	var wfnote = " ";
	var wftask;
	
	for (i in wfObj) {
		fTask = wfObj[i];
		wftask = fTask.getTaskDescription();
		stepnumber = fTask.getStepNumber();
		//processID = fTask.getProcessID();
		if (closeAll) {
			aa.workflow.handleDisposition(capId,stepnumber,pStatus,dispositionDate,wfnote,pComment,systemUserObj,"Y");
			logMessage("Closing Workflow Task " + wftask + " with status " + pStatus);
			logDebug("Closing Workflow Task " + wftask + " with status " + pStatus);
		} else {
			if (!exists(wftask,taskArray)) {
				aa.workflow.handleDisposition(capId,stepnumber,pStatus,dispositionDate,wfnote,pComment,systemUserObj,"Y");
				logMessage("Closing Workflow Task " + wftask + " with status " + pStatus);
				logDebug("Closing Workflow Task " + wftask + " with status " + pStatus);
			}
		}
	}
}