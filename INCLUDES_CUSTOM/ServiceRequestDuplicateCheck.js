function ServiceRequestDuplicateCheck(){
	if (matches(currentUserID,"ADMIN")) {
		showDebug = 3;
		showMessage= true;
		}
	
	iRec = null;
	recordArray = new Array();
	recordArray = capIdsGetByAddr();
	aa.print("Length: " + recordArray.length);
	if (recordArray.length > 0) {
		for(iRec in recordArray){
			ServiceRequestDuplicateCheckLoop(recordArray[iRec]);
		}
	}
}