function getACADeepLinkParam4Notification(params, acaUrl, pAppType, pAppTypeAlias, module) {
	
	//Pass in a hashtable and it will add the additional parameters in the table.
	
	addParameter(params, "$$acaDeepLinkUrl$$", getDeepLinkUrl(acaUrl, pAppType, module));
	addParameter(params, "$$acaDeepLinkAppTypeAlias$$", pAppTypeAlias);
	
	return params;
}