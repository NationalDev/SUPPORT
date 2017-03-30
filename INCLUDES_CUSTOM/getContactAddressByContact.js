function getContactAddressByContact(contactModel,vAddressType)
{
var xrefContactAddressBusiness = aa.proxyInvoker.newInstance("com.accela.aa.aamain.address.XRefContactAddressBusiness").getOutput();
var contactAddressArray = xrefContactAddressBusiness.getContactAddressListByCapContact(contactModel);
for(i=0;i<contactAddressArray.size();i++)
{
var contactAddress = contactAddressArray.get(i);
if(vAddressType.equals(contactAddress.getAddressType()))
{
return contactAddress;
}
}
}