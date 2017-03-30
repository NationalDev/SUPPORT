/***********************************************************************************************
 * WTUA;BUSINESSLICENSE!LODGING!~!APPLICATION.js
 * When statused 'Application Accepted', assess the fee (applicant applied online)
 * 
 * Event Name: ApplicationSubmitAfter
 * 
 * Event Description: The after event for submitting an application (SPEAR form and ACA Pageflow)
 * 
 * Master Script: ApplicationSubmitAfterV3.0
 *
 * Record Type(s): BUSINESSLICENSE/LODGING/~/APPLICATION
 *
 *   Deployed 08/02/2016 by AJ and CR, FutureNet Group, Inc.
 *
 ***********************************************************************************************/



//When statused 'Application Accepted', assess the fee (applicant applied online)
//first task in WTUA is 'Application Intake' 


//----------BEGIN Fee Assessment----------------------
if (cap.isCreatedByACA() && wfTask == "Application Intake" && wfStatus == "Application Accepted") {
//  When License Type is a Public Lodging House
    if (AInfo["License Type"] == "Public Lodging House") {
        logDebug("Fees assessed on next line");
        updateFee("PUBLODGHOUSE","BUSLICLODG_F","FINAL",1,"N");
    }


//  When License type is a Hotel
    else if (AInfo["License Type"] == "Hotel") {
        if (AInfo["Number of Rooms"]  == "1 - 50 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("HOTEL","BUSLICLODG_F","FINAL",1,"N");
        }
     
        else if (AInfo["Number of Rooms"]  == "51 - 100 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("HOTEL51-100","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "101 - 200 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("HOTEL101-200","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "201 - 300 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("HOTEL201-300","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "301 - 500 Rooms") { 
            logDebug("Fees assessed on next line");	
            updateFee("HOTEL301-500","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "501 and Up") { 
            logDebug("Fees assessed on next line");	
            updateFee("HOTEL501UP","BUSLICLODG_F","FINAL",1,"N");
        }
    }

//  When License type is a Hotel Class B
    else if (AInfo["License Type"] == "Hotel Class B") {
        //insert updateFee() or DD if() statements for Hotel Class B
        if (AInfo["Number of Rooms"]  == "1 - 50 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("HOTEL","BUSLICLODG_F","FINAL",1,"N");
        }
     
        else if (AInfo["Number of Rooms"]  == "51 - 100 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("HOTEL51-100","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "101 - 200 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("HOTEL101-200","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "201 - 300 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("HOTEL201-300","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "301 - 500 Rooms") { 
            logDebug("Fees assessed on next line");	
            updateFee("HOTEL301-500","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "501 and Up") { 
            logDebug("Fees assessed on next line");	
            updateFee("HOTEL501UP","BUSLICLODG_F","FINAL",1,"N");
        }
    }

//  When License type is a Shelter
    else if (AInfo["License Type"] == "Shelter") {
        if (AInfo["Number of Rooms"]  == "1 - 50 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("SHELTER","BUSLICLODG_F","FINAL",1,"N");
        }
     
        else if (AInfo["Number of Rooms"]  == "51 - 100 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("SHELT51-100","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "101 - 200 Rooms") {
            logDebug("Fees assessed on next line");
            updateFee("SHELT101-200","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "201 - 300 Rooms") { 
            logDebug("Fees assessed on next line");
            updateFee("SHELT201-300","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "301 - 500 Rooms") { 
            logDebug("Fees assessed on next line"); 
            updateFee("SHELT301-500","BUSLICLODG_F","FINAL",1,"N");
        }
        
        else if (AInfo["Number of Rooms"]  == "501 and Up") { 
            logDebug("Fees assessed on next line"); 
            updateFee("SHELT501UP","BUSLICLODG_F","FINAL",1,"N");
        }
    }

//  When License type is a Rooming House
    else if (AInfo["License Type"] == "Rooming House") {
            logDebug("Fees assessed on next line");
            updateFee("ROOMHOUSE","BUSLICLODG_F","FINAL",1,"N");
    }
     
//  When License type is a Bed & Breakfast
    else if (AInfo["License Type"]  == "Bed & Breakfast") { 
            logDebug("Fees assessed on next line");
            updateFee("RMHOUSEBB","BUSLICLODG_F","FINAL",1,"N");
    }


//  If License type is none of the above
    else {
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