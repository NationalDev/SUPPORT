function sendExternalReviewNotification() {
	
	//Provide the ACA URL - This should be set in INCLUDES_CUSTOM_GLOBAL
	var acaURL = "acasupp3.accela.com/detroit";
	
	//Provide the Agency Reply Email - This should be set in INCLUDE_CUSTOM_GLOBALS
//	var agencyReplyEmail = "accelasupport@futurenetgroup.com";
	
	//Provide the To Email and CC Email - This should be set in INCLUDE_CUSTOM_GLOBALS
	var toEmail = "chaitanyat@futurenetgroup.com";
	var ccEmail = "gregs2@futurenetgroup.com";
	
	//Provide the Notification Template to use
	var notificationTemplate = "NOTIFICATION TEMPLATE";
	
	var eParams = aa.util.newHashtable();
	
	addParameter(eParams, "$$altID$$", cap.getCapType().getAlias());
	
	getRecordParams4Notification(eParams);
	
	getACARecordParam4Notification(eParams, acaURL);
	
	getWorkflowParams4Notification(eParams);
	
	getPrimaryAddressLineParam4Notification(eParams);
	
	sendNotification("", toEmail, ccEmail, notificationTemplate, eParams, null);
	
}