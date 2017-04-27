/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record.
 * 
 * Event Name:- Convert To Real CAP After
 * Event Description:- The after event for converting a partial record ID to a real record ID.
 * MasterScript:- ConvertToRealCAPAfterV3.0.js
 * Record Type:- CTRCA;CODEENFORNCEMENT!INSPECTIONS!RESIDENTIAL!NA.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * 09/29/2016Abhishek Jain, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if (currentUserID == "ADMIN") {
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
     
if (AInfo["Type of Use"] == "Condominium" || AInfo["Type of Use"] == "Cooperative") {
	if (Stories <= 2)
		Fees = 185;
    else
        Fees = ((Stories - 2) * 40 ) + 185;
} else if (AInfo["Type of Use"] == "Room and Board") {
    if ( TotalUnits == 1)
        Fees = 150;
    else
        Fees = ((TotalUnits - 1) * 80 ) + 150;
} else if (AInfo["Type of Use"] == "Single Family Dwelling") {
    if (AInfo["Owner Occupied"] == "No" || AInfo["Owner Occupied"] == "no")
        Fees = 150;	
    else
        Fees = 0;
} else if (AInfo["Type of Use"] == "Two Family Dwelling") {
    if (AInfo["Owner Occupied"] == "No" || AInfo["Owner Occupied"] == "no")
        Fees = 230;	
    else
        Fees = 150;
} else {
    ReminderFeet = 0;
    Factor = 0;
    if (RSquareFeet <= 5000) {
        Fees = 310;
    } else {
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