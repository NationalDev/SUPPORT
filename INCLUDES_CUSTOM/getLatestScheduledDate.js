/**
 * This functions is used to get the latest schedule date for inspection.
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function getLatestScheduledDate() {
	var inspResultObj = aa.inspection.getInspections(capId);
	if (inspResultObj.getSuccess()) {
		inspList = inspResultObj.getOutput();
		var array = new Array();
		var j = 0;
		for (i in inspList) {
			if (inspList[i].getInspectionStatus().equals("Scheduled")) {
				array[j++] = aa.util.parseDate(inspList[i].getInspection().getScheduledDate());
			}
		}
		
		var latestScheduledDate = array[0];
		for (k = 0; k < array.length; k++) {
			temp = array[k];
			logDebug("----------array.k---------->" + array[k]);
			if (temp.after(latestScheduledDate)) {
				latestScheduledDate = temp;
			}
		}
		return latestScheduledDate;
	}
	return false;
}

