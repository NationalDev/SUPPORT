//CTRCA;LICENSES!~!~!~.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//CTRCA:LICENSES/*/*/*

//branch("EMSE:SetContactRelationshipToContactType");
logDebug("Executing EMSE:SetContactRelationshipToContactType")
if (matches(currentUserID,"ADMIN")) {
    showDebug = true;
    showMessage= true;
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