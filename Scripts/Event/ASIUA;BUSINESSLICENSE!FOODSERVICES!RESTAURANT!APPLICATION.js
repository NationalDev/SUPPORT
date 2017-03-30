//ASIUA:BUSINESSLICENSE/FOODSERVICES/RESTAURANT/APPLICATION
//ASIUA;BUSINESSLICENSE!FOODSERVICES!RESTAURANT!APPLICATION
//BusinessLicense/FoodServices/Restaurant/Application
// TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
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