function getConatctAddreeByID(contactID, vAddressType)
{
var conArr = new Array();
var capContResult = aa.people.getCapContactByContactID(contactID);

if (capContResult.getSuccess())
{
conArr = capContResult.getOutput();
for(contact in conArr)
{
cont = conArr[contact];

return getContactAddressByContact(cont.getCapContactModel(),vAddressType);
}
}
}
