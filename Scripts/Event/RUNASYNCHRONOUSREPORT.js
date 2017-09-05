/*------------------------------------------------------------------------------------------------------/
| Program : RUNREPORTANDSENDASYNC.js
| Event   : RUNREPORTANDSENDASYNC
|
| Usage   : Run report and send async.
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

// ********************************************************************************************************************************
//	Env Paramters Below
// ********************************************************************************************************************************
var servProvCode = aa.env.getValue("ServProvCode");			// Service Provider Code
var capIDString = aa.env.getValue("CustomCapId");			// Custom CAP ID
var capId = aa.env.getValue("CapID");
var reportName = aa.env.getValue("ReportName"); 			// Report Name
var reportParameters = aa.env.getValue("ReportParameters");	// Report Paramters, it should be HashTable
var module = aa.env.getValue("Module");						// Module Name
var reportUser = aa.env.getValue("ReportUser"); 			// AA User
var errorEmailTo = aa.env.getValue("ErrorEmailTo");			// To Email Address handle Error Message
var debugEmailTo = aa.env.getValue("DebugEmailTo");			// To Email Address handle Debug Message
var	emailFrom = aa.env.getValue("EmailFrom");
var	emailTo = aa.env.getValue("EmailTo");
var	emailTemplate = aa.env.getValue("EmailTemplate");
var	emailParameters = aa.env.getValue("EmailParameters");
var emailCC = aa.env.getValue("EmailCC");

 
var debug = "";
var error = "";
var br = "<BR/>";
var systemMailFrom = "noreply@accela.com";

//var rParams = aa.util.newHashMap();
//rParams = convertStringToHashMap(String(reportParamters));

//var eParams = aa.util.newHashtable();
//eParams = convertStringToHashTable(String(emailParameters));

// ********************************************************************
printEnv();
// ***********************************************************************
handleEnvParamters();

var success = sendReport();

if(errorEmailTo != null && errorEmailTo != "" && success == false) {
	aa.sendMail(systemMailFrom, errorEmailTo, "", "Errors occurs in Sending Report Script", error);
}

if(debugEmailTo != null && debugEmailTo != "") {
	aa.sendMail(systemMailFrom, debugEmailTo, "", "Debug Information in Sending Report Script", debug);
}


// ======================================================================
//
//					Internal Function
//
// ======================================================================

// Main Function to send report
function sendReport() {
	
	try {
		// Step 1.  Get Report Model by ReportName
		logDebug("Step 1.  Get Report Model by ReportName");
		var reportInfoResult = aa.reportManager.getReportInfoModelByName(reportName);
		if(reportInfoResult.getSuccess() == false) {
			// Notify adimistrator via Email, for example
			logError("Could not found this report " + reportName);		
			return false;
		}
		
		// Step 2. Initialize report
		logDebug("Step 2. Initialize report");
		report = reportInfoResult.getOutput();
		report.setModule(module);
		report.setCapId(capIDString);
		report.setReportParameters(reportParameters);
		//report.getEDMSEntityIdModel().setAltId(capIDString);
		
		// Step 3. Check permission on report
		logDebug("Step 3. Check permission on report");
		var permissionResult = aa.reportManager.hasPermission(reportName,reportUser);
		if(permissionResult.getSuccess() == false || permissionResult.getOutput().booleanValue() == false) {
			// Notify adimistrator via Email, for example
			logError("The user " + reportUser + " does not have perssion on this report " + reportName);		
			return false;
		}
		
		// Step 4. Run report
		logDebug("Step 4. Run report");
		var reportResult = aa.reportManager.getReportResult(report);
		if(reportResult.getSuccess() == false){
			// Notify adimistrator via Email, for example
			logError("Could not get report from report manager normally, error message please refer to (" + capIDString +"): " + reportResult.getErrorType() + ":" + reportResult.getErrorMessage());		
			return false;
		}
		
		// Step 5, Store Report File to harddisk
		logDebug("Step 5, Store Report File to harddisk");
		reportResult = reportResult.getOutput();
	    var reportFileResult = aa.reportManager.storeReportToDisk(reportResult);
		if(reportFileResult.getSuccess() == false) {
			// Notify adimistrator via Email, for example
			logError("The appliation does not have permission to store this temporary report " + reportName + ", error message please refer to:" + reportResult.getErrorMessage());		
			return false;
		}

		// Step 6. Send Report via Email
		logDebug("Step 6. Send Report via Email");
	    var reportFile = reportFileResult.getOutput();
		var capIDArray = capId.toString().split("-");
		
		var id1 = capIDArray[0];
	 	var id2 = capIDArray[1];
	 	var id3 = capIDArray[2];
		var capIDScriptModel = aa.cap.createCapIDScriptModel(id1, id2, id3);

		var rFiles = [];
		rFiles.push(reportFile);
		if (!matches(emailTo,null,"",undefined)) {
			var result = null;
			result = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, emailTemplate, emailParameters, capIDScriptModel, rFiles);
			if(result.getSuccess())
			{
				logDebug("Sent email successfully!");
				return true;
			}
			else
			{
				logError("Failed to send mail. - " + result.getErrorType());
				return false;
			}		
		} else {
			logError("No email address available.");
			return false;
		}		


		
	}
	catch(err){
		logError("One error occurs. Error description: " + err );
		return false;
	}	
}

function handleEnvParamters() {
	if(servProvCode == null) servProvCode = "";	
	if(capIDString == null) capIDString = "";
	if(capId == null) capId = "";
	if(reportName == null) reportName = "";
	if(module == null) module = "";
	if(reportUser == null) reportUser = "";
	if(errorEmailTo == null) errorEmailTo = "";
	if(debugEmailTo == null) debugEmailTo = "";
	if(emailFrom == null) emailFrom = "";
	if(emailTo == null) emailTo = "";
	if(emailTemplate == null) emailTemplate = "";
}

function logDebug(dstr) {
	debug += dstr + br;	
}

function logError(dstr) {
	error += dstr + br;
	logDebug(dstr);
}

function printEnv() {
    //Log All Environmental Variables as  globals
    var params = aa.env.getParamValues();
    var keys =  params.keys();
    var key = null;
    while(keys.hasMoreElements())
    {
     key = keys.nextElement();
     eval("var " + key + " = aa.env.getValue(\"" + key + "\");");
     logDebug(key + " = " + aa.env.getValue(key));
    }
}

function convertStringToHashMap(theString) {
    var retObj = aa.util.newHashMap();
    theString = theString.replace(/^\{|\}$/g,'').split(',');
    for(var i=0,cur,pair;cur=theString[i];i++){
        pair = cur.split('=');
        var key = pair[0].trim().toString()
        if (pair[1]) var val = pair[1].toString(); else val = "";
        retObj.put(key,val);
    }
    return retObj;
}

function convertStringToHashTable(theString) {
    var retObj = aa.util.newHashtable();
    theString = theString.replace(/^\{|\}$/g,'').split(',');
    for(var i=0,cur,pair;cur=theString[i];i++){
        pair = cur.split('=');
        var key = pair[0].trim().toString()
        if (pair[1]) var val = pair[1].toString(); else val = "";
        retObj.put(key,val);
    }
    return retObj;
}

function matches(eVal,argList) {
   for (var i=1; i<arguments.length;i++)
   	if (arguments[i] == eVal)
   		return true;

}

