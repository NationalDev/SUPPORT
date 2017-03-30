/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: ConverttoRealCapAfter
 * Event Description: Citizen Access - The after event for converting a partial record ID to a real record ID.
 * Master Script: ConverttoRealCapAfter
 *
 * Record Type: CodeEnforcement/Inspections/Residential/NA (Residential Inspection)
 * 09/29/2016 Abhishek Jain, FutureNet Group, Inc.  
 */ 

// Custom Field Group - ENFPMB_CF	 
// Custom Field Sub Group -  PMB_GENERAL	
// Custom Field Name -  Type of Use , Stories	 
// Fee Code - ENFPMB_F

if (currentUserID == "ADMIN") 
{
    showMessage=true;
    showDebug=true;
}

var RSquareFeet = parseInt (AInfo["Residential Square Ft"]);
var Stories = parseInt (AInfo["Residential Stories"]);
var SleepingUnits = parseInt (AInfo["No. of Sleeping Units"]);
var TotalUnits = parseInt (AInfo["Total Units"]);
var UnitsRented = parseInt (AInfo["Units Rented"]);

var ReminderFeet = 0;
var Factor = 0;
var Fees = 0;    
     
if ( AInfo["Type of Use"] == "Condominium" || AInfo["Type of Use"] == "Cooperative")
{
    if ( Stories <= 2)
        Fees = 185;
    else
        Fees = ((Stories - 2) * 40 ) + 185;
}
else if ( AInfo["Type of Use"] == "Room and Board")
{
    if ( TotalUnits == 1)
        Fees = 150;
    else
        Fees = ((TotalUnits - 1) * 80 ) + 150;
}
else if ( AInfo["Type of Use"] == "Single Family Dwelling")
{
    if ( AInfo["Owner Occupied"] == "No" || AInfo["Owner Occupied"] == "no")
        Fees = 150;	
    else
        Fees = 0;
}
else if ( AInfo["Type of Use"] == "Two Family Dwelling")
{
    if ( AInfo["Owner Occupied"] == "No" || AInfo["Owner Occupied"] == "no")
        Fees = 230;	
    else
        Fees = 150;
}
else {
    ReminderFeet = 0;
    Factor = 0;
    if ( RSquareFeet <= 5000)
    {
        Fees = 310;
    }
    else
    {
        ReminderFeet = RSquareFeet - 5000;
        Factor = Math.ceil(ReminderFeet / 5000);
        Fees = 310 + ( Factor * 80);
    }
    
}


var feeScheduleItemArr = aa.finance.getFeeItemList(null,"ENFPMB_F",null).getOutput();

for (f=0;f<feeScheduleItemArr.length;f++) {
    
    if (AInfo["Type of Use"] == feeScheduleItemArr[f].getFeeDes().toString()) {
        updateFee(feeScheduleItemArr[f].getFeeCod().toString(),"ENFPMB_F","FINAL",Fees,"N");
    }
}



/*
if ( AInfo["Type of Use"] == "Adult Foster Care")
    updateFee("PMB001", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Apartment")
    updateFee("PMB002", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Community Center") 
    updateFee("PMB003", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Condominium") 
    updateFee("PMB004", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Cooperative") 
    updateFee("PMB005", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Halfway House") 
    updateFee("PMB006", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Hotel") 
    updateFee("PMB007", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Loft") 
    updateFee("PMB008", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Motel") 
    updateFee("PMB009", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Room and Board") 
    updateFee("PMB010", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Rooming House") 
    updateFee("PMB011", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Shelters") 
    updateFee("PMB012", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Single Family Dwelling") 
    updateFee("PMB013", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Terrace") 
    updateFee("PMB014", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Townhouse") 
    updateFee("PMB015", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Two Family Dwelling") 
    updateFee("PMB016", "ENFPMB_F", "FINAL", Fees, "N");
else if ( AInfo["Type of Use"] == "Vacant Lot") 
    updateFee("PMB017", "ENFPMB_F", "FINAL", Fees, "N");
*/
		

		
		