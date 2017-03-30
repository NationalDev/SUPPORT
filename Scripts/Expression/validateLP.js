var aa = expression.getScriptRoot();
// API KEY FROM USPS
var id = "ENTER YOUR API KEY HERE";


var Address1 = expression.getValue("LP::professionalModel*address1");
var Address2 = expression.getValue("LP::professionalModel*address2");
var City = expression.getValue("LP::professionalModel*city");
var State = expression.getValue("LP::professionalModel*state");
var Zip = expression.getValue("LP::professionalModel*zip");
var Form = expression.getValue("LP::FORM");
var Type = lookup("LARA_LP_TYPE_LOOKUP",expression.getValue("LP::professionalModel*licensetype"));
var Nbr = expression.getValue("LP::professionalModel*licensenbr");

var addr = {};
if (Address1.getValue() != "") addr.Address1 = Address1.getValue();
if (Address2.getValue() != "") addr.Address2 = Address2.getValue();
if (City.getValue() != "") addr.City = City.getValue();
if (State.getValue() != "") addr.State = State.getValue();
if (Zip.getValue() != "") addr.Zip5 = Zip.getValue().substr(0,5);

try {

	result = validateAddressUSPS("Electrical Master","6200004");
	
	if (result.Error) {
		Form.message = "ERROR: " + result.Error;
		Form.blockSubmit = true;
		expression.setReturn(Form);
		}
	else {
		if (result.Address1) {	Address1.value = String(result.Address1); expression.setReturn(Address1); }
		if (result.Address2) {  Address2.value = String(result.Address2); expression.setReturn(Address2); }
		if (result.City) { 	City.value = String(result.City); expression.setReturn(City); }
		if (result.State) { State.value = String(result.State); expression.setReturn(State); }
		if (result.Zip5) { 	Zip.value = String(result.Zip5); expression.setReturn(Zip); }
		
        
		//Form.message = "INFO: " + result.City;
		Form.blockSubmit = false;
		expression.setReturn(Form);
		}
		
} catch (err) {
		Form.message = "Javascript Error " + err.message;
		Form.blockSubmit = true;
		expression.setReturn(Form);
}


function validateAddressUSPS(licType,licNum) {
	
	
	var rootNode = aa.util.getValueFromXML("GetLicensedProfessionalsResponse",getMichLicProfXML(licType, licNum));
    var personNode = aa.util.getValueFromXML("thePerson",getMichLicProfXML(licType,licNum));
	r = new XML("<GetLicensedProfessionalsResponse>" + rootNode + "</GetLicensedProfessionalsResponse>");
	p = new XML(personNode.replace(' xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"',''));
	var n = {};
	
	if (r.Error.ErrorCode != 0)  {
		n.Error = r.Error.ErrorMessage;
		}
	else {
		n.Address1 = p.addresses.PostalAddress.addresslines.String[0].length() > 0 ? p.addresses.PostalAddress.addresslines.String[0] : "";
		n.Address2 = p.addresses.PostalAddress.addresslines.String[1].length() > 0 ? p.addresses.PostalAddress.addresslines.String[1] : "";
		n.City = p.addresses.PostalAddress.town.length() > 0 ? p.addresses.PostalAddress.town : "";
		n.State = p.addresses.PostalAddress.region.length() > 0 ? p.addresses.PostalAddress.region : "";
		n.Zip5 = p.addresses.PostalAddress.postalCode.length() > 0 ? p.addresses.PostalAddress.postalCode : "";
		n.Zip4 = r.Address[0].Zip4.length() > 0 ? r.Address[0].Zip4 : "";
		n.Validated = true;
		}
		
	return (n);
	}
function getMichLicProfXML (licType, licNum) {
    // Test Parameters
    // var licType = "Carrier";
    // var licNum = "CAR123";
    
    var apiUrl = "http://127.0.0.1:3080/wireless/GovXMLServlet?"
    var xmlAuth = <GovXML xmlns="http://www.accela.com/schema/AccelaOpenSystemInterfaceXML"><AuthenticateUser><System><XMLVersion>GovXML-7.0.0</XMLVersion><ServiceProviderCode>LARA</ServiceProviderCode></System><Username>ACAREPORTS</Username><Password>acareports</Password></AuthenticateUser></GovXML>
    parms = "xmlin=" + xmlAuth.toString();
    result = aa.util.httpPost(apiUrl,parms);
    var appState = aa.util.getValueFromXML("ApplicationState",result.getOutput());
    
    var xmlLP = '<GovXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.accela.com/schema/AccelaOpenSystemInterfaceXML"><GetLicensedProfessionals><System><XMLVersion>720</XMLVersion><ServiceProviderCode>LARA</ServiceProviderCode><Username>ACAREPORTS</Username><MaxRows>10</MaxRows><StartRow>1</StartRow><EndRow>0</EndRow><TotalRows>0</TotalRows><ApplicationState>' + appState + '</ApplicationState><LanguageID>en-US</LanguageID></System><Person><roles xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"><ActorRole><role>userdefined</role></ActorRole></roles><addresses xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"><PostalAddress><addressLines/><postalCode/><town/><region/></PostalAddress><TelecomAddress><telephoneNumbers><String/><String/></telephoneNumbers><facsimileNumbers><String/></facsimileNumbers><electronicMailAddresses><String/></electronicMailAddresses></TelecomAddress></addresses><fullName xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"/></Person><License><licenseType>' + licType + '</licenseType><LicenseTypeId><Keys><Key>' + licType + '</Key></Keys></LicenseTypeId><licenseNumber>' + licNum + '</licenseNumber><issuedDate/><expirationDate/></License></GetLicensedProfessionals></GovXML>';
    var lpParms = "xmlin=" + xmlLP;
    lpResult = aa.util.httpPost(apiUrl,lpParms);
    return lpResult.getOutput();
}
	