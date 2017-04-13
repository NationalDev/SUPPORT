/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Specific Info Update After
 * Event Description:- The after event for when a user updates application specific information
 * MasterScript:- ApplicationSpecificInfoUpdateAfterV3.0.js
 * Record Type:- ASIUA;CODEENFORCEMENT!INSPECTIONS!PROPERTY!PRESALE.js
 *
 * 09/09/2016 Abhishek Jain, FutureNet Group, Inc.
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if(AInfo["Number of Family Units"] == "1") {
	updateFee("PRE0001", "ENFPRE_F", "FINAL", 1, "N");
} else if (AInfo["Number of Family Units"] == "2") {
	updateFee("PRE0002", "ENFPRE_F", "FINAL", 1, "N");
}