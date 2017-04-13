/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Specific Info Update After
 * Event Description:- The after event for when a user updates application specific information
 * MasterScript:- ApplicationSpecificInfoUpdateAfterV3.0.js
 * Record Type:- ASIUA;PERMITS!ADMIN!APPROVAL!NA.js
 * 
 * 09/28/2016 Greg Soter, FutureNet Group, Inc.
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTADM_F";  //Fee Schedule Code
var cList = CODEITEM;       //Custom List Name as it appears in logDebug window
var daysAhead = 7;         //The amount of days in the future inspection will be scheduled
//---END PARAMETERS-------------------------------------------------------------------------------//

if (currentUserID == "ADMIN") {
    showDebug = true;
    showMessage = true;
}
if (cList.length > 0) {
    var addItems = (cList.length - 1);
    updateFee("ADM0002",feeSched,"CODE",addItems,"N"); 
} else {
    logDebug("No items in list.");
}
if (AInfo["Division"] != "Plan Review" && AInfo["Division"] != "") {
    var currInspRes = aa.inspection.getInspections(capId); //Outputs an array of inspections for the record ID
    if (currInspRes.getSuccess()) {
        if (currInspRes.getOutput().length > 0) {
            var currInsp = currInspRes.getOutput();
            var alreadyScheduled = false;
            //----------Start Cancel Loop----------Cancel all scheduled inspections that don't match "Division"
            for (i in currInsp) { 
                if (currInsp[i].getInspectionType() != AInfo["Division"] && currInsp[i].getInspectionStatus() != "Cancelled") {
                    var cancelRes = aa.inspection.cancelInspection(capId,currInsp[i].getIdNumber());
                    if (!cancelRes.getSuccess()) {
                        logDebug("Could not cancel inspection with ID:" + currInsp[i].getIdNumber());
                    }
                } else if (currInsp[i].getInspectionType() == AInfo["Division"] && currInsp[i].getInspectionStatus() != "Cancelled") {
                    alreadyScheduled = true;
                }
            }
            //----------End Cancel Loop--------------If properly scheduled inspection found, flag has been set    
            if (!alreadyScheduled) {
                scheduleInspection(AInfo["Division"],daysAhead);
            }
        } else {	//No inspections have been scheduled, so schedule the one selected in "Division"
            scheduleInspection(AInfo["Division"],daysAhead);
        }
    }
} else {
    logDebug("Division:" + AInfo["Division"] + "  -No inspection scheduled.");
}