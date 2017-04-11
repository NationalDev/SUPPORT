/**
 * This function is used to check for duplicate records provided the record ID.
 * @param vApp
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function ServiceRequestDuplicateCheckLoop(vApp) {
	vApp = null;
	vApp = recordArray[iRec];
	vCap = aa.cap.getCap(vApp).getOutput();
	vAppTypeString = vCap.getCapType().toString();
	vFileDateObj = vCap.getFileDate();
	bAppTypeMatch = false;
	bASIMatch = false;
	if (appMatch(vAppTypeString) && (vApp.equals(capId) == false)) {
		bAppTypeMatch = true;
	}
	
	if (bAppTypeMatch) {
		sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"MM/DD/YYYY");
	}
	
	if (bAppTypeMatch) {
		vFileDate = "" + vFileDateObj.getMonth() + "/" + vFileDateObj.getDayOfMonth() + "/" + vFileDateObj.getYear();
	}
	
	if (bAppTypeMatch && dateDiff(vFileDate, sysDateMMDDYYYY) < 3) {
		updateAppStatus("Potential Duplicate","This is a potential duplicate of Record ID: " + vApp.getCustomID());
		createCapComment("This is a potential duplicate of Record ID: " + vApp.getCustomID());
	}
}