//CEA;LICENSES!~!~!~.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//CEA:LICENSES/*/*/*
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
    for (iCont in contactArray){
        //branch("EMSE:SetContactRelationshipToContactTypeLoop");
        logDebug("Executing EMSE:SetContactRelationshipToContactTypeLoop");
        showDebug=3;
        tContact = contactArray[iCont];
        aa.print("ContactName: " + tContact["firstName"] + " " + tContact["lastName"] + " " + tContact["contactType"]);
        contactSetRelation(tContact["contactSeqNumber"], tContact["contactType"]);
    }
}