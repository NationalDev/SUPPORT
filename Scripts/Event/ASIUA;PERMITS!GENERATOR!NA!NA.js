/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: ApplicationSpecificInfoUpdateAfter
 * Event Description: Citizen Access - The after event for converting a partial record ID to a real record ID.
 * Master Script: ApplicationSpecificInfoUpdateAfter
 *
 * Record Type: Permits/Generator/NA/NA (Generator Permit)
 * 08/04/2016 Abhishek Jain, FutureNet Group, Inc.  
 *
 * --UPDATE-- 08/06/2016 Greg Soter, FutureNet Group, Inc.
 * Now declaring one array instead of declaring two sets of 64 integers.
 * Import fee schedule into an array of fee objects of type RFeeItemScriptModel
 * Added loop to find "Generator_Items" match with "Fee Description"
 */

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTGTP_F";
var cList = FAPFIX;
var sharedDropDown = "GTP_Fixtures";   //Name of Shared Drop Down as it appears in Standard Choices
//---END PARAMETERS-------------------------------------------------------------------------------//


var feeScheduleItemArr = aa.finance.getFeeItemList(null,feeSched,null).getOutput();
var subTotalItemArr = new Array(feeScheduleItemArr.length);



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

