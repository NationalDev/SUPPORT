//CTRCA;PUBLICWORKS!~!~!RENEWAL
//CTRCA:PUBLICWORKS/*/*/RENEWAL (Script Name)
//CTRCA:PublicWorks/*/*/Renewal (SC Name)
//Calls ConvertToRealCapAfter4Renew master script that updates license record with values from the renewal record. 
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