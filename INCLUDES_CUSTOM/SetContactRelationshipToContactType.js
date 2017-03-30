function SetContactRelationshipToContactType(){
	if (matches(currentUserID,"ADMIN")) {
		showDebug = false;
		showMessage= false;
		}
	
	iCont = null;
	contactArray = new Array();
	contactArray = getContactArray();
	if (contactArray.length > 0) {
		for (iCont in contactArray){ 
			SetContactRelationshipToContactTypeLoop(contactArray,iCont);
		}
	}
}