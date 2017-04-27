/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record.
 * 
 * Event Name:- Convert To Real CAP After
 * Event Description:- The after event for converting a partial record ID to a real record ID.
 * MasterScript:- ConvertToRealCAPAfterV3.0.js
 * Record Type:- CTRCA;CODEENFORCEMENT!INSPECTIONS!PROPERTY!PRESALE.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * 09/09/2016 Abhishek Jain, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if(AInfo["Number of Family Units"] == "1") {
	updateFee("PRE0001", "ENFPRE_F", "FINAL", 1, "N");
} else if(AInfo["Number of Family Units"] == "2") {
	updateFee("PRE0002", "ENFPRE_F", "FINAL", 1, "N");
}