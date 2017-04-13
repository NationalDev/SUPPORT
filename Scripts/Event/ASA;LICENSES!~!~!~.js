/**
 * Deploy with the scriptcode and script title below (all caps)
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * MasterScript:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;LICENSES!~!~!~.js
 * 
 * Greg Soter, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//branch("EMSE:SetContactRelationshipToContactType");
logDebug("branch(EMSE:SetContactRelationshipToContactType)")
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
        logDebug("branch(EMSE:SetContactRelationshipToContactTypeLoop)");
        showDebug=3;
        tContact = contactArray[iCont];
        aa.print("ContactName: " + tContact["firstName"] + " " + tContact["lastName"] + " " + tContact["contactType"]);
        contactSetRelation(tContact["contactSeqNumber"], tContact["contactType"]);
    }
}

//branch("ASIUA:Licenses/*/*/License");
logDebug("branch(ASIUA:Licenses/*/*/License)")
editAppName(getAppSpecific("LIC Doing Business As (DBA) Name"));
copyParcelGisObjects();