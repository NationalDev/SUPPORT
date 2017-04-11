/**
 * This function runs a test on a particular report provided the name of that report
 * @param aaReportName
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function runReportTest(aaReportName) {
    x = "test param"
    currentUserID = "ADMIN";
    setCode = "X";
    var bReport = false;
    var reportName=aaReportName;
    report = aa.reportManager.getReportModelByName(reportName);
    report = report.getOutput();
    var permit = aa.reportManager.hasPermission(reportName,currentUserID);
    if (permit.getOutput().booleanValue()) {
        var parameters = aa.util.newHashMap();
        parameters.put("BatchNumber", setCode);
        //report.setReportParameters(parameters);
        var msg = aa.reportManager.runReport(parameters,report);
        aa.env.setValue("ScriptReturnCode", "0");
        aa.env.setValue("ScriptReturnMessage", msg.getOutput());
    }
}