function LicProfLookup_UpdateLP_BaseFields(licObj,LICENSESTATE,licCap,licCapId,licCapTypeArr){
	licObj.refLicModel.setState(LICENSESTATE);
	licObj.refLicModel.setLicenseBoard(LICENSETYPE);
	licObj.refLicModel.setLicenseIssueDate(licCap.getFileDate());
	var expObj = null;
	var expDt = null;
	var expObjRes = aa.expiration.getLicensesByCapID(licCapId);
	if(expObjRes.getSuccess()) var expObj = expObjRes.getOutput();
	if (expObj != null) {
		expDt = aa.date.parseDate(expObj.getExpDateString());
		}
	
	if (expDt != null) {
		licObj.refLicModel.setBusinessLicExpDate(expDt);
		//Expiration Date;
		}
	
	if (licCapTypeArr[1] == "Business") {
		licObj.refLicModel.setLicenseBoard(getAppSpecific("Business Type",licCapId));
		} else {
		licObj.refLicModel.setLicenseBoard(LICENSETYPE);
		}
	
	if (licObj.updateFromRecordContactByType(licCapId,"",true,true)) {
		logDebug("LP Updated from Primary Contact");
		} else {
		logDebug("LP Failed to Update from Primary Contact trying License Holder");
		if(licObj.updateFromRecordContactByType(licCapId,"License Holder",true,true)) logDebug("Updated from License Holder");
		else logDebug("Couldn't Update Contact Info");
		}
	
	if (getAppSpecific("Doing Business As (DBA) Name",licCapId)) {
		licObj.refLicModel.setBusinessName(getAppSpecific("Doing Business As (DBA) Name",licCapId) );
		}
	
	if (getAppSpecific("State License Expiration Date",licCapId)) {
		var expDate = getAppSpecific("State License Expiration Date",licCapId);
		licObj.refLicModel.setLicenseExpirationDate(aa.date.parseDate(expDate));
		}
	
	licObj.refLicModel.setBusinessLicense(licCap.getCapModel().getAltID());
	logDebug("BaseFields setBusinessLicense =" +  licCap.getCapModel().getAltID());
}