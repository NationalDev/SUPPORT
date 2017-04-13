/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * MasterScript:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;PERMITS!GENERATOR!NA!NA.js
 * 
 * 08/04/2016 Abhishek Jain, FutureNet Group, Inc.
 * 
 * Updated By:- 07/31/2016 Greg Soter, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTGTP_F";
//var baseFee = "FIX0000"; //If application fee gets added to the fee schedule, uncomment this and line 29
var cList = FAPFIX;
var sharedDropDown = "GTP_Fixtures";   //Name of Shared Drop Down as it appears in Standard Choices
//---END PARAMETERS-------------------------------------------------------------------------------//

copyParcelGisObjects();
var feeScheduleItemArr = aa.finance.getFeeItemList(null,feeSched,null).getOutput();
var subTotalItemArr = new Array(feeScheduleItemArr.length);
//updateFee(baseFee,feeSched,"FINAL",1,"N");
if (typeof(cList) == "object") {
    for (row in cList) {
        var fixTypeFee = lookup(sharedDropDown,cList[row]["Generator_Items"].toString());
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