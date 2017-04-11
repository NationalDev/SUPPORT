/**
 * This function is used to set ContactRelationship to ContactType using the Array.
 * @param contactArray
 * @param iCont
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function SetContactRelationshipToContactTypeLoop(contactArray,iCont) {
	showDebug=3;
	tContact = contactArray[iCont];
	aa.print("ContactName: " + tContact["firstName"] + " " + tContact["lastName"] + " " + tContact["contactType"]);
	contactSetRelation(tContact["contactSeqNumber"], tContact["contactType"]);
}