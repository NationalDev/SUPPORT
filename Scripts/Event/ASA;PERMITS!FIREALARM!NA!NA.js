/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: ConvertToRealCAPAfter
 * Event Description: Citizen Access - The after event for converting a partial record ID to a real record ID.
 * Master Script: ConvertToRealCapAfter
 *
 *
 * --UPDATE-- 08/05/2016 Charles D. Redmond, FutureNet Group, Inc.
 * Now declaring one array instead of declaring two sets of 64 integers.
 * Import fee schedule into an array of fee objects of type RFeeItemScriptModel
 * Added loop to find "Fixture Type" match with "Fee Description"
 * Added updateFee() loop inside of the Custom List check. No need to update anything but Base Fee if there is no CL
 * Added copyGisObjects(). Should be in every ASA in PERMITS
 *
 */ 

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTFAP_F";
var baseFee = "FAP0001";
var cList = FAPFIX;
//var sharedDropDown = "FAP_FIX_TYPE";   //Name of Shared Drop Down as it appears in Standard Choices
//---END PARAMETERS-------------------------------------------------------------------------------//

copyParcelGisObjects();

var feeScheduleItemArr = aa.finance.getFeeItemList(null,feeSched,null).getOutput();
var subTotalItemArr = new Array(feeScheduleItemArr.length);

updateFee(baseFee,feeSched,"FINAL",1,"N");

if (typeof(cList) == "object") {
    
    for (row in cList) {
        var fixTypeFee = cList[row]["Fire_Alarm_Items"].toString();
        for (i=0;i<feeScheduleItemArr.length;i++) {
            
            if (row == 0) {
                subTotalItemArr[i]=0;
            }
            
            if (fixTypeFee == feeScheduleItemArr[i].getFeeDes().toString()) {
                
                subTotalItemArr[i] += parseInt(cList[row]["Quantity"]);
            }
        }
    }
    for (f=0;f<feeScheduleItemArr.length;f++) {
        
        if (subTotalItemArr[f] > 0) {
            
            updateFee(feeScheduleItemArr[f].getFeeCod().toString(),feeSched,"FINAL",parseInt(subTotalItemArr[f]),"N");
        }
    }
}



