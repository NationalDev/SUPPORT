/**
 * This function is used to get the License number of a particular created License Professional.
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 **/

function LicProfLookup_getLicenses(capId) {
	var searchCap = capId;
	var tmpId = capId;
	var prjArr = null;
	if (appMatch("*/*/*/License")) {
		var childArr = getChildren("*/*/*/Application");
		if(childArr != null) searchCap = childArr[0];
	}
	
	capId = tmpId;
	var vRelationType = "R";
	if(appMatch("*/*/*/Renewal")) vRelationType="Renewal";
	var prjArrRes = aa.cap.getProjectByChildCapID(searchCap,vRelationType,null);
	if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
	if (prjArr != null) {
		for(prj in prjArr) if(appMatch("*/*/*/License",prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
	}	
	if (licCapId == null && appMatch("*/*/*/License")) {
		licCapId = capId;
		//In the event license has no application;
	}
	if (licCapId == null && appMatch("*/*/*/Renewal")) {
		licCapId = capId;
		//In the event license has no application;
	}
	if (licCapId != null) {
		licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
	}
}