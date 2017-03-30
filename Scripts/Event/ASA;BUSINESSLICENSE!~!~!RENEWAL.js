// ASA;BUSINESSLICENSE!~!~!RENEWAL.js
// ASA:BUSINESSLICENSE/*/*/RENEWAL
// run ASA4Renew script when the Renew button is selected in AA 
// or when the Renewal link is selected in ACA
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

