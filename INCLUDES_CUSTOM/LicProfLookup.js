/**
 * This function is used to update a License Professional based on it's stateLicenseNumber
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function LicProfLookup() {
	logDebug("Using LICENSESTATE = " + LICENSESTATE + " from EMSE:GlobalFlags");
	//Issue State;
	LICENSETYPE = "";
	//License Type to be populated;
	licCapId = null;
	isNewLic = false;
	licIDString = null;
	licObj = null;
	licCap = null;
	LicProfLookup_getLicenses();
	//Get License CAP;
	if (licCapId !=null) {
		LicProfLookup_getLicenseType();
		stateLicense = getAppSpecific("State License Number",licCapId);
	}
	
	licObj = licenseProfObject(stateLicense ,LICENSETYPE);
	//Get LicArray;
	if (!licObj.valid && lookup("LICENSED PROFESSIONAL TYPE",LICENSETYPE) != null) {
		LicProfLookup_CreateLP();
		licObj = licenseProfObject(stateLicense ,LICENSETYPE );
	}
	if (licObj.valid) {
		LicProfLookup_UpdateLP();
	} else {
		logDebug("LP Not found to update");
	}
}