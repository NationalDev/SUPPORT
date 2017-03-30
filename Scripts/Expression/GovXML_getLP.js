/*------------------------------------------------------------------------------------------------------/
| SVN $Id: External_LP_CA_EB_1_0.js   2010-01-05   john.schomp $
| Program : External_LP_CA_EB_1_0.js
|
| Usage   : Expression Builder Script that will validate a license and populate demographic fields.
|
| Client  : N/A
| Action# : N/A
|
| Notes   : Expression builder script to be used on Professional portlet.  Execute on LP::onPopulate
|           and/or LP::professionalModel:licensenbr for best results.   
|
|
|
/------------------------------------------------------------------------------------------------------*/


var msg = "";
var servProvCode=expression.getValue("$$servProvCode$$").value;
var returnMessage = "";
var stLicType
// get the EMSE biz object
var aa = expression.getScriptRoot();

// License Number that the user entered or selected
var licNum = expression.getValue("LP::professionalModel*licensenbr").value;
var licType = expression.getValue("LP::professionalModel*licensetype").value;
if (licType == "Elec Master") {
    stLicType = "Electrical Master";
}

// Rest of the license...

var expAddressLine1 = expression.getValue("LP::professionalModel*address1");
var expAddressLine2 = expression.getValue("LP::professionalModel*address2");
var expBusinessName = expression.getValue("LP::professionalModel*businessname");
var expCity = 		expression.getValue("LP::professionalModel*city");
var expPhone1 = expression.getValue("LP::professionalModel*phone1")
var expZip = expression.getValue("LP::professionalModel*zip")

var root = getMichLicProfXML(stLicType,licNum);

errorNode = aa.util.getValueFromXML("ErrorCode",root);
if (aa.util.parseInt(errorNode)) {
	expression.addMessage("LARA information returned an error for license " + licNum + " : " + getValueFromXML("ErrorMessage",root));
}
else if (!aa.util.getValueFromXML("Contacts",root)) {
    returnMessage = "No Professional found for the license type and number provided.";
}
else {
	var lpAddr1 = aa.util.getValueFromXML("addressLines",aa.util.getValueFromXML("String",root)).replace("<String></String>"," ");
	var lpCity = aa.util.getValueFromXML("town",root);
	var lpFirstName = aa.util.getValueFromXML("givenName",root);
	var lpLastName = aa.util.getValueFromXML("familyName",root);
    var lpBizName = aa.util.getValueFromXML("Organization",aa.util.getValueFromXML("name",root));
	var lpPhone = aa.util.getValueFromXML("String",aa.util.getValueFromXML("telephoneNumbers",root));
    var lpZip = aa.util.getValueFromXML("postalCode",root);

	


	expAddressLine1.value = lpAddr1;
	expBusinessName.value = lpBizName;
	expCity.value = lpCity;
	expPhone1.value = lpPhone;
  	expZip.value = lpZip;


  	expression.setReturn(expAddressLine1);
  	expression.setReturn(expAddressLine2);
  	expression.setReturn(expBusinessName);
  	expression.setReturn(expCity);
  	expression.setReturn(expPhone1);
  	expression.setReturn(expZip);


    
}
if (returnMessage.length > 0) {
		expression.addMessage("LARA report status: " + returnMessage);
	}