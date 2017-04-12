/**
 * To calculate and assess fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Subbmittal
 * Master Script:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;BUSINESSLICENSE!LODGING!HOTEL!RENEWAL.js
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if (getAppSpecific("Number of Rooms") == "1 - 50 Rooms") { 
	updateFee("HOTEL","BUSLICLODG_F","FINAL",1,"Y");
}

if (getAppSpecific("Number of Rooms") == "51 - 100 Rooms") {
	updateFee("HOTEL51-100","BUSLICLODG_F","FINAL",1,"Y");
}

if (getAppSpecific("Number of Rooms") == "101 - 200 Rooms") {
	updateFee("HOTEL101-200","BUSLICLODG_F","FINAL",1,"Y");
}

if (getAppSpecific("Number of Rooms") == "201 - 300 Rooms") {
	updateFee("HOTEL201-300","BUSLICLODG_F","FINAL",1,"Y");
}

if (getAppSpecific("Number of Rooms") == "301 - 500 Rooms") {
	updateFee("HOTEL301-500","BUSLICLODG_F","FINAL",1,"Y");
}

if (getAppSpecific("Number of Rooms") == "501 and Up") { 
	updateFee("HOTEL501UP","BUSLICLODG_F","FINAL",1,"Y");
}