/**
 * This function is used as a part of Email Notification Template.
 * @param params
 * @returns params
 */

function getPrimaryOwnerParams4Notification(params) {
	
	//Pass in a hashtable and it will add the additional parameters to the table
	capOwnerResult = aa.owner.getOwnerByCapId(capId);
	
	if (capOwnerResult.getSuccess()) {
		owner = capOwnerResult.getOutput();
		
		for (own in owner) {
			thisOwner = owner[own];
			if (thisOwner.getPrimaryOwner() == "Y") {
				addParameter(params, "$$ownerFullName$$", thisOwner.getOwnerFullName());
				addParameter(params, "$$ownerPhone$$", thisOwner.getPhone());
				break;
			}
		}
	}
	
	return params;
}