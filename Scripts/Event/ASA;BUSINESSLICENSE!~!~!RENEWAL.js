/**
 * To run ASA4Renew script when the renew button is selected in AA or when the
 * Renewal link is selected in ACA
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * Master Script:- ApplicationSubmitAfterV3.0.js
 * 
 * Record Type:- ASA;BUSINESSLICENSE!~!~!RENEWAL.js
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//showDebug = true; showMessage = true;
//logDebug("next line runs ASA4Renew script in new transaction");
aa.runScript("APPLICATIONSUBMITAFTER4RENEW");
//lines added by CIH 03012016
newLicId = getParentCapID4Renewal();
var appName = getAppName(newLicId); //lines added by CIH 03012016
if (newLicId) {
	editAppName(appName,capId); //copy appName from License record to renewal record
}
//logDebug("ASA4Renew script ran successfully");
//	aa.cap.updateAccessByACA(capId,"Y");
//logDebug("updateAccessByACA ran successfully");