/*

Item1 = 0 ;
Item2 = 0 ;
Item3 = 0 ;
Item4 = 0 ;
Item5 = 0 ;
Item6 = 0 ;
Item7 = 0 ;
Item8 = 0 ;
Item9 = 0 ;
Item10 = 0 ;
Item11 = 0 ;
Item12 = 0 ;
Item13 = 0 ;
Item14 = 0 ;
Item15 = 0 ;
Item16 = 0 ;
Item17 = 0 ;
Item18 = 0 ;
Item19 = 0 ;
Item20 = 0 ;
Item21 = 0 ;
Item22 = 0 ;
Item23 = 0 ;
Item24 = 0 ;
Item25 = 0 ;

subTotalItem1 = 0 ;
subTotalItem2 = 0 ;
subTotalItem3 = 0 ;
subTotalItem4 = 0 ;
subTotalItem5 = 0 ;
subTotalItem6 = 0 ;
subTotalItem7 = 0 ;
subTotalItem8 = 0 ;
subTotalItem9 = 0 ;
subTotalItem10 = 0 ;
subTotalItem11 = 0 ;
subTotalItem12 = 0 ;
subTotalItem13 = 0 ;
subTotalItem14 = 0 ;
subTotalItem15 = 0 ;
subTotalItem16 = 0 ;
subTotalItem17 = 0 ;
subTotalItem18 = 0 ;
subTotalItem19 = 0 ;
subTotalItem20 = 0 ;
subTotalItem21 = 0 ;
subTotalItem22 = 0 ;
subTotalItem23 = 0 ;
subTotalItem24 = 0 ;
subTotalItem25 = 0 ;


if(typeof(FAPFIX) == "object") {
	for(row in FAPFIX) {
    if (FAPFIX[row]["Fire_Alarm_Items"] == "A - Drill Station") {
    		Item2 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem2 += Item2;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "B - Pull Station") {

			Item3 = parseInt(FAPFIX[row]["Quantity"]);	
			if ( parseInt(FAPFIX[row]["Quantity"]) == 1 ){
				subTotalItem3 += 31;
				}
				else {
				subTotalItem3 += 31 + ( Item3 - 1) * 10;
				}
			
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "C - Telephone Stations") {
    		Item4 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem4 += Item4;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "D - Combination Pull & Telephone") {
			Item5 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem5 += Item5;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "E - Fire Alarm Signal Devices") {

			Item6 = parseInt(FAPFIX[row]["Quantity"]);	
			if ( parseInt(FAPFIX[row]["Quantity"]) == 1 ){
				subTotalItem6 += 31;
				}
				else {
				subTotalItem6 += 31 + ( Item6 - 1) * 10;
				}

	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "F - Heat or Smoke Detectors") {
			
			Item7 = parseInt(FAPFIX[row]["Quantity"]);	
			if ( parseInt(FAPFIX[row]["Quantity"]) == 1 ){
				subTotalItem7 += 31;
				}
				else {
				subTotalItem7 += 31 + ( Item7 - 1) * 10;
				}
				
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "G - Fire Door Holders") {
    		Item8 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem8 += Item8;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "H - Combo Door Hldrs & Smoke Det") {
    		Item9 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem9 += Item9;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "I - Building Master Panels") {
    		Item10 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem10 += Item10;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "J - Bldg Master Panel - Circt/Zone") {
   		 Item11 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem11 += Item11;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "K - Tele Control Panel -Circt/Zone") {
    		Item12 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem12 += Item12;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "L - Exitway Door Unlocking Systems") {
	
			Item13 = parseInt(FAPFIX[row]["Quantity"]);	
			if ( parseInt(FAPFIX[row]["Quantity"]) == 1 ){
				subTotalItem13 += 31;
				}
				else {
				subTotalItem13 += 31 + ( Item13 - 1) * 17;
				}
		
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "M - Sprinkler System Flow Switch") {
    		Item14 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem14 += Item14;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "N - Sprinkler Valve Tamper Switch") {
    		Item15 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem15 += Item15;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "O - Sprinkler System Dry") {
    		Item16 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem16 += Item16;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "P - Sub Panel Annuciator") {
    		Item17 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem17 += Item17;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "Q - Ventilation Fan Damper") {
    		Item18 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem18 += Item18;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "R - Data Gather & Report Panel") {
    		Item19 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem19 += Item19;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "S - Central Computer") {
    		Item20 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem20 += Item20;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "T - Interfacing of Fire Alarm Sys") {
    		Item21 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem21 += Item21;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "U - Exhaust Hood Fire Control Sys") {
    		Item22 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem22 += Item22;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "V - Fans Controlled by Fire Sys") {
    		Item23 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem23 += Item23;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "W - Fire Control Sys(Foam,CO2,etc)") {
    		Item24 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem24 += Item24;
	} else if (FAPFIX[row]["Fire_Alarm_Items"] == "X - Valves (gas,water,fluid)") {
    		Item25 = parseInt(FAPFIX[row]["Quantity"]);
    		subTotalItem25 += Item25;
	}
    }
}



updateFee("FAP0002","PMTFAP_F","FINAL",subTotalItem2,"N");
updateFee("FAP0003","PMTFAP_F","FINAL",subTotalItem3,"N");//Fee Calculation based upon quantity. Fee Item FAP0003 is constant = 1.
updateFee("FAP0004","PMTFAP_F","FINAL",subTotalItem4,"N");
updateFee("FAP0005","PMTFAP_F","FINAL",subTotalItem5,"N");
updateFee("FAP0006","PMTFAP_F","FINAL",subTotalItem6,"N");//Fee Calculation based upon quantity. Fee Item FAP0006 is constant = 1.
updateFee("FAP0007","PMTFAP_F","FINAL",subTotalItem7,"N");//Fee Calculation based upon quantity. Fee Item FAP0007 is constant = 1.
updateFee("FAP0008","PMTFAP_F","FINAL",subTotalItem8,"N");
updateFee("FAP0009","PMTFAP_F","FINAL",subTotalItem9,"N");
updateFee("FAP0010","PMTFAP_F","FINAL",subTotalItem10,"N");
updateFee("FAP0011","PMTFAP_F","FINAL",subTotalItem11,"N");
updateFee("FAP0012","PMTFAP_F","FINAL",subTotalItem12,"N");
updateFee("FAP0013","PMTFAP_F","FINAL",subTotalItem13,"N");//Fee Calculation based upon quantity. Fee Item FAP0013 is constant = 1.
updateFee("FAP0014","PMTFAP_F","FINAL",subTotalItem14,"N");
updateFee("FAP0015","PMTFAP_F","FINAL",subTotalItem15,"N");
updateFee("FAP0016","PMTFAP_F","FINAL",subTotalItem16,"N");
updateFee("FAP0017","PMTFAP_F","FINAL",subTotalItem17,"N");
updateFee("FAP0018","PMTFAP_F","FINAL",subTotalItem18,"N");
updateFee("FAP0019","PMTFAP_F","FINAL",subTotalItem19,"N");
updateFee("FAP0020","PMTFAP_F","FINAL",subTotalItem20,"N");
updateFee("FAP0021","PMTFAP_F","FINAL",subTotalItem21,"N");
updateFee("FAP0022","PMTFAP_F","FINAL",subTotalItem22,"N");
updateFee("FAP0023","PMTFAP_F","FINAL",subTotalItem23,"N");
updateFee("FAP0024","PMTFAP_F","FINAL",subTotalItem24,"N");
updateFee("FAP0025","PMTFAP_F","FINAL",subTotalItem25,"N");


baseAmt = 325;
totalAmt = feeAmountExcept(capId);
baseNeeded = baseAmt - totalAmt;
logDebug("Total Amount is: $" + totalAmt);

if(baseNeeded > 0) {
     updateFee("FAP0001","PMTFAP_F","FINAL",baseNeeded,"N");//Fire Alarm System Permit Application Fee
}

*/
