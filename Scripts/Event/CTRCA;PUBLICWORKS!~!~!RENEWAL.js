/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record.
 * 
 * Event Name:- Convert To Real CAP After
 * Event Description:- The after event for converting a partial record ID to a real record ID.
 * MasterScript:- ConvertToRealCAPAfterV3.0.js
 * Record Type:- CTRCA;PUBLICWORKS!~!~!RENEWAL.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

aa.runScriptInNewTransaction("ConvertToRealCapAfter4Renew");
//branch("EMSE:SetContactRelationshipToContactType");
if (matches(currentUserID,"ADMIN")) {
	showDebug = true;
    showMessage= true;
}

iCont = null;
contactArray = new Array();
contactArray = getContactArray();
if (contactArray.length > 0) {
    for (iCont in contactArray) {
        //branch("EMSE:SetContactRelationshipToContactTypeLoop");
        showDebug=3;
        tContact = contactArray[iCont];
        aa.print("ContactName: " + tContact["firstName"] + " " + tContact["lastName"] + " " + tContact["contactType"]);
        contactSetRelation(tContact["contactSeqNumber"], tContact["contactType"]);
    }
}
aa.cap.updateAccessByACA(capId,"Y");