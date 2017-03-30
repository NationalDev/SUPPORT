function changeCapContactTypes(origType, newType)
{
// Renames all contacts of type origType to contact type of newType and includes Contact Address objects
//
var vCapId = capId;
if (arguments.length == 3)
vCapId = arguments[2];

var capContactResult = aa.people.getCapContactByCapID(vCapId);
var renamed = 0;
if (capContactResult.getSuccess())
{
var Contacts = capContactResult.getOutput();
for (yy in Contacts)
{
var contact = Contacts[yy].getCapContactModel();

var people = contact.getPeople();
var contactType = people.getContactType();
aa.print("Contact Type " + contactType);

if(contactType==origType)
{

var contactNbr = people.getContactSeqNumber();
var editContact = aa.people.getCapContactByPK(vCapId, contactNbr).getOutput();
editContact.getCapContactModel().setContactType(newType)

aa.print("Set to: " + people.getContactType());
renamed ++ ;

var updContactResult = aa.people.editCapContact(editContact.getCapContactModel());
logDebug("contact " + updContactResult);
logDebug("contact.getSuccess() " + updContactResult.getSuccess());
logDebug("contact.getOutput() " + updContactResult.getOutput());
updContactResult.getOutput();
logDebug("Renamed contact from " + origType + " to " + newType);
}
}
}
else
{
logMessage("**ERROR: Failed to get contacts: " + capContactResult.getErrorMessage());
return false;
}
return renamed;
}

