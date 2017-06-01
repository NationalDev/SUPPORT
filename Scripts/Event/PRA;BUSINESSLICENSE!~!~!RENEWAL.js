/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Payment Receive After
 * Event Description:- The after event for when Citizen Access records payment allocation.
 * MasterScript:- PaymentReceiveAfterV3.0.js
 * Record Type:- PRA;BUSINESSLICENSE!~!~!RENEWAL.js
 *  
 * Updates license record when business license renewal fee is paid. 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

aa.runScriptInNewTransaction("PaymentReceiveAfter4Renew");
//If all BusinessLicense renewals use the same workflow "BUSLICBAMR_W"" then this is OK as is 2/22/2016 cih
if (balanceDue == 0) {
	closeTask("Renewal Intake","Accepted","Updated via Script","Updated via Script");
	closeTask("Pay Fees","Fees Paid","Updated via Script","Updated via Script");
	activateTask("Renewal Review");
}
//branch("EMSE:LicProfLookup")
//editAppName({Doing Business As (DBA) Name});
//no need to update appName on License record, it has already been updated from the application record.