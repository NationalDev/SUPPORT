//*********************************************************************************************************/
//	WTUA;BUSINESSLICENSE!~!~!APPLICATION.js															       /	
//																			Iman Sallam @ City of Detroit  /
//		Deploy with the script code and script title below (all caps)									   /
//																								           /
//					WTUA:BUSINESSLICENSE/*/*/APPLICATION														 							
//																										   /
//*********************************************************************************************************/
//WTUA:BUSINESSLICENSE/*/*/APPLICATION script
//WTUA;BUSINESSLICENSE!~!~!APPLICATION

if (wfStatus == "Request for Corrections") {
        sendExternalReviewNotification();   
}


if (wfTask == "License Issuance" && wfStatus == "Issued") {

    newLic = null;
    newLicId = null;
    newLicIdString = null;
       
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
    // create the license record;
    if (newLicId) {
        
    	newLicIdString = newLicId.getCustomID();
        
        copyAppSpecific(capId);
        copyAddresses(capId,newLicId);
        copyASITables(capId,newLicId);
        copyASIFields(capId,newLicId);       
        copyContacts(capId,newLicId);
        editAppName(capName,newLicId);       
        updateAppStatus("Active","Originally Issued",newLicId);     
        
        var b1ExpResult = aa.expiration.getLicensesByCapID(newLicId); 
    	var b1Exp = b1ExpResult.getOutput(); 
    	var expDate = b1Exp.getExpDateString();
    	var expStat = b1Exp.getExpStatus();
    	
    	logDebug("Attempting to use 'getExpStatus()' for " + capId + " expirying on this date: " + expDate); 
    	
        editAppName(getAppSpecific("Application Name"),newLicId);

        tmpNewDate = new Date();

        thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
           
        thisYear += 1;
                
          newExpDate = "06/30/"+thisYear.toString();

        if (newLicId) {
            thisLic = new licenseObject(newLicIdString,newLicId);
            thisLic.setExpiration(newExpDate);
            thisLic.setStatus("Active");
            }
    
    if (newLicId) {
        changeCapContactTypes("Applicant","License Holder", newLicId);
        }

    if (newLicId) {
        copyOwner(capId, newLicId);
        }

    if (newLicId) {
        copyASITables(capId,newLicId);
        }
    logDebug("Business License Issued" + tmpNewDate);
	}
    }
    