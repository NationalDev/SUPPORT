function linkRefContactWithRefLicProf(refContactSeq,refLicProfSeq,servProvCode,auditID)
{

if(refContactSeq&&refLicProfSeq&&servProvCode&&auditID)
{
var xRefContactEntity = aa.people.getXRefContactEntityModel().getOutput();
xRefContactEntity.setServiceProviderCode(servProvCode);
xRefContactEntity.setContactSeqNumber(refContactSeq);
xRefContactEntity.setEntityType("PROFESSIONAL");
xRefContactEntity.setEntityID1(refLicProfSeq);
var auditModel = xRefContactEntity.getAuditModel();
auditModel.setAuditDate(new Date());
auditModel.setAuditID(auditID);
auditModel.setAuditStatus("A")
xRefContactEntity.setAuditModel(auditModel);
var xRefContactEntityBusiness = aa.proxyInvoker.newInstance("com.accela.aa.aamain.people.XRefContactEntityBusiness").getOutput();
var existedModel = xRefContactEntityBusiness.getXRefContactEntityByUIX(xRefContactEntity);
if(existedModel.getContactSeqNumber())
{
//aa.print("The professional license have already linked to contact.");
logMessage("License professional link to reference contact successfully.");
}
else
{
var XRefContactEntityCreatedResult = xRefContactEntityBusiness.createXRefContactEntity(xRefContactEntity);
if (XRefContactEntityCreatedResult)
{
//aa.print("License professional link to reference contact successfully.");
logMessage("License professional link to reference contact successfully.");
}
else
{
//aa.print("**ERROR:License professional failed to link to reference contact.  Reason: " +  XRefContactEntityCreatedResult.getErrorMessage());
logMessage("**ERROR:License professional failed to link to reference contact.  Reason: " +  XRefContactEntityCreatedResult.getErrorMessage());
}
}
}
else
{
//aa.print("**ERROR:Some Parameters are empty");
logMessage("**ERROR:Some Parameters are empty");
}

}
