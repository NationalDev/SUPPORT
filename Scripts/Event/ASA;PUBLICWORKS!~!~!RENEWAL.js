/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * MasterScript:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;PUBLICWORKS!~!~!RENEWAL.js
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

aa.runScript("APPLICATIONSUBMITAFTER4RENEW");
aa.cap.updateAccessByACA(capId,"Y");
//updateFee("LIC_030","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y");
//branch("EMSE:LicProfLookup:getLicenses");
var searchCap = capId;
var tmpId = capId;
var prjArr = null;
if (appMatch("*/*/*/Permit")) {
    var childArr = getChildren("*/*/*/Application");
    if(childArr != null) searchCap = childArr[0];
}
capId = tmpId;
var vRelationType = "R";
if(appMatch("*/*/*/Renewal")) {
    vRelationType="Renewal";
    logDebug("vRelationType = " + vRelationType);
}
var prjArrRes = aa.cap.getProjectByChildCapID(searchCap,vRelationType,null);
if(prjArrRes.getSuccess()) {
    prjArr = prjArrRes.getOutput();
    logDebug("getProjectByChildCapID success: prjArr = " +prjArr);
}
if (prjArr != null) {
    for(prj in prjArr) if(appMatch("*/*/*/Permit",prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
}
if (licCapId == null && appMatch("*/*/*/Permit")) {
    licCapId = capId;
    //In the event license has no application;
}
if (licCapId == null && appMatch("*/*/*/Renewal")) {
    licCapId = capId;
    //In the event license has no application;
}
if (licCapId != null) {
    licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
    logDebug("licCapId = " + licCapId);
}
expDate= aa.expiration.getLicensesByCapID(licCapId).getOutput().getB1Expiration().getExpDate();
now=aa.util.now();
tempDate=aa.util.formatDate(now, "MM/dd/YYYY");
today=aa.util.parseDate(tempDate);
//today.after(expDate)?updateFee("LIC_040","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y"):now;