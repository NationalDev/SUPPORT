/**
 * This function is used as a part of Email Notification Template.
 * This function is used to generate report, which is attached to the email notification from events
 * such as WorkflowTaskUpdateAfter(WTUA) or InspectionResultSubmitAfter(IRSA).
 * @param aaReportName
 * @param parameters
 * @param rModule
 * @returns reportFile
 */

function generateReport(itemCap, reportName, module, parameters) {
    //returns the report file which can be attached to an email.
    var user = currentUserID;   // Setting the User Name
    var report = aa.reportManager.getReportInfoModelByName(reportName);
    report = report.getOutput();
    report.setModule(module);
    report.setCapId(itemCap);
    report.setReportParameters(parameters);
    var vAltId = itemCap.getCustomID();
    report.getEDMSEntityIdModel().setAltId(vAltId);

    var permit = aa.reportManager.hasPermission(reportName, user);
    if (permit.getOutput().booleanValue()) {
        var reportResult = aa.reportManager.getReportResult(report);
        if (!reportResult.getSuccess()) {
            logDebug("System failed get report: " + reportResult.getErrorType() + ":" + reportResult.getErrorMessage());
            return false;
        }
        else {
            var reportOutput = reportResult.getOutput();
            var reportFile = aa.reportManager.storeReportToDisk(reportOutput);
            reportFile = reportFile.getOutput();
            logDebug("Report " + reportName + " generated for record " + itemCap.getCustomID());
            return reportFile;
        }
    }
    else {
        logDebug("Permissions are not set for report " + reportName + ".");
        return false;
    }
}