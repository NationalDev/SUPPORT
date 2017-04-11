/**
 * This function is used to create a License Professional
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function LicProfLookup_CreateLP() {
	var vNewLic = aa.licenseScript.createLicenseScriptModel();
	vNewLic.setAgencyCode(aa.getServiceProviderCode());
	vNewLic.setAuditDate(sysDate);
	vNewLic.setAuditID(currentUserID);
	vNewLic.setAuditStatus("A");
	vNewLic.setLicenseType(LICENSETYPE);
	vNewLic.setLicState(LICENSESTATE);
	vNewLic.setStateLicense(stateLicense);
	aa.licenseScript.createRefLicenseProf(vNewLic);
	var tmpLicObj = licenseProfObject(stateLicense,LICENSETYPE);
	if (tmpLicObj.valid) {
		isNewLic = true;
	}
	if (tmpLicObj.valid &&licIDString) {
		associatedRefContactWithRefLicProf(licCapId,licObj.refLicModel.getLicSeqNbr(), aa.getServiceProviderCode(),currentUserID);
	}
	
	var mycap = aa.cap.getCap(capId).getOutput();
	if (tmpLicObj.valid && mycap.getCapModel().getCreatedByACA() == 'Y') {
		associatedLicensedProfessionalWithPublicUser(licObj.refLicModel.getLicSeqNbr(), mycap.getCapModel().getCreatedBy().toString());
	}
}