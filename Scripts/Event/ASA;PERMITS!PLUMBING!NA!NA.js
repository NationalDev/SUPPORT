/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: ApplicationSubmitAfter
 * Event Description: The after event for submitting an application (SPEAR form and ACA Pageflow)
 * Master Script: ApplicationSubmitAfterV3.0
 *
 * Record Type: Permits/Plumbing/NA/NA (Plumbing Permit)
 * 07/29/2016 Abhishek Jain, FutureNet Group, Inc.  
 *
 * --UPDATE-- 07/31/2016 Greg Soter, FutureNet Group, Inc.
 * Now declaring one array instead of declaring two sets of 64 integers.
 * Import fee schedule into an array of fee objects of type RFeeItemScriptModel
 * Added loop to find "Fixture Type" match with "Fee Description"
 * Added updateFee() loop inside of the Custom List check. No need to update anything but Base Fee if there is no CL
 * Added copyGisObjects(). Should be in every ASA in PERMITS
 */

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTPLM_F";//Fee Schedule Identifier
var baseFee = "FIX0000";//If there is an application fee that is applied once to every Permit submitted.
var cList = PLMFIXTURETYPE;//Custom List Object
//---END PARAMETERS-------------------------------------------------------------------------------//
copyParcelGisObjects();

var feeScheduleItemArr = aa.finance.getFeeItemList(null,feeSched,null).getOutput();
var subTotalItemArr = new Array(feeScheduleItemArr.length);

updateFee(baseFee,feeSched,"FINAL",1,"N");

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

