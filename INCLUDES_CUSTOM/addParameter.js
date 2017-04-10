/**
 * This function is used as a part of Email Notification Template.
 * @param parameters
 * @param key
 * @param value
 * @returns 
 */

function addParameter(parameters, key, value) {
	
	//add parameter to a hashtable, for use with notifications.
	
	if (key != null) {
		if (value == null) {
			value = "";
		}
		parameters.put(key, value);
	}
}