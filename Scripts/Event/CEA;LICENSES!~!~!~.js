/**
 * Event Name:- Contact Edit After
 * Event Description:- The after event for when a user edits a contact
 * MasterScript:- ContactEditAfterV3.0.js
 * Record Type:- CEA;LICENSES!~!~!~.js
 * 
 * Greg Soter, FutureNet Group, Inc.
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

if (matches(currentUserID,"ADMIN")) {
    showDebug = false;
    showMessage= false;
}
//branch("EMSE:SetContactRelationshipToContactType");
logDebug("Executing EMSE:SetContactRelationshipToContactType")
if (matches(currentUserID,"ADMIN")) {
    showDebug = false;
    showMessage= false;
}

iCont = null;
contactArray = new Array();
contactArray = getContactArray();
if (contactArray.length > 0) {
    for (iCont in contactArray) {
        //branch("EMSE:SetContactRelationshipToContactTypeLoop");
        logDebug("Executing EMSE:SetContactRelationshipToContactTypeLoop");
        showDebug=3;
        tContact = contactArray[iCont];
        aa.print("ContactName: " + tContact["firstName"] + " " + tContact["lastName"] + " " + tContact["contactType"]);
        contactSetRelation(tContact["contactSeqNumber"], tContact["contactType"]);
    }
}