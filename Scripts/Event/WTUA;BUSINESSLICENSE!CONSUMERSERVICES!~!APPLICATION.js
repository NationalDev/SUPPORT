/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;BUSINESSLICENSE!CONSUMERSERVICES!~!APPLICATION.js
 *  
 * Issues the business license by doing the following:- Create the license record,
 * expiration date and status.
 * Ensures that all record contacts are based on reference contacts.
 * 
 * Standard Choice:- 1. LIC Issue Business License	2. LIC Establish Links to Reference Contacts
 * 
 * When status "Application Accepted", assess the fee.
 * 
 * 08/29/2016 Vishal Upadhyay, FutureNet Group, Inc.   
 *   
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if (wfTask == "Application Intake" && wfStatus == "Application Accepted") {
    if ((AInfo["License Type"]  == "Bathhouse")) {
        logDebug("Fees assessed on next line");
        updateFee("BATHHOUSE","BUSLICCONS_F","FINAL",1,"N");
    } else if ((AInfo["License Type"]  == "Medical Marijuana")) {
        logDebug("Fees assessed on next line");
        updateFee("MEDMARIJ","BUSLICCONS_F","FINAL",1,"N");
    } else if ((AInfo["License Type"]  == "Storage House")) {
        logDebug("Fees assessed on next line");
        updateFee("STORAGEHOUSE","BUSLICCONS_F","FINAL",1,"N");
    } else if ((AInfo["License Type"]  == "Tatoo Parlor")) {
        logDebug("Fees assessed on next line");
        updateFee("TATTOO PARLO","BUSLICCONS_F","FINAL",1,"N");
    } else if ((AInfo["License Type"]  == "Branch Plant")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLBP","BUSLICCONS_F","FINAL",1,"N");
    } else if ((AInfo["License Type"]  == "Branch Store")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLBSTR","BUSLICCONS_F","FINAL",1,"N");
    } else if ((AInfo["License Type"]  == "Hats Only")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLHATS","BUSLICCONS_F","FINAL",1,"N");
    } else if ((AInfo["License Type"]  == "Independent Agency-Drop Off")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLINDAGC","BUSLICCONS_F","FINAL",1,"N");
    } else if ((AInfo["License Type"]  == "Independent Plant Exception Carpet Cleaner")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLINDPLI","BUSLICCONS_F","FINAL",1,"N");
    } else if ((AInfo["License Type"]  == "Laundering Plant")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLLP","BUSLICCONS_F","FINAL",1,"N");
    }
}