/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record.
 * 
 * Event Name:- Convert To Real CAP After
 * Event Description:- The after event for converting a partial record ID to a real record ID.
 * MasterScript:- ConvertToRealCAPAfterV3.0.js
 * Record Type:- CTRCA;PERMITS!GENERATOR!NA!NA.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * 08/04/2016 Abhishek Jain, FutureNet Group, Inc.
 * 
 * Updated BY:- 08/06/2016 Greg Soter,FutureNet Group, Inc.
 * Now declaring one array instead of declaring 2 sets of 64 integers.
 * Import fee schedule into array of fee objects of type RFeeItemScriptModel.
 * Added loop to find "Generator_Items" match with "Fee Description".
 * Added updateFee() loop inside of the Custom List Check. No need to update anything 
 * but Base Fee if there is no CL
 * Added copyGisObjects(). Should be in every ASA in Permits. 
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