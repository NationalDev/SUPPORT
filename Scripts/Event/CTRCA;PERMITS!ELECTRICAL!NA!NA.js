/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record.
 * 
 * Event Name:- Convert To Real CAP After
 * Event Description:- The after event for converting a partial record ID to a real record ID.
 * MasterScript:- ConvertToRealCAPAfterV3.0.js
 * Record Type:- CTRCA;PERMITS!ELECTRICAL!NA!NA.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * 07/29/2016 Abhishek Jain, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTELE_F";
var baseFee = "ELE0000";
var cList = ELEFIX;
//var sharedDropDown = "ELE_FIX_TYPE";   //Name of Shared Drop Down as it appears in Standard Choices
//---END PARAMETERS-------------------------------------------------------------------------------//

copyParcelGisObjects();
var feeScheduleItemArr = aa.finance.getFeeItemList(null,feeSched,null).getOutput();
var subTotalItemArr = new Array(feeScheduleItemArr.length);
updateFee(baseFee,feeSched,"FINAL",1,"N");
if (typeof(cList) == "object") {
    for (row in cList) {
        var fixTypeFee = cList[row]["Electrical Equipment"].toString();
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