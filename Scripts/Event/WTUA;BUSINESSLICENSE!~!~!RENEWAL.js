//*********************************************************************************************************/
//	WTUA;BUSINESSLICENSE!~!~!RENEWAL.js															       /	
//																			Iman Sallam @ City of Detroit  /
//		Deploy with the script code and script title below (all caps)									   /
//																								           /
//					WTUA:BUSINESSLICENSE/*/*/RENEWAL							7/26/2017							 							
//																										   /
//*********************************************************************************************************/
//WTUA:BUSINESSLICENSE/*/*/RENEWAL script
var showDebug = true;
var showMessage = true;

if (wfStatus == "Request for Corrections") {
        sendExternalReviewNotification();   
}


if (wfTask == "Renewal Review" && wfStatus == "Renewed") {
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
        copyASITables(capId,newLicId);
        
    var b1ExpResult = aa.expiration.getLicensesByCapID(newLicId); 
	var b1Exp = b1ExpResult.getOutput(); 
	var expDate = b1Exp.getExpDateString();
	var expStat = b1Exp.getExpStatus();

	tmpNewDate = new Date();

    thisYear = parseInt(tmpNewDate.getYear().toString())+1900;

    thisYear += 1;

    Cycle= new getAppSpecific("Billing Cycle").toString();   
    
   var newExpDate = (Cycle + "/"+thisYear);                
                  
   
    if (newLicId) {
        thisLic.setExpiration(newExpDate);
        thisLic.setStatus("Active");
        }
            
if (newLicId) {
    
    }
logDebug("Business License Renewed" + tmpNewDate);
}}