/**
 * This function is used as a part of Email Notification Template.
 * @param acaUrl
 * @param documentModel
 * @returns
 */

function getACADocumentDownloadUrl(acaUrl, documentModel) {
	
	//Returns the ACA URL for supplied document model
	var acaUrlResult = aa.document.getACADocumentUrl(acaUrl, documentModel);
	
	if(acaUrlResult.getSuccess()) {
		acaDocUrl = acaUrlResult.getOutput();
		return acaDocUrl;
	} else {
		logDebug("Error retrieving ACA Document URL: " + acaUrlResult.getErrorType())
		return false;
	}
}