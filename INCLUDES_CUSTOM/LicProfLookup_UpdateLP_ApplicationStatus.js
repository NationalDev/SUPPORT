function LicProfLookup_UpdateLP_ApplicationStatus(licObj,licCapStatus){
	licObj.refLicModel.setBusinessName2(licCapStatus);
	logDebug("Lic Cap Status: " + licCapStatus);
}