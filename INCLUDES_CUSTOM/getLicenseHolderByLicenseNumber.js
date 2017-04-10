/**
 * This function gets the name of License Holder by their License Number
 * @param capIdStr
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function getLicenseHolderByLicenseNumber(capIdStr) {
	var capContactResult = aa.people.getCapContactByCapID(capIdStr);
	if (capContactResult.getSuccess()) {
		var Contacts = capContactResult.getOutput();
		for (yy in Contacts) {
			var contact = Contacts[yy].getCapContactModel();
			var contactType = contact.getContactType();
			if(contactType.toUpperCase().equals("LICENSE HOLDER") && contact.getRefContactNumber()) {
				return contact;
			}
		}
	}
}