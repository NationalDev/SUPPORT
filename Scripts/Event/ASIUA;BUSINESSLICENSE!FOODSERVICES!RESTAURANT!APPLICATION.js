/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Specific Info Update After
 * Event Description:- The after event for when a user updates application specific information
 * MasterScript:- ApplicationSpecificInfoUpdateAfterV3.0.js
 * Record Type:- ASIUA;BUSINESSLICENSE!FOODSERVICES!RESTAURANT!APPLICATION.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if (getAppSpecific("Number of Seats") == "1-30 Seats") { 
   updateFee("BARC1-30","BUSLICFOOD_F","FINAL",1,"N"); //fee amount is same across restaurant record types
}
if (getAppSpecific("Number of Seats") == "31-50 Seats") {
   updateFee("BARC31-50","BUSLICFOOD_F","FINAL",1,"N");//fee amount is same across restaurant record types
}
if (getAppSpecific("Number of Seats") == "51-100 Seats") {
   updateFee("BARC51-100","BUSLICFOOD_F","FINAL",1,"N");//fee amount is same across restaurant record types
}
if (getAppSpecific("Number of Seats") == "101-150 Seats") {
   updateFee("BARC101-150","BUSLICFOOD_F","FINAL",1,"N");//fee amount is same across restaurant record types
}
if (getAppSpecific("Number of Seats") == "151 Seats and Up") {
   updateFee("BARC151","BUSLICFOOD_F","FINAL",1,"N");//fee amount is same across restaurant record types
}