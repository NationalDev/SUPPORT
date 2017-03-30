function addParameter(parameters, key, value) {
	
	if (key != null) {
		if (value == null) {
			value = "";
		}
		parameters.put(key, value);
	}
}