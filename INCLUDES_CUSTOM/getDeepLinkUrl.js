/**
 * This function is used as a part of Email Notification Template.
 * @param acaUrl
 * @param appType
 * @param module
 * @returns acaDeepLinkUrl
 */

function getDeepLinkUrl(acaUrl, appType, module) {
	
	var acaDeepLinkUrl = "";
	
	acaDeepLinkUrl = acaUrl + "/Cap/CapApplyDisclaimer.aspx?CAPType=";
	acaDeepLinkUrl += appType;
	acaDeepLinkUrl += "&Module= " + module;;
	
	return acaDeepLinkUrl;
}