/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;BUSINESSLICENSE!LODGING!~!APPLICATION.js
 *  
 * Issues the business license by doing the following:- Create the license record,
 * expiration date and status.
 * Ensures that all record contacts are based on reference contacts.
 * 
 * Standard Choice:- 1. LIC Issue Business License	2. LIC Establish Links to Reference Contacts
 * 
 * When status is "Application Accepted", assess the fee. 
 *  
 * 08/02/2016 Tonee Johnson, FutureNet Group, Inc. 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//----------BEGIN Fee Assessment----------------------
if (cap.isCreatedByACA() && wfTask == "Application Intake" && wfStatus == "Application Accepted") {
    if (AInfo["License Type"] == "Public Lodging House") {
        logDebug("Fees assessed on next line");
        updateFee("PUBLODGHOUSE","BUSLICLODG_F","FINAL",1,"N");
    } else if (AInfo["License Type"] == "Hotel") {
        if (AInfo["Number of Rooms"]  == "1 - 50 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("HOTEL","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "51 - 100 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("HOTEL51-100","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "101 - 200 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("HOTEL101-200","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "201 - 300 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("HOTEL201-300","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "301 - 500 Rooms") { 
            logDebug("Fees assessed on next line");	
            updateFee("HOTEL301-500","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "501 and Up") { 
            logDebug("Fees assessed on next line");	
            updateFee("HOTEL501UP","BUSLICLODG_F","FINAL",1,"N");
        }
    } else if (AInfo["License Type"] == "Hotel Class B") {
    	if (AInfo["Number of Rooms"]  == "1 - 50 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("HOTEL","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "51 - 100 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("HOTEL51-100","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "101 - 200 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("HOTEL101-200","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "201 - 300 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("HOTEL201-300","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "301 - 500 Rooms") { 
            logDebug("Fees assessed on next line");	
            updateFee("HOTEL301-500","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "501 and Up") { 
            logDebug("Fees assessed on next line");	
            updateFee("HOTEL501UP","BUSLICLODG_F","FINAL",1,"N");
        }
    } else if (AInfo["License Type"] == "Shelter") {
        if (AInfo["Number of Rooms"]  == "1 - 50 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("SHELTER","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "51 - 100 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("SHELT51-100","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "101 - 200 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("SHELT101-200","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "201 - 300 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("SHELT201-300","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "301 - 500 Rooms") { 
            logDebug("Fees assessed on next line"); 
            updateFee("SHELT301-500","BUSLICLODG_F","FINAL",1,"N");
        } else if (AInfo["Number of Rooms"]  == "501 and Up") { 
            logDebug("Fees assessed on next line"); 
            updateFee("SHELT501UP","BUSLICLODG_F","FINAL",1,"N");
        }
    } else if (AInfo["License Type"] == "Rooming House") {
            logDebug("Fees assessed on next line");
            updateFee("ROOMHOUSE","BUSLICLODG_F","FINAL",1,"N");
    } else if (AInfo["License Type"]  == "Bed & Breakfast") { 
            logDebug("Fees assessed on next line");
            updateFee("RMHOUSEBB","BUSLICLODG_F","FINAL",1,"N");
    } else {
        logDebug("License Type = " + AInfo["License Type"]);
        logDebug("Fee not assessed");
        showMessage = true;
        comment("License type not provided, fees could not be assessed");
    }
}
//----------BEGIN Issuance--------------------
if (allTasksComplete("BUSLICBAMA2_W","License Issuance")) {
	activateTask("License Issuance");
}