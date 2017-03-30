/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: WorkflowTaskUpdateAfter
 * Event Description:After Event for Workflow Task Status Submital
 * Master Script: WorkflowTaskUpdateAfterV3.0
 *
 * Record Type: WTUA;BUSINESSLICENSE!CONSUMERSERVICES!~!APPLICATION.js
 * 08/29/2016 Vishal Upadhyay, FutureNet Group, Inc.  
 *
 */

//first task in WTUA is 'Application Intake'

//When status 'Application Accepted', assess the fee (applicant applied online)

if (wfTask == "Application Intake" && wfStatus == "Application Accepted") {

    if ((AInfo["License Type"]  == "Bathhouse")) {
        logDebug("Fees assessed on next line");
        updateFee("BATHHOUSE","BUSLICCONS_F","FINAL",1,"N");
    }
    
    else if ((AInfo["License Type"]  == "Medical Marijuana")) {
        logDebug("Fees assessed on next line");
        updateFee("MEDMARIJ","BUSLICCONS_F","FINAL",1,"N");
    }

    else if ((AInfo["License Type"]  == "Storage House")) {
        logDebug("Fees assessed on next line");
        updateFee("STORAGEHOUSE","BUSLICCONS_F","FINAL",1,"N");
    }

    else if ((AInfo["License Type"]  == "Tatoo Parlor")) {
        logDebug("Fees assessed on next line");
        updateFee("TATTOO PARLO","BUSLICCONS_F","FINAL",1,"N");
    }

    else if ((AInfo["License Type"]  == "Branch Plant")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLBP","BUSLICCONS_F","FINAL",1,"N");
    }

    else if ((AInfo["License Type"]  == "Branch Store")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLBSTR","BUSLICCONS_F","FINAL",1,"N");
    }

    else if ((AInfo["License Type"]  == "Hats Only")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLHATS","BUSLICCONS_F","FINAL",1,"N");
    }

    else if ((AInfo["License Type"]  == "Independent Agency-Drop Off")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLINDAGC","BUSLICCONS_F","FINAL",1,"N");
    }

    else if ((AInfo["License Type"]  == "Independent Plant Exception Carpet Cleaner")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLINDPLI","BUSLICCONS_F","FINAL",1,"N");
    }

    else if ((AInfo["License Type"]  == "Laundering Plant")) {
        logDebug("Fees assessed on next line");
        updateFee("DRYCLLP","BUSLICCONS_F","FINAL",1,"N");
    }

    }