/**
 * This function is used to get the Address of the Contact by ID
 * @param contactID
 * @param vAddressType
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function getConatctAddreeByID(contactID, vAddressType) {
	var conArr = new Array();
	var capContResult = aa.people.getCapContactByContactID(contactID);
	if (capContResult.getSuccess()) {
		conArr = capContResult.getOutput();
		for(contact in conArr) {
			cont = conArr[contact];
			return getContactAddressByContact(cont.getCapContactModel(),vAddressType);
		}
	}
}
