/**
 * To calculate and assess fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Subbmittal
 * Master Script:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;BUSINESSLICENSE!LODGING!HOTEL!APPLICATION.js
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if ((getAppSpecific("Number of Rooms") == "1 - 50 Rooms") && !cap.isCreatedByACA()) { 
	updateFee("HOTEL","BUSLICLODG_F","FINAL",1,"N");
}

if ((getAppSpecific("Number of Rooms") == "51 - 100 Rooms") && !cap.isCreatedByACA()) {
	updateFee("HOTEL51-100","BUSLICLODG_F","FINAL",1,"N");
}

if ((getAppSpecific("Number of Rooms") == "101 - 200 Rooms") && !cap.isCreatedByACA()) {
	updateFee("HOTEL101-200","BUSLICLODG_F","FINAL",1,"N");
}

if ((getAppSpecific("Number of Rooms") == "201 - 300 Rooms") && !cap.isCreatedByACA()) {
	updateFee("HOTEL201-300","BUSLICLODG_F","FINAL",1,"N");
}

if ((getAppSpecific("Number of Rooms") == "301 - 500 Rooms") && !cap.isCreatedByACA()) {
	updateFee("HOTEL301-500","BUSLICLODG_F","FINAL",1,"N");
}

if ((getAppSpecific("Number of Rooms") == "501 and Up") && !cap.isCreatedByACA()) { 
	updateFee("HOTEL501UP","BUSLICLODG_F","FINAL",1,"N");
}