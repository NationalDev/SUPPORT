//*********************************************************************************************************/
//	WTUA;PERMITS!~!~!APPLICATION.js															       /	
//																			Iman Sallam @ City of Detroit  /
//		Deploy with the script code and script title below (all caps)									   /
//																								           /
//					Version: 1   01/26/2018														 		   /				
//																										   /
//*********************************************************************************************************/






if (wfStatus == "Request for Corrections") {
        sendExternalReviewNotification();   
}



try {


	
	if (wfTask == "License Issuance" && wfStatus == "Issued"){
		
		newLicIdString = null;
		
		var b1ExpResult = aa.expiration.getLicensesByCapID(capId); 
    	var b1Exp = b1ExpResult.getOutput(); 
    	var expDate = b1Exp.getExpDateString();
    	var expStat = b1Exp.getExpStatus();
		
    	tmpNewDate = new Date();
    		
        var newExpDate = dateAdd(tmpNewDate,180); 
    	
    	  thisLic = new licenseObject(newLicIdString,capId);
        
          thisLic.setExpiration(newExpDate);
          thisLic.setStatus("Active");
          
          updateAppStatus("Active","Originally Issued",capId);
          
          
          logDebug("Business License Issued" + tmpNewDate + "  Expiration Date = " + newExpDate);
          
	}
          
		
	
	
}catch (err) {
	logDebug("A JavaScript Error occured: " + err.message);
}



