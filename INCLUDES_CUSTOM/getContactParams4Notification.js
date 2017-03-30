function getContactParams4Notification(params,pContact) {
	// Pass in a hashtable and it will add the additional parameters to the table.
	// Pass in contact to retrieve information from

		thisContact = pContact;
		conType = "contact";
		
		addParameter(params, "$$" + conType + "LastName$$", thisContact["lastName"]);
		addParameter(params, "$$" + conType + "FirstName$$", thisContact["firstName"]);
		addParameter(params, "$$" + conType + "MiddleName$$", thisContact["middleName"]);
		addParameter(params, "$$" + conType + "BusinesName$$", thisContact["businessName"]);
		addParameter(params, "$$" + conType + "ContactSeqNumber$$", thisContact["contactSeqNumber"]);
		addParameter(params, "$$" + conType + "$$", thisContact["contactType"]);
		addParameter(params, "$$" + conType + "Relation$$", thisContact["relation"]);
		addParameter(params, "$$" + conType + "Phone1$$", thisContact["phone1"]);
		addParameter(params, "$$" + conType + "Phone2$$", thisContact["phone2"]);
		addParameter(params, "$$" + conType + "Email$$", thisContact["email"]);
		addParameter(params, "$$" + conType + "AddressLine1$$", thisContact["addressLine1"]);
		addParameter(params, "$$" + conType + "AddressLine2$$", thisContact["addressLine2"]);
		addParameter(params, "$$" + conType + "City$$", thisContact["city"]);
		addParameter(params, "$$" + conType + "State$$", thisContact["state"]);
		addParameter(params, "$$" + conType + "Zip$$", thisContact["zip"]);
		addParameter(params, "$$" + conType + "Fax$$", thisContact["fax"]);
		addParameter(params, "$$" + conType + "Notes$$", thisContact["notes"]);
		addParameter(params, "$$" + conType + "Country$$", thisContact["country"]);
		addParameter(params, "$$" + conType + "FullName$$", thisContact["fullName"]);

	return params;	
}
