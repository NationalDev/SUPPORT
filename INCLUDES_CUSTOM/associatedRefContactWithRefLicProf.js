function associatedRefContactWithRefLicProf(capIdStr,refLicProfSeq,servProvCode,auditID)
{
var contact = getLicenseHolderByLicenseNumber(capIdStr);
if(contact && contact.getRefContactNumber())
{
linkRefContactWithRefLicProf(parseInt(contact.getRefContactNumber()),refLicProfSeq,servProvCode,auditID)
}
else
{
logMessage("**ERROR:cannot find license holder of license");
}
}
