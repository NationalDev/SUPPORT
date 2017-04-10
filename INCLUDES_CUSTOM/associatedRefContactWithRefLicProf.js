/**
 * This function is used with LicensedProfessional
 * @param capIdStr
 * @param refLicProfSeq
 * @param servProvCode
 * @param auditID
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function associatedRefContactWithRefLicProf(capIdStr,refLicProfSeq,servProvCode,auditID) {
	
	var contact = getLicenseHolderByLicenseNumber(capIdStr);
	if(contact && contact.getRefContactNumber()) {
		linkRefContactWithRefLicProf(parseInt(contact.getRefContactNumber()),refLicProfSeq,servProvCode,auditID)
	} else {
		logMessage("**ERROR:cannot find license holder of license");
	}
}
