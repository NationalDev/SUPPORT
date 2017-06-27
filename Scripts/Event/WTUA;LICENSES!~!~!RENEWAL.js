/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;LICENSES!~!~!RENEWAL.js
 *  
 * Issues the business license by doing the following:- Create the license record,
 * expiration date and status.
 * Ensures that all record contacts are based on reference contacts.
 * 
 * Standard Choice:- 1. LIC Issue Business License	2. LIC Establish Links to Reference Contacts
 * 
 * Iman Sallam, City of Detroit 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if (wfTask == "License Issuance" && wfStatus == "Renewed") {
    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = appTypeArray[2];
    newLicId = getParentCapID4Renewal();
    // create the permit record;
    if (newLicId) {
        //newLicIdString = newLicId.getCustomID();
        updateAppStatus("Active","Originally Issued",newLicId);
        logDebug("newLicId =" + newLicId);
        logDebug("capId =" + capId);
        copyContacts(newLicId,capId);
        copyAppSpecific(capId);
        copyAddresses(capId,newLicId);
        copyASITables(capId,newLicId);
        copyLicensedProf(newLicId,capId);
        copyASIFields(capId,newLicId);
    }
    /**
     * Check Condition for Mechanical!Contractor Registration
     */
    tmpNewDate = new Date();
    if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "Contractor Registration") {
    	thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
    	thisYear += 3;
    	newExpDate = "08/31/" + thisYear.toString();
    	if (newLicId) {
            thisLic = new licenseObject(newLicIdString,newLicId);
            thisLic.setExpiration(dateAdd(newExpDate,0));
            thisLic.setStatus("Active");
    	}
    }
    
    /**
     * Check Condition for Electrical!Apprentice
     */
    if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "Apprentice") {
        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
        thisMonth = tmpNewDate.getMonth();
        if (thisMonth > 7) {
            thisYear += 1;     //thisYear = thisYear + 1;
        }
        newExpDate = "08/31/" + thisYear.toString();
        if (newLicId) {
        	thisLic = new licenseObject(newLicIdString,newLicId);
        	thisLic.setExpiration(dateAdd(newExpDate,0));
        	thisLic.setStatus("Active");
        }
    }
    /**
     * Check Condition for Plumbing!Contractor Registration
     */
    if (appTypeArray[1] == "Plumbing" && appTypeArray[2] == "Contractor Registration") {
    	thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
    	thisYear += 3;
    	newExpDate = "04/30/" + thisYear.toString();
    	if (newLicId) {
    		thisLic = new licenseObject(newLicIdString,newLicId);
            thisLic.setExpiration(dateAdd(newExpDate,0));
            thisLic.setStatus("Active");
    	}
    }  
    /**
     * Check Condition for boiler!Contractor Registration
     */
    if (appTypeArray[1] == "Boiler" && appTypeArray[2] == "Contractor Registration") {
        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
            thisYear += 3;
            newExpDate = "12/31/" + thisYear.toString();
        if (newLicId) {
            thisLic = new licenseObject(newLicIdString,newLicId);
            thisLic.setExpiration(dateAdd(newExpDate,0));
            thisLic.setStatus("Active");
        }
    }    
    /**
     * Check Condition for Mechincal!Occupational
     */
    if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "Occupational") {
        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
        monthsToInitialExpire = 12;
        tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
        if (newLicId) {
        	thisLic = new licenseObject(newLicIdString,newLicId);
        	thisLic.setExpiration(dateAdd(tmpNewDate,0));
        	thisLic.setStatus("Active");
        }
    }
    /**
   	 * Check Condition for Mechanical!RefrigJourneyman
   	 */ 
    if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "RefrigJourneyman") {
        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
        monthsToInitialExpire = 12;
        tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
        if (newLicId) {
        	thisLic = new licenseObject(newLicIdString,newLicId);
        	thisLic.setExpiration(dateAdd(tmpNewDate,0));
        	thisLic.setStatus("Active");
        }
    }
    /**
     * Check Condition for Building!ContractorRegistration
     */
    if (appTypeArray[1] == "Building" && appTypeArray[2] == "ContractorRegistration") {
        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;	
        newExpDate = "12/31/" + thisYear.toString();
        if (newLicId) {
        	thisLic = new licenseObject(newLicIdString,newLicId);
        	thisLic.setExpiration(dateAdd(newExpDate,0));
        	thisLic.setStatus("Active");
        }
    } else if (appTypeArray[1] == "Building" && appTypeArray[2] == "Sign-AwingContractor") {
	    	thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
	      	newExpDate = "12/31/" + thisYear.toString();
	      	if (newLicId) {
	      		thisLic = new licenseObject(newLicIdString,newLicId);
	      		thisLic.setExpiration(dateAdd(newExpDate,0));
	      		thisLic.setStatus("Active");
	      	}
    } else if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "Contractor") {		
    	tmpNewDate = new Date();
    	thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
    	newExpDate = "12/31/" + thisYear.toString();
    	if (newLicId) {
    		thisLic = new licenseObject(newLicIdString,newLicId);
    		thisLic.setExpiration(dateAdd(newExpDate,0));
    		thisLic.setStatus("Active");
    	}
     } else if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "ContractorRegistration") {
	    	thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
	    	newExpDate = "12/31/" + thisYear.toString();
	    	if (newLicId) {
	    		thisLic = new licenseObject(newLicIdString,newLicId);
	    		thisLic.setExpiration(dateAdd(newExpDate,0));
	    		thisLic.setStatus("Active");
	    	}
	 } else if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "Masters-Journeyman") {
	    	thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
	    	newExpDate = "12/31/" + thisYear.toString();
	    	if (newLicId) {
	    		thisLic = new licenseObject(newLicIdString,newLicId);
	    		thisLic.setExpiration(dateAdd(newExpDate,0));
	    		thisLic.setStatus("Active");
	    	}      	
	 } else if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "Elevator") {
		 thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
		 newExpDate = "12/31/" + thisYear.toString();
		 if (newLicId) {
			 thisLic = new licenseObject(newLicIdString,newLicId);
			 thisLic.setExpiration(dateAdd(newExpDate,0));
			 thisLic.setStatus("Active");
		 }	      	
	 } else if (appTypeArray[1] == "Contractor" && appTypeArray[2] == "Mechanical") {
	    	thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
	    	newExpDate = "07/11/"+thisYear.toString();
	    	if (newLicId) {
	    		thisLic = new licenseObject(newLicIdString,newLicId);
	    		thisLic.setExpiration(dateAdd(newExpDate,0));
	    		thisLic.setStatus("Active");
	    	} else {		 
	    	}   
	 } 
}