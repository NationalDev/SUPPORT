//WTUA:CodeEnforcement/Inspections/DangerousBuildings/Complaint

//Script #8 Dangerous Buildings Complaint - Referred to external agency

try {
	var template = "CODEENF_COMPLAINT_REFERRAL";
	var replyAddr = "noreply@accela.com";
	var testNo = new Array();
	
	if (wfTask == "Refer to Agency" && wfStatus == "Referred"){
		var propMaintenance = getTSIValue("Refer to Agency", "Property Maintenance");
		var publicWorks = getTSIValue("Refer to Agency", "Public Works");
		var police = getTSIValue("Refer to Agency", "Police");
		var buildPermits = getTSIValue("Refer to Agency", "Building Permits");
		var cityEngineering = getTSIValue("Refer to Agency", "City Engineering");
		var sidewalkRest = getTSIValue("Refer to Agency", "Sidewalk Restoration");
		
		testNo[0] = propMaintenance;
		testNo[1] = publicWorks;
		testNo[2] = police;
		testNo[3] = buildPermits;
		testNo[4] = cityEngineering;
		testNo[5] = sidewalkRest;
		
		var sendEmail = false;
		for (i in testNo){
			if (testNo[i] == "Yes"){
				sendEmail = true;
			}
		}
		
		if (sendEmail){		
			if (propMaintenance == "Yes"){
				var emailAddr = lookup("EMSE:DNG_Referral", "Property Maintenance");
				var address = getAddressInALine();
				var emailParameters = aa.util.newHashtable();
				addParameter(emailParameters, "$$address$$", address);
				sendNotification(replyAddr, emailAddr, "",template, emailParameters, null);
			}
			if (publicWorks == "Yes"){
				var emailAddr = lookup("EMSE:DNG_Referral", "Public Works");
				var address = getAddressInALine();
				var emailParameters = aa.util.newHashtable();
				addParameter(emailParameters, "$$address$$", address);
				sendNotification(replyAddr, emailAddr, "",template, emailParameters, null);
			}
			if (police == "Yes"){
				var emailAddr = lookup("EMSE:DNG_Referral", "Police");
				var address = getAddressInALine();
				var emailParameters = aa.util.newHashtable();
				addParameter(emailParameters, "$$address$$", address);
				sendNotification(replyAddr, emailAddr, "",template, emailParameters, null);
			}
			if (buildPermits == "Yes"){
				var emailAddr = lookup("EMSE:DNG_Referral", "Building Permits");
				var address = getAddressInALine();
				var emailParameters = aa.util.newHashtable();
				addParameter(emailParameters, "$$address$$", address);
				sendNotification(replyAddr, emailAddr, "",template, emailParameters, null);
			}
			if (cityEngineering == "Yes"){
				var emailAddr = lookup("EMSE:DNG_Referral", "City Engineering");
				var address = getAddressInALine();
				var emailParameters = aa.util.newHashtable();
				addParameter(emailParameters, "$$address$$", address);
				sendNotification(replyAddr, emailAddr, "",template, emailParameters, null);
			}
			if (sidewalkRest == "Yes"){
				var emailAddr = lookup("EMSE:DNG_Referral", "Sidewalk Restoration");
				var address = getAddressInALine();
				var emailParameters = aa.util.newHashtable();
				addParameter(emailParameters, "$$address$$", address);
				sendNotification(replyAddr, emailAddr, "",template, emailParameters, null);
			}
		}else{
			showMessage = true;
			cancel = true;  
			comment("At least one agency must be marked 'Yes' for a referral.");
			activateTask("Refer to Agency");
		}
	} // task/status
	
}catch (err) {
	logDebug("A JavaScript Error occured: " + err.message);
}

// Script #37 - Dangerous Buildings Complaint - Deferral Re-Inspection

if (wfTask == "Issue Deferral Letter with Corrections" && wfStatus == "180 day Deferrral Period"){
	scheduleInspection ("Dang Bldg Deferral Inspection", 0);
}

// Script #2 - Dangerous Buildings Complaint Admin Funding Fee
if (taskStatus("Council Hearing") == "Order Demo") {
	if (!feeExists("DNG0001", "INVOICED")){
		addFee("DNG0001", "ENFDNG_F", "FINAL", 1, "Y");
	}
}

