/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;PUBLICWORKS!*!*!APPLICATION.js
 *
 * Greg Soter, Futurenet Group, Inc.
 *    
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
if (wfStatus == "Request for Corrections") {
        sendExternalReviewNotification();    
}
if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = appTypeArray[2];
    monthsToInitialExpire = 12;
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "Permit",null);
    // create the permit record;
    if (newLicId) {
        newLicIdString = newLicId.getCustomID();
        updateAppStatus("Issued","Originally Issued",newLicId);
        copyAppSpecific(newLicId);
        //copyAddresses(capId,newLicId);
        copyASITables(capId,newLicId);
        //copyContacts(capId,newLicId);
        editAppName(capName,newLicId);
        var feeArr = loadFees();
        for (feeItem in feeArr) {
        	myCapId
            capId = newLicId;
            var thisFee = aa.F4FeeItem.getF4FeeItem();
            thisFee.setAccCodeL1(feeArr[feeItem].accCodeL1);
            thisFee.setAccCodeL2(feeArr[feeItem].accCodeL2);
            thisFee.setAccCodeL3(feeArr[feeItem].accCodeL3);
            thisFee.setApplyDate(feeArr[feeItem].applyDate);
            thisFee.setAuditDate(feeArr[feeItem].auditDate);
            thisFee.setAuditID(feeArr[feeItem].auditID);
            thisFee.setAuditStatus(feeArr[feeItem].auditStatus);
            thisFee.setCalcFlag(feeArr[feeItem].calcFlag);
            thisFee.setCapID(feeArr[feeItem].newLicId);
            thisFee.setDisplay(feeArr[feeItem].display);
            thisFee.setEffectDate(feeArr[feeItem].effectDate);
            thisFee.setExpireDate(feeArr[feeItem].expireDate);
            thisFee.setFee(feeArr[feeItem].amount);
            thisFee.setFeeCalcProc(feeArr[feeItem].calcProc);
            thisFee.setFeeCod(feeArr[feeItem].code);
            thisFee.setFeeDescription(feeArr[feeItem].description);
            thisFee.setFeeitemStatus(feeArr[feeItem].status);
            thisFee.setFeeSchudle(feeArr[feeItem].sched);
            thisFee.setFeeSeqNbr(feeArr[feeItem].sequence);
            thisFee.setFeeUnit(feeArr[feeItem].unit);
            thisFee.setFormula(feeArr[feeItem].formula);
            thisFee.setPaymentPeriod(feeArr[feeItem].period);
            thisFee.setSubGroup(feeArr[feeItem].subGroup);
            thisFee.setUdes(feeArr[feeItem].udes);
            thisFee.setUdf1(feeArr[feeItem].UDF1);
            thisFee.setUdf2(feeArr[feeItem].UDF2);
            thisFee.setUdf3(feeArr[feeItem].UDF3);
            thisFee.setUdf4(feeArr[feeItem].UDF4);            
        }
    }
    tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
    if (newLicId) {
        thisLic = new licenseObject(newLicIdString,newLicId);
        thisLic.setExpiration(dateAdd(tmpNewDate,0));
        //setExpResult = setLicExpirationDate(thisLic);
        //logDebug("setExpResult = " + setExpResult);
        thisLic.setStatus("Active");
    }
}