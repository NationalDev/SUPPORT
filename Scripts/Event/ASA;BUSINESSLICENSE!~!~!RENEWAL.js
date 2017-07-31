//*********************************************************************************************************/
//	ASA;BUSINESSLICENSE!~!~!RENEWAL.js															       /	
//																			Iman Sallam @ City of Detroit  /
//		Deploy with the script code and script title below (all caps)									   /
//																								           /
//					ASA:BUSINESSLICENSE/*/*/RENEWAL							7/31/2017							 							
//																										   /
//*********************************************************************************************************/
//ASA:BUSINESSLICENSE/*/*/RENEWAL script

aa.runScript("APPLICATIONSUBMITAFTER4RENEW");
aa.cap.updateAccessByACA(capId,"Y");
//updateFee("LIC_030","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y");
//branch("EMSE:LicProfLookup:getLicenses");
var searchCap = capId;
var tmpId = capId;
var prjArr = null;
if (appMatch("*/*/*/License")) {
    var childArr = getChildren("*/*/*/Application");
    if(childArr != null) 
    	searchCap = childArr[0];
}

capId = tmpId;
var vRelationType = "R";
if(appMatch("*/*/*/Renewal")) 
	vRelationType = "Renewal";
var prjArrRes = aa.cap.getProjectByChildCapID(searchCap,vRelationType,null);
if(prjArrRes.getSuccess()) 
	prjArr = prjArrRes.getOutput();
if (prjArr != null) {
    for(prj in prjArr) 
    	if(appMatch("*/*/*/License",prjArr[prj].getProjectID())) 
    		licCapId = prjArr[prj].getProjectID();
}

if (licCapId == null && appMatch("*/*/*/License")) {
    licCapId = capId;
    //In the event license has no application;
}
if (licCapId == null && appMatch("*/*/*/Renewal")) {
    licCapId = capId;
    //In the event license has no application;
}
if (licCapId != null) {
    licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
}
expDate = aa.expiration.getLicensesByCapID(licCapId).getOutput().getB1Expiration().getExpDate();
now = aa.util.now();
tempDate = aa.util.formatDate(now, "MM/dd/YYYY");
today = aa.util.parseDate(tempDate);
today.after(expDate)?updateFee("LIC_040","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y"):now;