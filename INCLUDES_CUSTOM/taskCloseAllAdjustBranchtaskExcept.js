function taskCloseAllAdjustBranchtaskExcept(e, t) {
var n = new Array;
var r = false;
if (arguments.length > 2) {
for (var i = 2; i < arguments.length; i++)
n.push(arguments[i])
} else
r = true;
var s = aa.workflow.getTasks(capId);
if (s.getSuccess())
var o = s.getOutput();
else {
logMessage("**ERROR: Failed to get workflow object: " + s.getErrorMessage());
return false
}
var u;
var a;
var f;
var l = aa.date.getCurrentDate();
var c = " ";
var h;
for (i in o) {
u = o[i];
h = u.getTaskDescription();
a = u.getStepNumber();
if (r) {
aa.workflow.handleDisposition(capId, a, e, l, c, t, systemUserObj, "B");
logMessage("Closing Workflow Task " + h + " with status " + e);
logDebug("Closing Workflow Task " + h + " with status " + e)
} else {
if (!exists(h, n)) {
aa.workflow.handleDisposition(capId, a, e, l, c, t, systemUserObj, "B");
logMessage("Closing Workflow Task " + h + " with status " + e);
logDebug("Closing Workflow Task " + h + " with status " + e)
}
}
}
}

