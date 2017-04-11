/**
 * This function is designed to run ApplicationSubmitAfter (ASA) standard choices for the capId provided.
 * @param vCapId
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function runASAForCapID(vCapId) {
    
    //Set Variables
    //Save the existing system variables so that they can be reset after the function
    var pcapId = capId;
    var pcap = cap;
    var pcapIDString = capIDString;
    var pappTypeResult = appTypeResult;
    var pappTypeString = appTypeString;
    var pappTypeArray = appTypeArray;
    var pcapName = capName;
    var pcapStatus = capStatus;
    var pfileDateObj = fileDateObj;
    var pfileDate = fileDate;
    var pfileDateYYYYMMDD = fileDateYYYYMMDD;
    var pparcelArea = parcelArea;
    var pestValue = estValue;
    var pbalanceDue = balanceDue;
    var phouseCount = houseCount;
    var pfeesInvoicedTotal = feesInvoicedTotal;
    var pcapDetail = capDetail;
    var pAInfo = AInfo;
    var ppartialCap;
    if (typeof (partialCap) !== "undefined") {
        ppartialCap = partialCap;
    } else { 
    	ppartialCap = null; 
    }
    
    var pparentCapId;
    if (typeof (parentCapId) !== "undefined") {
        pparentCapId = parentCapId;
    } else { 
    	pparentCapId = null; 
    }
    
    var pCreatedByACA;
    if (typeof (CreatedByACA) !== "undefined") {
        pCreatedByACA = CreatedByACA;
    } else { 
    	CreatedByACA = 'N'; 
    }

    //Run simulate the ASIUA event for the child record
    logDebug("***Begin ASA Sim" + "*** vCapId (passed to capId) " + vCapId);

    //Clear global variables so that they can be set with the child's
    capId = null;
    cap = null;
    capIDString = "";
    appTypeResult = null;
    appTypeString = "";
    appTypeArray = new Array();
    capName = null;
    capStatus = null;
    fileDateObj = null;
    fileDate = null;
    fileDateYYYYMMDD = null;
    parcelArea = 0;
    estValue = 0;
    balanceDue = 0;
    houseCount = 0;
    feesInvoicedTotal = 0;
    capDetail = "";
    AInfo = new Array();
    partialCap = false;
    parentCapId = null;
    CreatedByACA = 'N';

    //Set capId to the vCapId variable provided
    capId = vCapId;
    logDebug("runASAForCapID capId " + capId);
    //Update global variables based on child capId
    if (capId !== null) {
        parentCapId = pcapId;
        servProvCode = capId.getServiceProviderCode();
        capIDString = capId.getCustomID();
        cap = aa.cap.getCap(capId).getOutput();
        appTypeResult = cap.getCapType();
        appTypeString = appTypeResult.toString();
        appTypeArray = appTypeString.split("/");
        if (appTypeArray[0].substr(0, 1) != "_") {
            var currentUserGroupObj = aa.userright.getUserRight(appTypeArray[0], currentUserID).getOutput();
            if (currentUserGroupObj) currentUserGroup = currentUserGroupObj.getGroupName();
        }
        capName = cap.getSpecialText();
        capStatus = cap.getCapStatus();
        logDebug("capIDString " + capIDString + "; new capName " + capName + "; capStatus " + capStatus);
        partialCap = !cap.isCompleteCap();
        fileDateObj = cap.getFileDate();
        fileDate = "" + fileDateObj.getMonth() + "/" + fileDateObj.getDayOfMonth() + "/" + fileDateObj.getYear();
        fileDateYYYYMMDD = dateFormatted(fileDateObj.getMonth(), fileDateObj.getDayOfMonth(), fileDateObj.getYear(), "YYYY-MM-DD");
        var valobj = aa.finance.getContractorSuppliedValuation(capId, null).getOutput();
        if (valobj.length) {
            estValue = valobj[0].getEstimatedValue();
            calcValue = valobj[0].getCalculatedValue();
            feeFactor = valobj[0].getbValuatn().getFeeFactorFlag();
        }

        var capDetailObjResult = aa.cap.getCapDetail(capId);
        if (capDetailObjResult.getSuccess()) {
            capDetail = capDetailObjResult.getOutput();
            var houseCount = capDetail.getHouseCount();
            var feesInvoicedTotal = capDetail.getTotalFee();
            var balanceDue = capDetail.getBalance();
        }
        loadAppSpecific(AInfo);
        loadTaskSpecific(AInfo);
        loadParcelAttributes(AInfo);
        loadASITables();

        CreatedByACA = 'N';

        logDebug("<B>EMSE Script Results for " + capIDString + "</B>");
        logDebug("capId = " + capId.getClass());
        logDebug("cap = " + cap.getClass());
        logDebug("currentUserID = " + currentUserID);
        logDebug("currentUserGroup = " + currentUserGroup);
        logDebug("systemUserObj = " + systemUserObj.getClass());
        logDebug("appTypeString = " + appTypeString);
        logDebug("capName = " + capName);
        logDebug("capStatus = " + capStatus);
        logDebug("fileDate = " + fileDate);
        logDebug("fileDateYYYYMMDD = " + fileDateYYYYMMDD);
        logDebug("sysDate = " + sysDate.getClass());
        logDebug("parcelArea = " + parcelArea);
        logDebug("estValue = " + estValue);
        logDebug("calcValue = " + calcValue);
        logDebug("feeFactor = " + feeFactor);
        logDebug("houseCount = " + houseCount);
        logDebug("feesInvoicedTotal = " + feesInvoicedTotal);
        logDebug("balanceDue = " + balanceDue);

        //Run ASIUA standard choices for the vCapId variable provided
        doStandardChoiceActions("ApplicationSubmitAfter", true, 0);

        //Reset global variables to the original records
        capId = pcapId;
        cap = pcap;
        capIDString = pcapIDString;
        appTypeResult = pappTypeResult;
        appTypeString = pappTypeString;
        appTypeArray = pappTypeArray;
        capName = pcapName;
        capStatus = pcapStatus;
        fileDateObj = pfileDateObj;
        fileDate = pfileDate;
        fileDateYYYYMMDD = pfileDateYYYYMMDD;
        parcelArea = pparcelArea;
        estValue = pestValue;
        feesInvoicedTotal = pfeesInvoicedTotal;
        balanceDue = pbalanceDue;
        houseCount = phouseCount;
        feesInvoicedTotal = pfeesInvoicedTotal;
        capDetail = pcapDetail;
        AInfo = pAInfo;
        partialCap = ppartialCap;
        parentCapId = pparentCapId;
        CreatedByACA = pCreatedByACA;
        logDebug("***End ASA Sim");
    }
}
