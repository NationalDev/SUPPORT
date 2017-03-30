/*------------------------------------------------------------------------------------------------------/
 | SVN $Id: ReportServiceRunBefore.js 2016-09-26 Greg Soter $
 | Program : REPORTSERVICERUNBEFORE.js
 | Event   : ReportServiceRunBefore
 |
 | Usage   : Master Script by FutureNet Group Inc.
 |
 | Client  : DETROIT
 | Action# : N/A
 |
 | Notes   :
 |
 |
 /------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
 | START User Configurable Parameters
 |
 |     Only variables in the following section may be changed.  If any other section is modified, this
 |     will no longer be considered a "Master" script and will not be supported in future releases.  If
 |     changes are made, please add notes above.
 /------------------------------------------------------------------------------------------------------*/
var controlString = "ReportServiceRunBefore"; 				// Standard choice for control
var preExecute = "PreExecuteForBeforeEvents"				// Standard choice to execute first (for globals, etc)
var documentOnly = false;						// Document Only -- displays hierarchy of std choice steps

/*------------------------------------------------------------------------------------------------------/
 | END User Configurable Parameters
 /------------------------------------------------------------------------------------------------------*/
var SCRIPT_VERSION = 3.0;
var useCustomScriptFile = true;  // if true, use Events->Custom Script, else use Events->Scripts->INCLUDES_CUSTOM
var useSA = false;
var SA = null;
var SAScript = null;
var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE");
if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") {
    useSA = true;
    SA = bzr.getOutput().getDescription();
    bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT");
    if (bzr.getSuccess()) {
        SAScript = bzr.getOutput().getDescription();
    }
}

if (SA) {
    eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA));
    eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA));
    eval(getScriptText(SAScript, SA));
} else {
    eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
    eval(getScriptText("INCLUDES_ACCELA_GLOBALS"));
}

eval(getScriptText("INCLUDES_CUSTOM",null,useCustomScriptFile));

if (documentOnly) {
    doStandardChoiceActions(controlString, false, 0);
    aa.env.setValue("ScriptReturnCode", "0");
    aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");
    aa.abortScript();
}

var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName);

var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";
var doStdChoices = true; // compatibility default
var doScripts = false;
var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0;
if (bzr) {
    var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE");
    doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
    var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT");
    doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
}

function getScriptText(vScriptName, servProvCode, useProductScripts) {
    if (!servProvCode)  servProvCode = aa.getServiceProviderCode();
    vScriptName = vScriptName.toUpperCase();
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    try {
        if (useProductScripts) {
            var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
        } else {
            var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
        }
        return emseScript.getScriptText() + "";
    } catch (err) {
        return "";
    }
}
/*------------------------------------------------------------------------------------------------------/
| BEGIN Event Specific Variables
/------------------------------------------------------------------------------------------------------*/


logDebug("ReportServiceRunBeforeScript param:");
var servProvCode = aa.env.getValue("serviceProviderCode"); logDebug("servProvCode=" + servProvCode);
var report = aa.env.getValue("reportId"); logDebug("report=" + reportName);
var portlet = aa.env.getValue("portletName"); logDebug("portletName=" + portlet);
var caller = aa.env.getValue("callerId"); logDebug("callerId=" + caller);
var currModule = aa.env.getValue("module"); logDebug("module=" + currModule);

logDebug("PermitId1=" + aa.env.getValue("PermitId1"));
logDebug("PermitId2=" + aa.env.getValue("PermitId2"));
logDebug("PermitId3=" + aa.env.getValue("PermitId3"));


//var capID = getCapID();
//var taskStatusDesc = "Issued";
//var taskDescription = "Permit Issuance";

/*------------------------------------------------------------------------------------------------------/
 | END Event Specific Variables
 /------------------------------------------------------------------------------------------------------*/

if (preExecute.length) {
    doStandardChoiceActions(preExecute, true, 0); // run Pre-execution code
}
logGlobals(AInfo);

/*------------------------------------------------------------------------------------------------------/
 | <===========Main=Loop================>
 |
 /-----------------------------------------------------------------------------------------------------*/

if (doStdChoices) {
    doStandardChoiceActions(controlString, true, 0);
}
if (doScripts) {
    doScriptActions();
}
//
// Check for invoicing of fees
//
if (feeSeqList.length) {
    invoiceResult = aa.finance.createInvoice(capId, feeSeqList, paymentPeriodList);
    if (invoiceResult.getSuccess()) {
        logDebug("Invoicing assessed fee items is successful.");
    }
    else {
        logDebug("**ERROR: Invoicing the fee items assessed to app # " + capIDString + " was not successful.  Reason: " + invoiceResult.getErrorMessage());

    }
}

/*------------------------------------------------------------------------------------------------------/
 | <===========END=Main=Loop================>
 /-----------------------------------------------------------------------------------------------------*/

if (debug.indexOf("**ERROR") > 0) {
    aa.env.setValue("ScriptReturnCode", "1");
    aa.env.setValue("ScriptReturnMessage", debug);
} else {
    if (cancel) {
        aa.env.setValue("ScriptReturnCode", "1");
        if (showMessage)
            aa.env.setValue("ScriptReturnMessage", "<font color=red><b>Action Cancelled</b></font><br><br>" + message);
        if (showDebug)
            aa.env.setValue("ScriptReturnMessage", "<font color=red><b>Action Cancelled</b></font><br><br>" + debug);
    } else {
        aa.env.setValue("ScriptReturnCode", "0");
        if (showMessage)
            aa.env.setValue("ScriptReturnMessage", message);
        if (showDebug)
            aa.env.setValue("ScriptReturnMessage", debug);
    }
}






