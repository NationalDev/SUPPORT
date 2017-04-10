/**
 * This function is used to count the number of Garage Sales in a particular city.
 * @param strnum
 * @param strname
 * @param city
 * @param state
 * @param zip
 * @param cfname
 * @param clname
 * @returns recordCnt
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function cntAssocGarageSales(strnum, strname, city, state, zip, cfname, clname) {
	/***
	
	Searches for Garage-Yard Sale License records
	- Created in the current year
	- Matches address parameters provided
	- Matches the contact first and last name provided
	- Returns the count of records
	
	***/
	
	// Create a cap model for search
	var searchCapModel = aa.cap.getCapModel().getOutput();
	
	// Set cap model for search. Set search criteria for record type DCA/*/*/*
	var searchCapModelType = searchCapModel.getCapType();
	searchCapModelType.setGroup("Licenses");
	searchCapModelType.setType("Garage-Yard Sale");
	searchCapModelType.setSubType("License");
	searchCapModelType.setCategory("NA");
	searchCapModel.setCapType(searchCapModelType);
	
	searchAddressModel = searchCapModel.getAddressModel();
	searchAddressModel.setStreetName(strname);
	
	gisObject = new com.accela.aa.xml.model.gis.GISObjects;
	qf = new com.accela.aa.util.QueryFormat;
	
	var toDate = aa.date.getCurrentDate();
	var fromDate = aa.date.parseDate("01/01/" + toDate.getYear());
	
	var recordCnt = 0;
	message = "The applicant has reached the Garage-Sale License limit of 3 per calendar year.<br>"
	
	capList = aa.cap.getCapListByCollection(searchCapModel, searchAddressModel, "", fromDate, toDate, qf, gisObject).getOutput();
	for (x in capList) {
		resultCap = capList[x];
		resultCapId = resultCap.getCapID();
		altId = resultCapId.getCustomID();
		//aa.print("Record ID: " + altId);
		resultCapIdScript = aa.cap.createCapIDScriptModel(resultCapId.getID1(),resultCapId.getID2(),resultCapId.getID3() );
		contact = aa.cap.getCapPrimaryContact(resultCapIdScript).getOutput();
		
		contactFname = contact.getFirstName();
		contactLname = contact.getLastName();
		
		if(contactFname==cfname && contactLname==clname) {
			recordCnt++;
			message = message + recordCnt + ": " + altId + " - " + contactFname + " " + contactLname + " @ " + strnum + " " + strname + "<br>";
		}
	}
	
	return recordCnt;
}
