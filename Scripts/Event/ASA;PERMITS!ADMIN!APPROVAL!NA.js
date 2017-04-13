/**
 * To calculate and assess permit fee based on the number of administrative fee items.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * MasterScript:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;PERMITS!ADMIN!APPROVAL!NA.js
 * 
 * 09/25/2016 Greg Soter, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTADM_F";  //Fee Schedule Code
var cList = CODEITEM;       //Custom List Name as it appears in logDebug window
var daysAhead = 7;          //The amount of days in the future inspection will be scheduled
//---END PARAMETERS-------------------------------------------------------------------------------//

copyParcelGisObjects();

if (cList.length > 1) {
    var addItems = (cList.length - 1);
    //ADM0001 is auto assessed and therefore already on the record before this runs
    updateFee("ADM0002",feeSched,"CODE",addItems,"N");  
} else {
    logDebug("No additional items in list.");
}

if (AInfo["Division"] != "Plan Review" && AInfo["Division"] != "") {
    scheduleInspection(AInfo["Division"],daysAhead);
} else {
    logDebug("Division:" + AInfo["Division"] + "  - No inspection scheduled.")
}