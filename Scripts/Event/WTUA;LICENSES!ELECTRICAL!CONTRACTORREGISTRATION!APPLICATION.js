//WTUA;LICENSES!ELECTRICAL!CONTRACTORREGISTRATION!APPLICATION.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//WTUA:LICENSES/ELECTRICAL/CONTRACTORREGISTRATION/APPLICATION

//Script Tester Code
/*
appTypeArray = ["Licenses","Electrical","ContractorRegistration","Application"];
capName = undefined;
capStatus = "Fees Paid";
fileDate = "3/9/2016";
fileDateYYYYMMDD = "2016-03-09";
var eventName = "WorkflowTaskUpdateAfter";
var myCapId = "EAPP2016-00003";
parcelArea = 0;
estValue = 0;
calcValue = 0;
feeFactor = "CONT";
houseCount = 0;
feesInvoicedTotal = 0;
balanceDue = 0;

wfTask = "Registration Issuance";

wfStatus = "Registration Issued";
wfDate = "2016-03-10";
wfDateMMDDYYYY = "03/10/2016";
wfStep = 5;
wfComment = null;
wfProcess = "LICBLDCONREG_WF";
wfNote = null;
myUserId = "ADMIN";
wfTimeBillable = 'N';
wfTimeOT = 'N';
wfHours = 0.0;


var useProductScript = true;  // set to true to use the "productized" master scripts (events->master scripts), false to use scripts from (events->scripts)
var runEvent = true; // set to true to simulate the event and run all std choices/scripts for the record type.

*/
// master script code don't touch  
//aa.env.setValue("EventName",eventName); var vEventName = eventName;  var controlString = eventName;  var tmpID = aa.cap.getCapID(myCapId).getOutput(); if(tmpID != null){aa.env.setValue("PermitId1",tmpID.getID1()); 	aa.env.setValue("PermitId2",tmpID.getID2()); 	aa.env.setValue("PermitId3",tmpID.getID3());} aa.env.setValue("CurrentUserID",myUserId); var preExecute = "PreExecuteForAfterEvents";var documentOnly = false;var SCRIPT_VERSION = 3.0;var useSA = false;var SA = null;var SAScript = null;var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_FOR_EMSE"); if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") { 	useSA = true; 		SA = bzr.getOutput().getDescription();	bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_INCLUDE_SCRIPT"); 	if (bzr.getSuccess()) { SAScript = bzr.getOutput().getDescription(); }	}if (SA) {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",SA,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",SA,useProductScript));	/* force for script test*/ showDebug = true; eval(getScriptText(SAScript,SA,useProductScript));	}else {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",null,useProductScript));	}	eval(getScriptText("INCLUDES_CUSTOM",null,useProductScript));if (documentOnly) {	doStandardChoiceActions2(controlString,false,0);	aa.env.setValue("ScriptReturnCode", "0");	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");	aa.abortScript();	}var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX",vEventName);var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";var doStdChoices = true;  var doScripts = false;var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice ).getOutput().size() > 0;if (bzr) {	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"STD_CHOICE");	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"SCRIPT");	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	}	function getScriptText(vScriptName, servProvCode, useProductScripts) {	if (!servProvCode)  servProvCode = aa.getServiceProviderCode();	vScriptName = vScriptName.toUpperCase();	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();	try {		if (useProductScripts) {			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);		} else {			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");		}		return emseScript.getScriptText() + "";	} catch (err) {		return "";	}}logGlobals(AInfo); if (runEvent && typeof(doStandardChoiceActions) == "function" && doStdChoices) try {doStandardChoiceActions(controlString,true,0); } catch (err) { logDebug(err.message) } if (runEvent && typeof(doScriptActions) == "function" && doScripts) doScriptActions(); var z = debug.replace(/<BR>/g,"\r");  aa.print(z);
// End master script code
//End Script Tester Code
/*

Copied from WTUA;PUBLICWORKS!RW_USE!VALET_ANNUAL!APPLICATION.js

Refer fo Standard Choices "WTUA:Licenses/Contractor/~/Application Line 02" >> "LIC Issue Business License"
Do not know what LicProfLookup does refter to StdCh "WTUA:Licenses/Contractor/~/Application Line 03"
*/
var wfTaskBool = wfTask == "License Issuance";
var wfStatusBool = wfStatus == "Registration Issued";
logDebug(wfTaskBool + "::" + wfStatusBool);
showDebug = true;
showMessage = true;
if ((wfTask == "License Issuance") && (wfStatus == "Registration Issued")) {
    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = appTypeArray[2];
    monthsToInitialExpire = 12;
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "NA",null);
    
    // create the License record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        updateAppStatus("Active","Originally Issued",newLicId);
        copyAppSpecific(newLicId,"");
    } else {
        logDebug("Failed to Create Parent");
    }
    
    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(dateAdd(tmpNewDate,0));
        thisLic.setStatus("Active");
    } else {
        logDebug("Failed to Set Expiration Status");
    }
} else {
    logDebug(wfTask + " is " + wfTaskBool);
    logDebug(wfStatus + " is " + wfStatusBool);
}
/*Changes applicant's contact type to Elec Con Reg
 if (newLicId) {
 conToChange = null;
 cons = aa.people.getCapContactByCapID(newLicId).getOutput();
 for (thisCon in cons) if (cons[thisCon].getCapContactModel().getPeople().getContactType() == "Applicant") conToChange = cons[thisCon].getCapContactModel();
 } else { conToChange = null; }
 if (conToChange) {
 p = conToChange.getPeople();
 p.setContactType("Elec Con Reg");
 conToChange.setPeople(p);
 aa.people.editCapContact(conToChange);
 }
 
 //copyASITables(capId,newLicId);
 }
 
 /*Do not know what LicProfLookup does
 //refer fo Standard Choices "WTUA:Licenses/Contractor//Application" & "LIC Issue Business License"
 if (wfTask == "Registration Issuance" && wfStatus == "Registration Issued") {
 branch("EMSE:LicProfLookup");
 }
 */
try {
    showDebug = true;
    
}
catch (err) {
    logDebug("A JavaScript Error occured: " + err.message);
}
// end user code
aa.env.setValue("ScriptReturnCode", "0"); 	aa.env.setValue("ScriptReturnMessage", debug)


