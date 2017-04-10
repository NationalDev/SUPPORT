/**
 * This function is used as a part of Email Notification Template
 * @param params
 * @param acaUrl
 * @param docModel
 * @returns parans
 */

function getAcaDocDownloadParam4Notification(params, acaUrl, docModel) {
	
	//Pass in the hashtable and it will add the additional parameters to the table.
	addParameter(params, "$$acaDocDownloadUrl$$", getACADocumentDownloadUrl(acaUrl, docModel));
	
	return params;
}