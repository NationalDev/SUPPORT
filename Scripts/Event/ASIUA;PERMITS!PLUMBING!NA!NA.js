/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: ApplicationSpecificInfoUpdateAfter
 * Event Description: The after event for submitting an application (SPEAR form and ACA Pageflow)
 * Master Script: ApplicationSubmitAfterV3.0
 *
 * Record Type: Permits/Plumbing/NA/NA (Plumbing Permit)
 * 07/29/2016 Abhishek Jain, FutureNet Group, Inc.
 *
 * --UPDATE-- 08/02/2016 Greg Soter, FutureNet Group, Inc.
 * Now declaring one array instead of declaring two sets of 64 integers.
 * Import fee schedule into an array of fee objects of type RFeeItemScriptModel
 * Added loop to find "Fixture Type" match with "Fee Description"
 * Added updateFee() loop inside of the Custom List check. No need to update anything but Base Fee if there is no CL
 *
 */

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTPLM_F";             //Name of Fee Schedule associated with record's Fixture Types
var cList = PLMFIXTURETYPE;            //Name of Custom List with Fixture Type and Quantity fields
//---END PARAMETERS-------------------------------------------------------------------------------//

var feeScheduleItemArr = aa.finance.getFeeItemList(null,feeSched,null).getOutput();
var subTotalItemArr = new Array(feeScheduleItemArr.length);


if (typeof(cList) == "object") {
    
    for (row in cList) {
        var fixTypeFee = cList[row]["Fixture Type"].toString(); 
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
