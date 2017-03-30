/*------------------------------------------------------------------------------------------------------/
| Program : Cleanse Contact Address With Bing.js
| Event   : Contact Expression Onsubmit
|
| Usage   : An expression script that will use the Bing Maps REST API to cleanse an address on the contact portlet.
|
| Requires: Accela Automation 7.2FP4 or above, as it needs the updated JavaScript engine.
|			A Bing Maps API Key (see http://www.microsoft.com/maps/create-a-bing-maps-key.aspx)
|			Using a single address on the contact.   Multiple addresses would require a modification to this expression.
|
| Function: Passes the addressLine1, City, State, and Zip to the Bing API
|			Populates the cleansed values from the result
|
|           var bingKey = "&key=" + "ApLChHOyNH_1EhiLQsjlgoapuAnkZVAua666vqOjZctfVAcW4quwlMrkvplMQLrc";
[CONTACTADDR::addressLine1][CONTACTADDR::city][CONTACTADDR::state][CONTACTADDR::zip]
/------------------------------------------------------------------------------------------------------*/

var aa = expression.getScriptRoot();
//var addressLine1 = expression.getValue("ADDR::addressesModel*addressLine1");
var streetNbr = expression.getValue("ADDR::addressesModel*streetNbr");
var streetName = expression.getValue("ADDR::addressesModel*streetName");
var city = expression.getValue("ADDR::addressesModel*city");
var state = expression.getValue("ADDR::addressesModel*state");
var zip = expression.getValue("ADDR::addressesModel*zip");

try {
	var addr = "";
	if (streetNbr.getValue())
		addr += streetNbr.getValue();
    if (streetName.getValue())
		addr += streetName.getValue();
	if (city.getValue())
		addr += " " + city.getValue();
	if (state.getValue())
		addr += " " + state.getValue();
	if (zip.getValue())
		addr += " " + zip.getValue();

	addr = encodeURIComponent(addr.trim());
	var bingService = "http://dev.virtualearth.net/REST/v1/Locations?maxResults=1&q=";
	
	// obtain a key and paste here:
	var bingKey = "&key=" + "ApLChHOyNH_1EhiLQsjlgoapuAnkZVAua666vqOjZctfVAcW4quwlMrkvplMQLrc";

	var result = aa.httpClient.get(bingService + addr + bingKey)

		if (result.getSuccess()) {
			var j = JSON.parse(result.getOutput());

			if (j.resourceSets[0].resources.length > 0 && j.resourceSets[0].resources[0].address) {
				var v = j.resourceSets[0].resources[0].address; 
				//addressLine1.setValue(v.addressLine);
                streetNbr.setValue(v.streetNbr);
                streetName.setValue(v.streetName);
				city.setValue(v.locality);
				state.setValue(v.adminDistrict);
				zip.setValue(v.postalCode);

				//expression.setReturn(addressLine1);
                expression.setReturn(streetNbr);
                expression.setReturn(streetName);
				expression.setReturn(city);
				expression.setReturn(state);
				expression.setReturn(zip);
			}
		}
} catch (err) {
	// ignore the error
}
