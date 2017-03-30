//PRA;BUSINESSLICENSE!~!~!RENEWAL
//PRA:BUSINESSLICENSE/*/*/RENEWAL (Script Code Name)
//PRA:BusinessLicense/*/*/Renewal (Standard Choice Name)
//Updates license record when business license renewal fee is paid
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
