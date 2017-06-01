/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Report Service Run Before
 * Event Description:- The before event for when a user runs a report service.
 * MasterScript:- NA
 * Record Type:- RSRB;PUBLICWORKS!RW_USE!DUMPSTER!~.js
 *  
 * Updates license record when business license renewal fee is paid. 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

showmessage=true;
showDebug=true;
main(capId,"Issued","Permit Issuance");
function main (capID,taskStatusDesc,taskDescription) {
    var taskItem = getTaskItem(capID, taskDescription);
    var scriptTask = getTaskItemScriptModel();
    scriptTask.setCapID(capID);
    scriptTask.setTaskItem(taskItem);
    var taskStatusScriptModel = getTaskStatus(scriptTask,taskStatusDesc);
    if (taskStatusScriptModel == null || getBalance(capID) <= 0 || getBalance(capID) == null) {
        //stop report run
        comment("Permit not ready for issuance.\nBalance must be zero\n\'Permit Issuance\' task must be complete");
        showMessage = true;
        cancel = true;
        //aa.env.setValue("ScriptReturnCode","1");
        //aa.env.setValue("ScriptReturnMessage","The report is stopped by EMSE.");
    } else {
        //continue report run
        //aa.env.setValue("ScriptReturnCode","0");
        //aa.env.setValue("ScriptReturnMessage","The report continue run by EMSE.");
    }
}

function getTaskStatus (scriptTask,taskStatusDesc) {
    var taskStatusScriptModel= null;
    var result = aa.workflow.getTask(capID, taskDescription);
    if (result.getSuccess()) {
        taskStatusScriptModel= result.getOutput();
        if (taskItemScriptModel == null) {
            logDebug("**ERROR: Failed to get workflow task status with CAPID(" + capID + ")");
        }
    } else {
        logDebug("**ERROR: Failed to get workflow task status(" + capID + ") for review: " + result.getErrorMessage());
    }
    return taskStatusScriptModel;
}

function getTaskItem (capID,taskDescription) {
    var taskItemScriptModel = null;
    var result = aa.workflow.getTask(capID, taskDescription);
    if (result.getSuccess()) {
        taskItemScriptModel = result.getOutput();
        if (taskItemScriptModel == null) {
            logDebug("**ERROR: Failed to get workflow task with CAPID(" + capID + ")");
        }
    } else {
        logDebug("**ERROR: Failed to get workflow task(" + capID + ") for review: " + result.getErrorMessage());
    }
    return taskItemScriptModel;
}

function getCapID() {
    var id1 = aa.env.getValue("PermitId1");
    var id2 = aa.env.getValue("PermitId2");
    var id3 = aa.env.getValue("PermitId3");
    var capIDResult = aa.cap.getCapID(id1, id2, id3);
    if (capIDResult.getSuccess()) {
        return capIDResult.getOutput();
    }
    return null;
}

function getTaskItemScriptModel() {
    var taskItemScriptResult = aa.workflow.getTaskItemScriptModel();
    if (taskItemScriptResult.getSuccess()) {
        return taskItemScriptResult.getOutput();
    }
    return null;
}

function getBalance(capID) {
    var capDetailObjResult = aa.cap.getCapDetail(capID);
    if (capDetailObjResult.getSuccess()) {
        capDetail = capDetailObjResult.getOutput();
        var balanceDue = capDetail.getBalance();
        return balanceDue;
    } else {
        logDebug("**ERROR: Failed to get capDetailObject for BalanceDue");
        return null;
    }
}