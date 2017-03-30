function getAcaDocDownloadParam4Notification(params, acaUrl, docModel) {
	
	//Pass in the hashtable and it will add the additional parameters to the table.
	
	addParameter(params, "$$acaDocDownloadUrl$$", getACADocumentDownloadUrl(acaUrl, docModel));
	
	return params;
}