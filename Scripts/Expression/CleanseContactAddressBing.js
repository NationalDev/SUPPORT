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
/------------------------------------------------------------------------------------------------------*/

var aa = expression.getScriptRoot();
var addressLine1 = expression.getValue("CONTACT::contactsModel*addressLine1");
var city = expression.getValue("CONTACT::contactsModel*city");
var state = expression.getValue("CONTACT::contactsModel*state");
var zip = expression.getValue("CONTACT::contactsModel*zip");

try {
	var addr = "";
	if (addressLine1.getValue())
		addr += addressLine1.getValue();
	if (city.getValue())
		addr += " " + city.getValue();
	if (state.getValue())
		addr += " " + state.getValue();
	if (zip.getValue())
		addr += " " + zip.getValue();

	addr = encodeURIComponent(addr.trim());
	var bingService = "http://dev.virtualearth.net/REST/v1/Locations?maxResults=1&q=";
	
	// obtain a key and paste here:
	var bingKey = "&key=" + "AomsD0y-0CCMXhWgzA51hrwb6njm7k2Bh1_5BJlEw3X9GaafepJljh8MLjn7rgJ-";

	var result = aa.httpClient.get(bingService + addr + bingKey)

		if (result.getSuccess()) {
			var j = JSON.parse(result.getOutput());

			if (j.resourceSets[0].resources.length > 0 && j.resourceSets[0].resources[0].address) {
				var v = j.resourceSets[0].resources[0].address; 
				addressLine1.setValue(v.addressLine);
				city.setValue(v.locality);
				state.setValue(v.adminDistrict);
				zip.setValue(v.postalCode);

				expression.setReturn(addressLine1);
				expression.setReturn(city);
				expression.setReturn(state);
				expression.setReturn(zip);
			}
		}
} catch (err) {
	// ignore the error
}
