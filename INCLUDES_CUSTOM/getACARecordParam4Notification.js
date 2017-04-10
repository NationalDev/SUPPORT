/**
 * This function is used as a part Email Notification Template.
 * @param params
 * @param acaUrl
 * @returns params
 */

function getACARecordParam4Notification(params, acaUrl) {
	
	//Pass in a hashtable and it will add the additional parameters to the table.
	addParameter(params, "$$acaRecordUrl$$", getACARecordURL(acaUrl));
	
	return params;
}