// Script #3 - Dangerous Buildings Complaint Inspections
try {
if(wfTask=="Demolition Permit" && wfStatus=="Open Hole")
{
	scheduleInspection("Open Hole Inspection",0);
}
if(wfTask=="Open Hole Inspection" && wfStatus=="Winter")
{
	scheduleInspection("Winter Grade Inspection",0);
}

if(wfTask=="Winter Grade Inspection" && wfStatus=="Closed")
{
	scheduleInspection("Final Grade Inspection",0);
}

}catch (err) {
	logDebug("A JavaScript Error occured: " + err.message + " In Line " + err.lineNumber);
}

// Script #38 - Dangerous Buildings Complaint – Compliance Letter

if (taskStatus("Final Grade Inspection") == "Compliance") {
    var noReplyEmail = "noreply@accela.com";
    var contEmail = null;
    var contArr = getContactArray(capId);
    for (x in contArr){
        if (matches(contArr[x]["contactType"], "Wrecking Contractor", "Interested Party")) {
            contEmail = contArr[x]["CODEENF_COMPLIANCE_LETTER"];
            var emailParameters = aa.util.newHashtable();
            addParameter(emailParameters, "$$altID$$", capId.getCustomID());
            addParameter(emailParameters, "$$capName$$", capName);
            sendNotification(noReplyEmail, contEmail, "", "CODEENF_COMPLIANCE_LETTER", emailParameters, null);
        }
    }
}

// functions

function getTSIValue(wfTask,tsiFieldName){
	try{
		wf = aa.workflow.getTaskItemByCapID(capId,null).getOutput();
			for(x in wf) {
				fTask = wf[x]; 
				taskName=fTask.getTaskDescription();
				if(matches(taskName, wfTask)) {
					var stepNbr = wf[x].getStepNumber();
					var processID = wf[x].getProcessID();
					var TSIResult = aa.taskSpecificInfo.getTaskSpecificInfoByTask(capId, processID,stepNbr)
						if (TSIResult.getSuccess()){
							var TSI = TSIResult.getOutput();
							for (a1 in TSI){
								if (TSI[a1].getCheckboxDesc() == tsiFieldName) {
									var tsiValue = TSI[a1].getChecklistComment();
									// logDebug("TSI field: " + TSI[a1].getCheckboxDesc());
									// logDebug("TSI value: " + tsiValue);
									       
								}
							}
						}
				}
			}
		return tsiValue;
	}catch (err){
	 logDebug("A JavaScript Error occurred - getTSIValue function: " + err.message);
	}
}

function getAddressInALine() {

	var capAddrResult = aa.address.getAddressByCapId(capId);
	var addressToUse = null;
	var strAddress = "";
		
	if (capAddrResult.getSuccess()) {
		var addresses = capAddrResult.getOutput();
		if (addresses) {
			for (zz in addresses) {
  				capAddress = addresses[zz];
				if (capAddress.getPrimaryFlag() && capAddress.getPrimaryFlag().equals("Y")) 
					addressToUse = capAddress;
			}
			if (addressToUse == null)
				addressToUse = addresses[0];

			if (addressToUse) {
			    strAddress = addressToUse.getHouseNumberStart();
			    var addPart = addressToUse.getStreetDirection();
			    if (addPart && addPart != "") 
			    	strAddress += " " + addPart;
			    var addPart = addressToUse.getStreetName();
			    if (addPart && addPart != "") 
			    	strAddress += " " + addPart;	
			    var addPart = addressToUse.getStreetSuffix();
			    if (addPart && addPart != "") 
			    	strAddress += " " + addPart;	
			    var addPart = addressToUse.getCity();
			    if (addPart && addPart != "") 
			    	strAddress += " " + addPart + ",";
			    var addPart = addressToUse.getState();
			    if (addPart && addPart != "") 
			    	strAddress += " " + addPart;	
			    var addPart = addressToUse.getZip();
			    if (addPart && addPart != "") 
			    	strAddress += " " + addPart;	
				return strAddress
			}
		}
	}
	return null;
}
