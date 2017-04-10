/**
 * This function is used as a part of Email Notification Template
 * @param emailFrom
 * @param emailTo
 * @param emailCC
 * @param templateName
 * @param params
 * @param reportFile
 * @returns
 */

function sendNotification(emailFrom, emailTo, emailCC, templateName, params, reportFile) {
	
	//send notification
	var id1 = capId.ID1;
	var id2 = capId.ID2;
	var id3 = capId.ID3;
	
	var capIDScriptModel = aa.cap.createCapIDScriptModel(id1, id2, id3);
	
	var result = null;
	result = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, templateName, params, capIDScriptModel, reportFile);
	
	if (result.getSuccess()) {
		logDebug("Email Sent Successfully!");
		return true;
	} else {
		logDebug("Failed to send mail. - " + result.getErrorType());
		return false;
	}
}