function copyContactAddressToLicProf(contactAddress, licProf)
{
if(contactAddress&&licProf)
{
licProf.setAddress1(contactAddress.getAddressLine1());
licProf.setAddress2(contactAddress.getAddressLine2());
licProf.setAddress3(contactAddress.getAddressLine3());
licProf.setCity(contactAddress.getCity());
licProf.setState(contactAddress.getState());
licProf.setZip(contactAddress.getZip());
licProf.getLicenseModel().setCountryCode(contactAddress.getCountryCode());	 }
}