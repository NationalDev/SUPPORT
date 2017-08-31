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

// script #5 - If any clearance Denied. No License Issuance.

try {
	var found;
	var okToIssue = true;
	
	if (wfTask == "License Issuance" && wfStatus == "Issued"){
		// loop through tasks
		var workflowResult = aa.workflow.getTasks(capId);
		if (workflowResult.getSuccess()){
			var wfObj = workflowResult.getOutput();
		}else{ 
			logDebug("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage()); 
		}

		for (i in wfObj){
			var fTask = wfObj[i];
			var tempTaskModel = fTask.getTaskItem();
	
			var str = fTask.getTaskDescription();
			found = str.search("Clearance");
							
			if (found != -1){
				var tStatus = fTask.getDisposition();
				if(tStatus == "Denied"){
					okToIssue = false;
				}
			}
		}
		if (!okToIssue){
			showMessage = true;
			cancel = true;
			comment("License cannot be issued while a Clearance task is Denied.");
		}else{
			if(balanceDue != 0){
				showMessage = true;
				cancel = true;
				comment("License cannot be issued while there is a balance due.");
			}else{
				issueLicense();
			}
		}
	}
	
	
}catch (err) {
	logDebug("A JavaScript Error occured: " + err.message);
}



function issueLicense(){
    newLic = null;
    newLicId = null;
    newLicIdString = null;
       
    newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
    
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

    	tmpNewDate = new Date();

        thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
 
        thisYear += 1;

        Cycle= new getAppSpecific("Cycle Date").toString();   
        
       var newExpDate = (Cycle + "/"+thisYear);                
                      
       
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