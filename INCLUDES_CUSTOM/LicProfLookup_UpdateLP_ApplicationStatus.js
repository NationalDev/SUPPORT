/**
 * This function is used to update the Application Status of a particular record of a License Professional
 * @param licObj
 * @param licCapStatus
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function LicProfLookup_UpdateLP_ApplicationStatus(licObj,licCapStatus) {
	licObj.refLicModel.setBusinessName2(licCapStatus);
	logDebug("Lic Cap Status: " + licCapStatus);
}