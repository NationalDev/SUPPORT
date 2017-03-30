function copyContactsWithAddress(pFromCapId, pToCapId)
{
// Copies all contacts from pFromCapId to pToCapId and includes Contact Address objects
//
if (pToCapId == null)
var vToCapId = capId;
else
var vToCapId = pToCapId;

var capContactResult = aa.people.getCapContactByCapID(pFromCapId);
var copied = 0;
if (capContactResult.getSuccess())
{
var Contacts = capContactResult.getOutput();
for (yy in Contacts)
{
var newContact = Contacts[yy].getCapContactModel();

var newPeople = newContact.getPeople();
// aa.print("Seq " + newPeople.getContactSeqNumber());

var addressList = aa.address.getContactAddressListByCapContact(newContact).getOutput();
newContact.setCapID(vToCapId);
aa.people.createCapContact(newContact);
newerPeople = newContact.getPeople();
// contact address copying
if (addressList)
{
for (add in addressList)
{
var transactionAddress = false;
contactAddressModel = addressList[add].getContactAddressModel();

logDebug("contactAddressModel.getEntityType():" + contactAddressModel.getEntityType());

if (contactAddressModel.getEntityType() == "CAP_CONTACT")
{
transactionAddress = true;
contactAddressModel.setEntityID(parseInt(newerPeople.getContactSeqNumber()));
}
// Commit if transaction contact address
if(transactionAddress)
{
var newPK = new com.accela.orm.model.address.ContactAddressPKModel();
contactAddressModel.setContactAddressPK(newPK);
aa.address.createCapContactAddress(vToCapId, contactAddressModel);
}
// Commit if reference contact address
else
{
// build model
var Xref = aa.address.createXRefContactAddressModel().getOutput();
Xref.setContactAddressModel(contactAddressModel);
Xref.setAddressID(addressList[add].getAddressID());
Xref.setEntityID(parseInt(newerPeople.getContactSeqNumber()));
Xref.setEntityType(contactAddressModel.getEntityType());
Xref.setCapID(vToCapId);
// commit address
commitAddress = aa.address.createXRefContactAddress(Xref.getXRefContactAddressModel());
if(commitAddress.getSuccess())
{
commitAddress.getOutput();
logDebug("Copied contact address");
}
}
}
}
// end if
copied ++ ;
logDebug("Copied contact from " + pFromCapId.getCustomID() + " to " + vToCapId.getCustomID());
}
}
else
{
logMessage("**ERROR: Failed to get contacts: " + capContactResult.getErrorMessage());
return false;
}
return copied;
}

