var aa = expression.getScriptRoot();
// API KEY FROM USPS
var id = "ENTER YOUR API KEY HERE";


var Address1 = expression.getValue("ADDR::addressesModel*addressLine1");
var Address2 = expression.getValue("ADDR::addressesModel*addressLine1");
var City = expression.getValue("ADDR::addressesModel*city");
var State = expression.getValue("ADDR::addressesModel*state");
var Zip = expression.getValue("ADDR::addressesModel*zip");
var Form = expression.getValue("ADDR::FORM");

var addr = {};
if (Address1.getValue() != "") addr.Address1 = Address1.getValue();
if (Address2.getValue() != "") addr.Address2 = Address2.getValue();
if (City.getValue() != "") addr.City = City.getValue();
if (State.getValue() != "") addr.State = State.getValue();
if (Zip.getValue() != "") addr.Zip5 = Zip.getValue().substr(0,5);

try {

	result = validateAddressUSPS(addr,id);
	
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
		if (result.Zip5) { 	Zip.value = String(result.Zip5 + "-" + result.Zip4); expression.setReturn(Zip); }
		
		//Form.message = "INFO: " + result.City;
		Form.blockSubmit = false;
		expression.setReturn(Form);
		}
		
} catch (err) {
		Form.message = "Javascript Error " + err.message;
		Form.blockSubmit = true;
		expression.setReturn(Form);
}


function validateAddressUSPS(addr,subscriberID) {
	
	var url = "http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML="
	var xml = <AddressValidateRequest><Address ID='1'><Address1></Address1><Address2></Address2><City></City><State></State><Zip5></Zip5><Zip4></Zip4></Address></AddressValidateRequest>

	if (!addr.Address1) { 
		addr.Warning = "No Address 1"
		return addr;
		}
		
	if (!((addr.State && addr.City) || (addr.Zip5))) {
		addr.Warning = "No State/City or Zip5 " + addr.State + "/" + addr.City + "/" + addr.Zip5;
		return addr;
		}
		
	// reversing address 1 and 2 per API
	xml.@USERID = subscriberID;
	xml.Address[0].Address2 = addr.Address1 ? addr.Address1 : "";
	xml.Address[0].Address1 = addr.Address2 ? addr.Address2 : "";
	xml.Address[0].City = addr.City ? addr.City : "";
	xml.Address[0].State = addr.State ? addr.State : "";
	xml.Address[0].Zip5 = addr.Zip5 ? addr.Zip5 : "";
	xml.Address[0].Zip4 = addr.Zip4 ? addr.Zip4 : "";

	
	var Parms = "API=Verify&XML=" + xml.toString();
	
	aa.print("parms: " + Parms);
	
	var rootNode = aa.util.httpPost(url,Parms).getOutput();

	r = new XML(rootNode.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>",""));
	
	var n = {};
	
	if (r.Error.length() > 0)  {
		n.Error = r.Error.Description;
		}
	if (r.Address[0].Error.length() > 0) {
		n.Error = r.Address[0].Error.Description;
		}
	else {
		n.Address1 = r.Address[0].Address2.length() > 0 ? r.Address[0].Address2 : "";
		n.Address2 = r.Address[0].Address1.length() > 0 ? r.Address[0].Address1 : "";
		n.City = r.Address[0].City.length() > 0 ? r.Address[0].City : "";
		n.State = r.Address[0].State.length() > 0 ? r.Address[0].State : "";
		n.Zip5 = r.Address[0].Zip5.length() > 0 ? r.Address[0].Zip5 : "";
		n.Zip4 = r.Address[0].Zip4.length() > 0 ? r.Address[0].Zip4 : "";
		n.Validated = true;
		}
		
	return (n);
	}
	