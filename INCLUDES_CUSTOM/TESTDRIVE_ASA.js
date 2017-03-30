function TESTDRIVE_ASA(){
	if (appMatch("Building/Residential/Electrical/NA")) {
		closeTask("Application Submittal","Accepted - Plan Review Req","Updated for Test Drive","");
		}
	
	if (appMatch("Building/Residential/Electrical/NA")) {
		closeTask("Plan Review","Approved","Updated for Test Drive","");
		}
}