/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Specific Info Update After
 * Event Description:- The after event for when a user updates application specific information
 * MasterScript:- ApplicationSpecificInfoUpdateAfterV3.0.js
 * Record Type:- ASIUA;PERMITS!BOILERPV!NA!NA.js
 * 
 * 09/13/2016 Abhishek Jain, FutureNet Group, Inc.
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTBPV_F";
var cList = BPV;
//var sharedDropDown = "BOI_EQP_TYPE";   //Name of Shared Drop Down as it appears in Standard Choices
//---END PARAMETERS-------------------------------------------------------------------------------//

copyParcelGisObjects();
var feeScheduleItemArr = aa.finance.getFeeItemList(null,feeSched,null).getOutput();
var subTotalItemArr = new Array(feeScheduleItemArr.length);
if (typeof(cList) == "object") {
    for (row in cList) {
        var fixTypeFee = cList[row]["Boiler/Pressure Vessel"].toString();
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