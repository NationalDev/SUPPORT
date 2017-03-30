//ASA:BUSINESSLICENSE/LODGING/HOTEL/APPLICATION
//Assess fee at ASA iff application was NOT created by ACA
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
