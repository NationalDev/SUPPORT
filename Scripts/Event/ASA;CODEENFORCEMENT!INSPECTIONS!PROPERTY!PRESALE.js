/**
 * To calculate and assess permit fee based on the drop down values.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * MasterScript:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;CODEENFORCEMENT!INSPECTIONS!PROPERTY!PRESALE.js
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