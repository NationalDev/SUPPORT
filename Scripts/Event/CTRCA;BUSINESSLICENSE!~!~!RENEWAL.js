/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record.
 * 
 * Event Name:- Convert To Real CAP After
 * Event Description:- The after event for converting a partial record ID to a real record ID.
 * MasterScript:- ConvertToRealCAPAfterV3.0.js
 * Record Type:- CTRCA;BUSINESSLICENSE!~!~!RENEWAL.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

aa.runScriptInNewTransaction("ConvertToRealCapAfter4Renew");
//lines added by CIH 03012016
newLicId = getParentCapID4Renewal();
var appName = getAppName(newLicId); //lines added by CIH 03012016
if (newLicId) {
	editAppName(appName,capId); //copy appName from License record to renewal record
}
//branch("EMSE:SetContactRelationshipToContactType"); //ToDo: test each successive line of code individually
//aa.cap.updateAccessByACA(capId,"Y");