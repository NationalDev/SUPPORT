function runReportAsync(reportName,module,itemCap,reportParameters) {
	var scriptName = "RUNREPORTASYNC";

	var envParameters = aa.util.newHashMap();
	envParameters.put("ReportName",reportName);
	envParameters.put("ReportParameters",reportParameters);
	envParameters.put("Module",module);
	envParameters.put("CustomCapId",capIDString);
	envParameters.put("ReportUser",currentUserID);
	envParameters.put("ServProvCode",servProvCode);
	envParameters.put("ErrorEmailTo","saxthelm@accela.com");
	envParameters.put("DebugEmailTo","saxthelm@accela.com");

	aa.runAsyncScript(scriptName, envParameters);
}