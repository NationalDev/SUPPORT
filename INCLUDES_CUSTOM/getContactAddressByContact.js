/**
 * This function is used to get the Address of the Contact by Contact Name
 * @param contactModel
 * @param vAddressType
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function getContactAddressByContact(contactModel,vAddressType) {
	var xrefContactAddressBusiness = aa.proxyInvoker.newInstance("com.accela.aa.aamain.address.XRefContactAddressBusiness").getOutput();
	var contactAddressArray = xrefContactAddressBusiness.getContactAddressListByCapContact(contactModel);
	for(i=0;i<contactAddressArray.size();i++) {
		var contactAddress = contactAddressArray.get(i);
		if(vAddressType.equals(contactAddress.getAddressType())) {
			return contactAddress;
		}
	}
}