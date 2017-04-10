/**
 * This function is used in LicensedProfessionals
 * @param licnumber
 * @param publicUserID
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function associatedLicensedProfessionalWithPublicUser(licnumber, publicUserID) {
	
	var mylicense = aa.licenseScript.getRefLicenseProfBySeqNbr(aa.getServiceProviderCode(), licnumber);
	var puser = aa.publicUser.getPublicUserByPUser(publicUserID);
	if(puser.getSuccess()) {
		aa.licenseScript.associateLpWithPublicUser(puser.getOutput(), mylicense.getOutput());
	}
}
