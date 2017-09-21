/*------------------------------------------------------------------------------------------------------/
| SVN $Id: PaymentReceiveAfter.js 6515 2012-03-16 18:15:38Z john.schomp $
| Program : PaymentReceiveAfterV.js
| Event   : PaymentReceiveAfter
|
| Usage   : Master Script by Accela.  See accompanying documentation and release notes.
|
| Client  : N/A
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
var controlString = "PaymentReceiveAfter"; 				// Standard choice for control
var preExecute = "PreExecuteForAfterEvents"				// Standard choice to execute first (for globals, etc)
var documentOnly = false;						// Document Only -- displays hierarchy of std choice steps

/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var SCRIPT_VERSION = 9.0;
var useCustomScriptFile = true;  // if true, use Events->Custom Script and Master Scripts, else use Events->Scripts->INCLUDES_*
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

var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";
var doStdChoices = true; // compatibility default
var doScripts = false;
var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0;
if (bzr) {
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE");
	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT");
	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
	var bvr3 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "USE_MASTER_INCLUDES");
	if (bvr3.getSuccess()) {if(bvr3.getOutput().getDescription() == "No") useCustomScriptFile = false}; 
}

if (SA) {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA,useCustomScriptFile));
	eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA,useCustomScriptFile));
	eval(getScriptText(SAScript, SA));
} else {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,useCustomScriptFile));
	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",null,useCustomScriptFile));
}

eval(getScriptText("INCLUDES_CUSTOM",null,useCustomScriptFile));

if (documentOnly) {
	doStandardChoiceActions(controlString, false, 0);
	aa.env.setValue("ScriptReturnCode", "0");
	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");
	aa.abortScript();
}

var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName);

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
var FeeSeqList = aa.env.getValue("FeeItemsList");			logDebug("FeeSeqList = " + FeeSeqList);
var FeeItemsOffsetList = aa.env.getValue("FeeItemsOffsetList");		logDebug("FeeItemsOffsetList = " + FeeItemsOffsetList);
var FeeItemsPaidList = aa.env.getValue("FeeItemsPaidList");		logDebug("FeeItemsPaidList = " + FeeItemsPaidList);
var FeePeriod = aa.env.getValue("FeePeriod");				logDebug("FeePeriod = " + FeePeriod);
var NumberOfFeeItems = aa.env.getValue("NumberOfFeeItems");		logDebug("NumberOfFeeItems = " + NumberOfFeeItems);
var PaymentCashierId = aa.env.getValue("PaymentCashierId");		logDebug("PaymentCashierId = " + PaymentCashierId);
var PaymentComment = aa.env.getValue("PaymentComment");			logDebug("PaymentComment = " + PaymentComment);
var PaymentDate = aa.env.getValue("PaymentDate");			logDebug("PaymentDate = " + PaymentDate);
var PaymentMethod = aa.env.getValue("PaymentMethod");			logDebug("PaymentMethod = " + PaymentMethod);
var PaymentRegisterId = aa.env.getValue("PaymentRegisterId");		logDebug("PaymentRegisterId = " + PaymentRegisterId);
var PaymentTotalAvailableAmount = aa.env.getValue("PaymentTotalAvailableAmount");	logDebug("PaymentTotalAvailableAmount = " + PaymentTotalAvailableAmount);
var PaymentTotalPaidAmount  = aa.env.getValue("PaymentTotalPaidAmount");	logDebug("PaymentTotalPaidAmount  = " + PaymentTotalPaidAmount );

var checkNumber = aa.env.getValue("PaymentCheckNumber");
var checkType = aa.env.getValue("PaymentCheckType");
var cHolderName = aa.env.getValue("PaymentCheckHolderName");
var cHolderEmail = aa.env.getValue("PaymentCheckHolderEmail");
var phoneCountryCode = aa.env.getValue("PaymentPayeePhoneCountryCode");
var phoneNumber = aa.env.getValue("PaymentPhoneNumber");
var bankName = aa.env.getValue("PaymentBankName");
var country = aa.env.getValue("PaymentCountry");
var state = aa.env.getValue("PaymentState");
var city = aa.env.getValue("PaymentCity");
var postalCode = aa.env.getValue("PaymentPostalCode");
var driverLicenseNumber = aa.env.getValue("PaymentDriverLicenseNumber");
var street = aa.env.getValue("PaymentStreet");

logDebug("checkNumber = " + checkNumber);
logDebug("checkType = " + checkType);
logDebug("cHolderName = " + cHolderName);
logDebug("cHolderEmail = " + cHolderEmail);
logDebug("country = " + country);
logDebug("state = " + state);
logDebug("city = " + city);
logDebug("street = " + street);
logDebug("street = " + phoneCountryCode);
logDebug("phoneNumber = " + phoneNumber);
logDebug("postalCode = " + postalCode);
logDebug("bankName = " + bankName);
logDebug("driverLicenseNumber = " + driverLicenseNumber);

/*------------------------------------------------------------------------------------------------------/
| END Event Specific Variables
/------------------------------------------------------------------------------------------------------*/

if (preExecute.length) doStandardChoiceActions(preExecute,true,0); 	// run Pre-execution code

logGlobals(AInfo);

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/
//
//  Get the Standard choices entry we'll use for this App type
//  Then, get the action/criteria pairs for this app
//

if (doStdChoices) doStandardChoiceActions(controlString,true,0);


//
//  Next, execute and scripts that are associated to the record type
//

if (doScripts) doScriptActions();

//
// Check for invoicing of fees
//
if (feeSeqList.length)
	{
	invoiceResult = aa.finance.createInvoice(capId, feeSeqList, paymentPeriodList);
	if (invoiceResult.getSuccess())
		logMessage("Invoicing assessed fee items is successful.");
	else
		logMessage("**ERROR: Invoicing the fee items assessed to app # " + capIDString + " was not successful.  Reason: " +  invoiceResult.getErrorMessage());
	}

/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (debug.indexOf("**ERROR") > 0)
	{
	aa.env.setValue("ScriptReturnCode", "1");
	aa.env.setValue("ScriptReturnMessage", debug);
	}
else
	{
	aa.env.setValue("ScriptReturnCode", "0");
	if (showMessage) aa.env.setValue("ScriptReturnMessage", message);
	if (showDebug) 	aa.env.setValue("ScriptReturnMessage", debug);
	}


/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/
