/**
 * This function is used to update a License Professional record
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna
 */

function LicProfLookup_UpdateLP() {
	LicProfLookup_UpdateLP_BaseFields(licObj,LICENSESTATE,licCap,licCapId,licCapTypeArr);
	LicProfLookup_UpdateLP_ApplicationStatus(licObj,licCapStatus);
	if (licObj.updateRecord()) {
		logDebug("LP Updated Successfully");
	} else {
		logDebug("LP Update Failed");
	}
}