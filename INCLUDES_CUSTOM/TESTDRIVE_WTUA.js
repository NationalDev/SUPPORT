function TESTDRIVE_WTUA(){
	if (appMatch("Building/Residential/Electrical/NA")  && wfTask.equals("Permit Issuance") && wfStatus.equals("Issued")) {
		scheduleInspection("Electrical Final",0,"TESTDRIVE");
		}
	
	if (appMatch("Licenses/Business/Retail/Application")  && wfTask.equals("Licensing Review") && wfStatus.equals("Approved for Issuance")) {
		scheduleInspection("Business License Inspection",0,"TESTDRIVE");
		}
}