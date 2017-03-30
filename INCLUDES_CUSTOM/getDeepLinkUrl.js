function getDeepLinkUrl(acaUrl, appType, module) {
	
	var acaDeepLinkUrl = "";
	
	acaDeepLinkUrl = acaUrl + "/Cap/CapApplyDisclaimer.aspx?CAPType=";
	acaDeepLinkUrl += appType;
	acaDeepLinkUrl += "&Module= " + module;;
	
	return acaDeepLinkUrl;
}