//*********************************************************************************************************/
//	AIUA;LICENSES!~!~!~.js																	               /
//																			Iman Sallam @ City of Detroit  /
//		Deploy with the script code and script title below (all caps)									   /
//																								           /
//					AIUA;LICENSES/*/*/*													                   / 							
//																	7/27/2017							   /
//*********************************************************************************************************/

//

//

//branch("EMSE:SetContactRelationshipToContactType");
//logDebug("branch(EMSE:SetContactRelationshipToContactType)")
//if (matches(currentUserID,"ADMIN")) {
    showDebug = true;
    showMessage= true;
//}
if capId <> null {
var parentRecordID = getParent();

copyAddresses(capId,parentRecordID);

logDebug("Record ID = " + parentRecordID ); 
logDebug("Street No = " + 'Street#' ); 
logDebug("Street Name = " + 'Street Name' ); 
logDebug("Street Type = " + 'Street Type' ); 
logDebug("Address Line 1 = " + 'Address Line 1' ); 
logDebug("Address Line 2 = " + 'Address Line 2' ); 
logDebug("City = " + City ); 
logDebug("Zip = " + Zip ); 

}



//iCont = null;
//contactArray = new Array();
//contactArray = getContactArray();
//if (contactArray.length > 0) {
//    for (iCont in contactArray){
//        //branch("EMSE:SetContactRelationshipToContactTypeLoop");
//        logDebug("branch(EMSE:SetContactRelationshipToContactTypeLoop)");
//        showDebug=3;
//        tContact = contactArray[iCont];
//        aa.print("ContactName: " + tContact["firstName"] + " " + tContact["lastName"] + " " + tContact["contactType"]);
//        contactSetRelation(tContact["contactSeqNumber"], tContact["contactType"]);
//    }
//}
//
////branch("ASIUA:Licenses/*/*/License");
//logDebug("branch(ASIUA:Licenses/*/*/License)")
//editAppName(getAppSpecific("LIC Doing Business As (DBA) Name"));
