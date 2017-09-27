function runReportAndSendAsync(reportName, module, itemCap, reportParameters, emailFrom, emailTo,emailTemplate, emailParameters, emailCC) {
	var scriptName = "RUNREPORTANDSENDASYNC";
	var errorEmailTo = "";
	var debugEmailTo = errorEmailTo;
//**********************************************************
	logDebug("(runReportAndSendAsync) Setting environment variables.");
	var envParameters = aa.util.newHashMap();
	envParameters.put("ReportName",reportName);
	envParameters.put("ReportParameters",reportParameters);
	envParameters.put("Module",module);
	envParameters.put("CustomCapId",itemCap.getCustomID());
	envParameters.put("CapID",itemCap);
	envParameters.put("ReportUser",currentUserID);
	envParameters.put("ServProvCode",servProvCode);
	envParameters.put("EmailFrom",emailFrom);
	envParameters.put("EmailTo", emailTo);
	envParameters.put("EmailCC", emailCC);
	envParameters.put("EmailTemplate",emailTemplate);
	envParameters.put("EmailParameters",emailParameters);	
	envParameters.put("ErrorEmailTo",errorEmailTo);	
	envParameters.put("DebugEmailTo",debugEmailTo);

	aa.runAsyncScript(scriptName, envParameters);
}

