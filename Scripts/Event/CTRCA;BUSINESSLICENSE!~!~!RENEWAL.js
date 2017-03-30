//CTRCA;BUSINESSLICENSE!~!~!RENEWAL
//CTRCA:BUSINESSLICENSE/*/*/RENEWAL (Script Name)
//CTRCA:BusinessLicense/*/*/Renewal (SC Name)
//Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record. 
aa.runScriptInNewTransaction("ConvertToRealCapAfter4Renew");
//lines added by CIH 03012016
newLicId = getParentCapID4Renewal();
var appName = getAppName(newLicId); //lines added by CIH 03012016
	if (newLicId) {
		editAppName(appName,capId); //copy appName from License record to renewal record
		}
//branch("EMSE:SetContactRelationshipToContactType"); //ToDo: test each successive line of code individually
//aa.cap.updateAccessByACA(capId,"Y");