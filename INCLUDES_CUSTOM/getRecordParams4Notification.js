function getRecordParams4Notification(params) {
	
	//Pass in a hashtable and it will add the additional parameters to the table
	
	addParameter(params, "$$altID$$", capIDString);
	addParameter(params, "$$capName$$", capName);
	addParameter(params, "$$capStatus$$", capStatus);
	addParameter(params, "$$fileDate$$", fileDate);
	addParameter(params, "$$wordDesc$$", workDescGet(capId));
	addParameter(params, "$$balanceDue$$", "$" + parseFloat(balanceDue).toFixed(2));
	addParameter(params, "$$capTypeAlias$$", aa.cap.getCap(capId).getOutput().getCapType().getAlias());
	
//	if(wfComment != null) {
//		addParameter(params, "$$wfComment$$", wfComment);
//	}
	return params;
}