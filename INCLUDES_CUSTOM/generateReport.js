/**
 * This function is used as a part of Email Notification Template.
 * This function is used to generate report, which is attached to the email notification from events
 * such as WorkflowTaskUpdateAfter(WTUA) or InspectionResultSubmitAfter(IRSA).
 * @param aaReportName
 * @param parameters
 * @param rModule
 * @returns reportFile
 */

function generateReport(aaReportName, parameters, rModule) {
	
	var reportName = aaReportName;
	
	report = aa.reportManager.getReportInfoModelByName(reportName);
	report = report.getOutput();
	report.setModule(rModule);
	report.setCapId(capId);
	report.setReportParamaeters(parameters);
	
	var permit = aa.reportManager.hasPermission(reportName, currentUserID);
	
	if (permit.getOutput().booleanValue()) {
		
		var reportResult = aa.reportManager.getReportResult(report);
		
		if (reportResult) {
			reportResult = reportResult.getOutput();
			var reportFile = aa.reportManager.storeReportToDisk(reportResult);
			logMessage("Report Result: " + reportResult);
			reportFile = reportFile.getOutput();
			return reportFile;
		} else {
			logMessage("Unable to run report: " + reportName + " For Admin "+ systemUserObj);
			return false;
		}
	} else {
		logMessage("Unable to run report: " + reportName + " For Admin "+ systemUserObj);
		return false;
	}
}