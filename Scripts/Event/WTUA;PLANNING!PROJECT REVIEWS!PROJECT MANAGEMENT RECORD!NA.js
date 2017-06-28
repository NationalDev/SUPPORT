/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;PLANNING!PROJECT REVIEWS!PROJECT MANAGEMENT RECORD!NA.js 
 *   
 * 05/16/2016 Greg Soter, Futurenet Group Inc.
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
var childID;
var capDetailObjResult = aa.cap.getCapDetail(capId);		
if (capDetailObjResult.getSuccess()) {
	capDetail = capDetailObjResult.getOutput();
	var buildingCount = capDetail.getBuildingCount();
    var constrType = capDetail.getConstTypeCode();
    var publicOwned = capDetail.getPublicOwned();
    var createdBy = capDetail.getCreateBy();
}
if (wfTask == "Issuance" && wfStatus == "Permit Issued") {
    childID = createChild("Permits","Planning Reviews","Project Management Record","NA",getAppName(capId));   
    if (childID) {
        copyAddresses(capId,childID);
        copyASIFields(capId,childID);
        copyASITables(capId,childID);
        copyContacts(capId,childID);
        //copyFees(capId,childID);
        copyLicensedProf(capId,childID);
        copyOwner(capId,childID);
        copyParcels(capId,childID);
        copyConditions(capId,childID);
        editEstimatedJobValue(estValue,childID);
        editBuildingCount(buildingCount,childID);
        editHouseCount(houseCount,childID);
        editConstTypeCode(constrType,childID);
        editCreatedBy(createdBy,childID);
        var childCapDetailObjResult = aa.cap.getCapDetail(childID);
        if (childCapDetailObjResult.getSuccess()) {
            childCapDetail = childCapDetailObjResult.getOutput();
            childCapDetail.setPublicOwned(publicOwned);
        } else {
            logDebug("publicOwned not set");
        }
    } else {
        logDebug("Permit Child Not Created");
    }
}