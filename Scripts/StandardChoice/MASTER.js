ASA;Building!~!~!~^`;
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
if (matches(currentUserID,"PUBLICUSER122")) {
	branch("EMSE:TESTDRIVE_ASA");
	}

editAppSpecific("Application Expiration Date",dateAdd(fileDate,180));
`^
ASA;Enforcement!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
ASA;Enforcement!Incident!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:ComplaintDuplicateCheck");
`^
ASA;Licenses!~!~!~^`
branch("EMSE:SetContactRelationshipToContactType");
branch("ASIUA:Licenses/*/*/License");
`^
ASA;Licenses!~!~!Renewal^`
aa.runScript("APPLICATIONSUBMITAFTER4RENEW");
aa.cap.updateAccessByACA(capId,"Y");
`^
ASA;Licenses!Animal!Dog!~^`
isAppRenewal=false;
if (matches(appTypeArray[3], "Application","Renewal")) {
	isAppRenewal=true;
	}

if (isAppRenewal && publicUser) {
	branch("LIC Calculate Dog License Fees");
	}

if (matches(appTypeArray[3], "Application") && !publicUser) {
	branch("LIC Calculate Dog License Fees");
	}
`^
ASA;Licenses!Business!~!Application^`
updateFee("LIC_010","LIC_BUSINESS_GENERAL","FINAL",1,"Y");
updateFee("LIC_020","LIC_BUSINESS_GENERAL","FINAL",1,"Y");
`^
ASA;Licenses!Business!~!Renewal^`
updateFee("LIC_030","LIC_BUSINESS_GENERAL","FINAL",1,"Y");
branch("EMSE:LicProfLookup:getLicenses");
expDate = aa.expiration.getLicensesByCapID(licCapId).getOutput().getB1Expiration().getExpDate();
now=aa.util.now();
tempDate=aa.util.formatDate(now, "MM/dd/YYYY");
today=aa.util.parseDate(tempDate);
today.after(expDate)?updateFee("LIC_040","LIC_BUSINESS_GENERAL","FINAL",1,"Y"):now;
`^
ASA;Licenses!Contractor!~!Application^`
updateFee("LIC_010","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y");
updateFee("LIC_020","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y");
`^
ASA;Licenses!Contractor!~!Renewal^`
updateFee("LIC_030","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y");
branch("EMSE:LicProfLookup:getLicenses");
expDate= aa.expiration.getLicensesByCapID(licCapId).getOutput().getB1Expiration().getExpDate();
now=aa.util.now();
tempDate=aa.util.formatDate(now, "MM/dd/YYYY");
today=aa.util.parseDate(tempDate);
today.after(expDate)?updateFee("LIC_040","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y"):now;
`^
ASA;Licenses!Garage-Yard Sale!License!~^`
updateFee("LIC_010","LIC_SALE_GENERAL","FINAL",1,"Y");
`^
ASA;Planning!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
ASA;ServiceRequest!~!~!~^`
branch("EMSE:ServiceRequestDuplicateCheck");
branch("EMSE:SetContactRelationshipToContactType");
`^
ASB;Licenses!Garage-Yard Sale!License!NA^`
contFirstName = ApplicantFirstName;
contLastName = ApplicantLastName;
if (CurrentUserID.substr(0,10)=="PUBLICUSER") {
	contactList = aa.env.getValue("ContactList");
	contactArray = contactList.toArray();
	contFirstName = contactArray[0].getFirstName();
	contLastName = contactArray[0].getLastName();
	}

var cnv=0;
message="";
cnt = cntAssocGarageSales(AddressHouseNumber,AddressStreetName, AddressCity, AddressState, AddressZip,contFirstName,contLastName);
if (cnt >= 3) {
	showMessage = true;
	cancel=true;
	}
`^
ASIUA;Building!~!~!~^`
licEditExpInfo(null, AInfo['Permit Expiration Date']);
`^
ASIUA;Licenses!~!~!License^`
editAppName(AInfo['Doing Business As (DBA) Name']);
`^
ASUA;AMS!~!~!~^`
if (appStatus == "Complete") {
	completeCAP(currentUserID);
	}

if (appStatus == "Closed") {
	closeCap(currentUserID);
	}
`^
ASUA;AMS!Storm!Drain!Cleaning^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;AMS!Street!Light!Repair^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;AMS!Street!Segment!Repair^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;AMS!Street!Segment!Snow Removal^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;AMS!Water!Hydrant!Repair^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;Building!~!~!~^`
if (capStatus == "Withdrawn") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Withdrawn") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Withdrawn");
	}

if (capStatus == "Void") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Void") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Void");
	}
`^
ASUA;Enforcement!~!~!~^`
if (capStatus == "Withdrawn") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Withdrawn") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Withdrawn");
	}

if (capStatus == "Void") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Void") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Void");
	}
`^
ASUA;Licenses!~!~!~^`
if (capStatus == "Withdrawn") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Withdrawn") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Withdrawn");
	}

if (capStatus == "Void") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Void") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Void");
	}
`^
ASUA;Planning!~!~!~^`
if (capStatus == "Withdrawn") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Withdrawn") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Withdrawn");
	}

if (capStatus == "Void") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Void") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Void");
	}
`^
ASUA;ServiceRequest!~!~!~^`
if (capStatus == "Withdrawn") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Withdrawn") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Withdrawn");
	}

if (capStatus == "Void") {
	wfAsgnArray = new Array();
	wfAsgnArray = loadTasks(capId);
	}

if (capStatus == "Void") {
	for (x in wfAsgnArray) if (wfAsgnArray[x].active == "Y") setTask (x,"N","Y");
	taskCloseAllExcept("Void");
	}
`^
AdditionalInfoUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("AIUA:" + appTypeArray[0] + "/*/*/*");
branch("AIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("AIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("AIUA:" + appTypeString);
`^
AdditionalInfoUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("AIUB:" + appTypeArray[0] + "/*/*/*");
branch("AIUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("AIUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("AIUB:" + appTypeString);
`^
ApplicationConditionAddAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ACAA:" + appTypeArray[0] + "/*/*/*");
branch("ACAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ACAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ACAA:" + appTypeString);
`^
ApplicationSpecificInfoUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASIUA:" + appTypeArray[0] + "/*/*/*");
branch("ASIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASIUA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("ASIUA:" + appTypeString);
`^
ApplicationSpecificInfoUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASIUB:" + appTypeArray[0] + "/*/*/*");
branch("ASIUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASIUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASIUB:" + appTypeString);
`^
ApplicationStatusUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASUA:" + appTypeArray[0] + "/*/*/*");
branch("ASUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASUA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("ASUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("ASUA:" + appTypeString);
`^
ApplicationStatusUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASUB:" + appTypeArray[0] + "/*/*/*");
branch("ASUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASUB:" + appTypeString);
`^
ApplicationSubmitAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASA:" + appTypeArray[0] + "/*/*/*");
branch("ASA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("ASA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("ASA:" + appTypeString);
if (matches(currentUserID,"PUBLICUSER153")) {
	branch("EMSE:TESTDRIVE_ASA");
	}
`^
ApplicationSubmitBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASB:" + appTypeArray[0] + "/*/*/*");
branch("ASB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("ASB:" + appTypeString);
`^
BUSLIC_RENEWAL_CONFIG^`
if (License) {
	}

if (BusinessLicense) {
	}

if (300) {
	}

if (N) {
	}

if (N) {
	}

if (LICENSE ABOUT TO EXPIRE) {
	}

if (0) {
	}

if (About to Expire) {
	}

if (About to Expire) {
	}

if (Active) {
	}

if (CHECK WITH TONEE) {
	}

if (BUSLIC_RENEWAL) {
	}

if (3) {
	}
`^
CAA;Building!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CAA;Enforcement!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CAA;Licenses!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CAA;Planning!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CAA;ServiceRequest!~!~!~^`
branch("EMSE:SetContactRelationshipToContactType");
`^
CEA;Building!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CEA;Enforcement!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CEA;Licenses!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CEA;Planning!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CEA;ServiceRequest!~!~!~^`
branch("EMSE:SetContactRelationshipToContactType");
`^
CTRCA;Building!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CTRCA;Licenses!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
editAppName(AInfo['Doing Business As (DBA) Name']);
`^
CTRCA;Licenses!~!~!Renewal^`
aa.runScriptInNewTransaction("ConvertToRealCapAfter4Renew");
`^
CTRCA;Planning!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CTRCA;ServiceRequest!~!~!~^`
branch("EMSE:ServiceRequestDuplicateCheck");
branch("EMSE:SetContactRelationshipToContactType");
`^
ContactAddAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CAA:" + appTypeArray[0] + "/*/*/*");
branch("CAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CAA:" + appTypeString);
`^
ContactAddBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CAB:" + appTypeArray[0] + "/*/*/*");
branch("CAB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CAB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CAB:" + appTypeString);
`^
ContactEditAfter^`
showDebug = true;
showMessage= true;
branch("EMSE:GlobalFlags");
branch("CEA:" + appTypeArray[0] + "/*/*/*");
branch("CEA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CEA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CEA:" + appTypeString);
`^
ContactEditBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CEB:" + appTypeArray[0] + "/*/*/*");
branch("CEB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CEB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CEB:" + appTypeString);
`^
ContactRemoveAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CRA:" + appTypeArray[0] + "/*/*/*");
branch("CRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CRA:" + appTypeString);
`^
ContactRemoveBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CRB:" + appTypeArray[0] + "/*/*/*");
branch("CRB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CRB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CRB:" + appTypeString);
`^
ConvertToRealCapAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CTRCA:" + appTypeArray[0] + "/*/*/*");
branch("CTRCA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CTRCA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CTRCA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("CTRCA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("CTRCA:" + appTypeString);
`^
DocumentUploadAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("DUA:" + appTypeArray[0] + "/*/*/*");
branch("DUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("DUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("DUA:" + appTypeString);
`^
DocumentUploadBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("DUB:" + appTypeArray[0] + "/*/*/*");
branch("DUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("DUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("DUB:" + appTypeString);
`^
EMSE;ASI Copy Exceptions^`
if (Weight|Age) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (State License Expiration Date|Currently Bonded) {
	}

if (State License Expiration Date|Currently Bonded) {
	}

if (State License Expiration Date|Currently Bonded) {
	}

if (State License Expiration Date|Currently Bonded) {
	}
`^
EMSE;ComplaintDuplicateCheck^`
iRec = null;
recordArray = new Array();
recordArray = capIdsGetByAddr();
aa.print("Length: " + recordArray.length);
if (recordArray.length > 0) {
	for(iRec in recordArray) branch("EMSE:ComplaintDuplicateCheckLoop");
	}
`^
EMSE;ComplaintDuplicateCheckLoop^`
vApp = null;
vApp = recordArray[iRec];
vCap = aa.cap.getCap(vApp).getOutput();
vAppTypeString = vCap.getCapType().toString();
vFileDateObj = vCap.getFileDate();
bAppTypeMatch = false;
bASIMatch = false;
if (appMatch(vAppTypeString) && (vApp.equals(capId) == false)) {
	bAppTypeMatch = true;
	}

if (bAppTypeMatch) {
	sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"MM/DD/YYYY");
	}

if (bAppTypeMatch) {
	vFileDate = "" + vFileDateObj.getMonth() + "/" + vFileDateObj.getDayOfMonth() + "/" + vFileDateObj.getYear();
	}

if (bAppTypeMatch && dateDiff(vFileDate, sysDateMMDDYYYY) < 3) {
	updateAppStatus("Potential Duplicate","This is a potential duplicate of Record ID: " + vApp.getCustomID());
	createCapComment("This is a potential duplicate of Record ID: " + vApp.getCustomID());
	}
`^
EMSE;GlobalFlags^`
LICENSESTATE = "MI";
`^
EMSE;LicProfLookup^`
logDebug("Using LICENSESTATE = " + LICENSESTATE + " from EMSE:GlobalFlags");
//Issue State;
LICENSETYPE = "";
//License Type to be populated;
licCapId = null;
isNewLic = false;
licIDString = null;
licObj = null;
licCap = null;
branch("EMSE:LicProfLookup:getLicenses");
//Get License CAP;
if (licCapId !=null) {
	branch("EMSE:LicProfLookup:getLicenseType");
	stateLicense = getAppSpecific("State License Number",licCapId);
	}

licObj = licenseProfObject(stateLicense ,LICENSETYPE);
//Get LicArray;
if (!licObj.valid && lookup("LICENSED PROFESSIONAL TYPE",LICENSETYPE) != null) {
	branch("EMSE:LicProfLookup:CreateLP");
	licObj = licenseProfObject(stateLicense ,LICENSETYPE );
	}

if (licObj.valid) {
	branch("EMSE:LicProfLookup:UpdateLP");
	} else {
	logDebug("LP Not found to update");
	}
`^
EMSE;LicProfLookup;CreateLP^`
var vNewLic = aa.licenseScript.createLicenseScriptModel();
vNewLic.setAgencyCode(aa.getServiceProviderCode());
vNewLic.setAuditDate(sysDate);
vNewLic.setAuditID(currentUserID);
vNewLic.setAuditStatus("A");
vNewLic.setLicenseType(LICENSETYPE);
vNewLic.setLicState(LICENSESTATE);
vNewLic.setStateLicense(stateLicense);
aa.licenseScript.createRefLicenseProf(vNewLic);
var tmpLicObj = licenseProfObject(stateLicense,LICENSETYPE);
if (tmpLicObj.valid) {
	isNewLic = true;
	}

if (tmpLicObj.valid &&licIDString) {
	associatedRefContactWithRefLicProf(licCapId,licObj.refLicModel.getLicSeqNbr(), aa.getServiceProviderCode(),currentUserID);
	}

var mycap = aa.cap.getCap(capId).getOutput();
if (tmpLicObj.valid && mycap.getCapModel().getCreatedByACA() == 'Y') {
	associatedLicensedProfessionalWithPublicUser(licObj.refLicModel.getLicSeqNbr(), mycap.getCapModel().getCreatedBy().toString());
	}
`^
EMSE;LicProfLookup;UpdateLP^`
branch("EMSE:LicProfLookup:UpdateLP:BaseFields");
branch("EMSE:LicProfLookup:UpdateLP:ApplicationStatus");
if (licObj.updateRecord()) {
	logDebug("LP Updated Successfully");
	} else {
	logDebug("LP Update Failed");
	}
`^
EMSE;LicProfLookup;UpdateLP;ApplicationStatus^`
licObj.refLicModel.setBusinessName2(licCapStatus);
logDebug("Lic Cap Status: " + licCapStatus);
`^
EMSE;LicProfLookup;UpdateLP;BaseFields^`
licObj.refLicModel.setState(LICENSESTATE);
licObj.refLicModel.setLicenseBoard(LICENSETYPE);
licObj.refLicModel.setLicenseIssueDate(licCap.getFileDate());
var expObj = null;
var expDt = null;
var expObjRes = aa.expiration.getLicensesByCapID(licCapId);
if(expObjRes.getSuccess()) var expObj = expObjRes.getOutput();
if (expObj != null) {
	expDt = aa.date.parseDate(expObj.getExpDateString());
	}

if (expDt != null) {
	licObj.refLicModel.setBusinessLicExpDate(expDt);
	//Expiration Date;
	}

if (licCapTypeArr[1] == "Business") {
	licObj.refLicModel.setLicenseBoard(getAppSpecific("Business Type",licCapId));
	} else {
	licObj.refLicModel.setLicenseBoard(LICENSETYPE);
	}

if (licObj.updateFromRecordContactByType(licCapId,"",true,true);) {
	logDebug("LP Updated from Primary Contact");
	} else {
	logDebug("LP Failed to Update from Primary Contact trying License Holder");
	if(licObj.updateFromRecordContactByType(licCapId,"License Holder",true,true)) logDebug("Updated from License Holder");
	else logDebug("Couldn't Update Contact Info");
	}

if (getAppSpecific("Doing Business As (DBA) Name",licCapId)) {
	licObj.refLicModel.setBusinessName(getAppSpecific("Doing Business As (DBA) Name",licCapId) );
	}

if (getAppSpecific("State License Expiration Date",licCapId)) {
	var expDate = getAppSpecific("State License Expiration Date",licCapId);
	licObj.refLicModel.setLicenseExpirationDate(aa.date.parseDate(expDate));
	}

licObj.refLicModel.setBusinessLicense(licCap.getCapModel().getAltID());
logDebug("BaseFields setBusinessLicense =" +  licCap.getCapModel().getAltID());
`^
EMSE;LicProfLookup;getLicenseType^`
if (licCapId !=null) {
	licIDString = licCapId.getCustomID();
	}

if (licCapId !=null) {
	licCap = aa.cap.getCap(licCapId).getOutput();
	licCapType = licCap.getCapType().toString();
	licCapTypeArr = licCapType.split("/");
	licCapStatus = licCap.getCapStatus();
	}

if (licCapId !=null) {
	if(licCapTypeArr[1] == "Contractor") LICENSETYPE = getAppSpecific("License Type",licCapId)+"";
	}
`^
EMSE;LicProfLookup;getLicenses^`
var searchCap = capId;
var tmpId = capId;
var prjArr = null;
if (appMatch("*/*/*/License")) {
	var childArr = getChildren("*/*/*/Application");
	if(childArr != null) searchCap = childArr[0];
	}

capId = tmpId;
var vRelationType = "R";
if(appMatch("*/*/*/Renewal")) vRelationType="Renewal";
var prjArrRes = aa.cap.getProjectByChildCapID(searchCap,vRelationType,null);
if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
if (prjArr != null) {
	for(prj in prjArr) if(appMatch("*/*/*/License",prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
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
`^
EMSE;ServiceRequestCloseCase^`
if (capStatus == "Complete-Fixed") {
	updateAppStatus("Closed-Fixed");
	}

if (capStatus == "Complete-Duplicate") {
	updateAppStatus("Closed-Duplicate");
	}

if (capStatus == "Complete-Referred") {
	updateAppStatus("Closed-Referred");
	}

if (capStatus == "Complete-No Violation") {
	updateAppStatus("Closed-No Violation");
	}
`^
EMSE;ServiceRequestDuplicateCheck^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = 3;
	showMessage= true;
	}

iRec = null;
recordArray = new Array();
recordArray = capIdsGetByAddr();
aa.print("Length: " + recordArray.length);
if (recordArray.length > 0) {
	for(iRec in recordArray) branch("EMSE:ServiceRequestDuplicateCheckLoop");
	}
`^
EMSE;ServiceRequestDuplicateCheckLoop^`
vApp = null;
vApp = recordArray[iRec];
vCap = aa.cap.getCap(vApp).getOutput();
vAppTypeString = vCap.getCapType().toString();
vFileDateObj = vCap.getFileDate();
bAppTypeMatch = false;
bASIMatch = false;
if (appMatch(vAppTypeString) && (vApp.equals(capId) == false)) {
	bAppTypeMatch = true;
	}

if (bAppTypeMatch) {
	sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"MM/DD/YYYY");
	}

if (bAppTypeMatch) {
	vFileDate = "" + vFileDateObj.getMonth() + "/" + vFileDateObj.getDayOfMonth() + "/" + vFileDateObj.getYear();
	}

if (bAppTypeMatch && dateDiff(vFileDate, sysDateMMDDYYYY) < 3) {
	updateAppStatus("Potential Duplicate","This is a potential duplicate of Record ID: " + vApp.getCustomID());
	createCapComment("This is a potential duplicate of Record ID: " + vApp.getCustomID());
	}
`^
EMSE;SetContactRelationshipToContactType^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

iCont = null;
contactArray = new Array();
contactArray = getContactArray();
if (contactArray.length > 0) {
	for (iCont in contactArray) branch("EMSE:SetContactRelationshipToContactTypeLoop");
	}
`^
EMSE;SetContactRelationshipToContactTypeLoop^`
showDebug=3;
tContact = contactArray[iCont];
aa.print("ContactName: " + tContact["firstName"] + " " + tContact["lastName"] + " " + tContact["contactType"]);
contactSetRelation(tContact["contactSeqNumber"], tContact["contactType"]);
`^
EMSE;TESTDRIVE_ASA^`
if (appMatch("Building/Residential/Electrical/NA")) {
	closeTask("Application Submittal","Accepted - Plan Review Req","Updated for Test Drive","");
	}

if (appMatch("Building/Residential/Electrical/NA")) {
	closeTask("Plan Review","Approved","Updated for Test Drive","");
	}
`^
EMSE;TESTDRIVE_IRSA^`
if (appMatch("Building/Residential/Electrical/NA")  && inspType == "Electrical Final" && inspResult == "Passed") {
	closeTask("Meter Release","Meter Released","Updated by Inspection Result","Note");
	}

if (appMatch("Licenses/Business/Restaurant/Application")  && inspType == "Business License Inspection" && inspResult == "Passed") {
	closeTask("License Issuance","Issued","Updated by Inspection Result","Note");
	}
`^
EMSE;TESTDRIVE_ISA^`
showDebug = true;
showMessage= true;
if (appMatch("Enforcement/Incident/Abatement/Graffiti")  && inspType == "Initial Investigation") {
	scheduleInspectDate("Initial Investigation",dateAdd(null,1,true),"TESTDRIVE");
	}
`^
EMSE;TESTDRIVE_WTUA^`
if (appMatch("Building/Residential/Electrical/NA")  && wfTask.equals("Permit Issuance") && wfStatus.equals("Issued")) {
	scheduleInspection("Electrical Final",0,"TESTDRIVE");
	}

if (appMatch("Licenses/Business/Retail/Application")  && wfTask.equals("Licensing Review") && wfStatus.equals("Approved for Issuance")) {
	scheduleInspection("Business License Inspection",0,"TESTDRIVE");
	}
`^
FeeAssessAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("FAA:" + appTypeArray[0] + "/*/*/*");
branch("FAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("FAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("FAA:" + appTypeString);
`^
FeeEstimateAfter4ACA^`
showDebug = 3;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("FEA:" + appTypeArray[0] + "/*/*/*");
branch("FEA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("FEA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("FEA:" + appTypeString);
branch("ApplicationSubmitAfter");
`^
IRSA;Building!~!~!~^`
showDebug = false;
showMessage = true;
if (inspType == "Building Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Electrical Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Plumbing Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Mechanical Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Sign Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Roof Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Fence Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Grading Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Solar Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete", "Updated by Inspection Result","Note");
	}

if (inspType == "Building Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Electrical Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Plumbing Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Mechanical Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Sign Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Roof Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Fence Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Grading Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Solar Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}
`^
IRSA;Enforcement!~!~!~^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (inspType == "Initial Investigation" && inspResult == "Compliant") {
	branchTask("Initial Investigation","No Violation","Updated by Inspection Result","Note");
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","No Violation Found","","");
	capId = holdCapId;
	'];
	}

if (inspType == "Initial Investigation" && inspResult == "In Violation") {
	closeTask("Initial Investigation","In Violation","Updated by Inspection Result","Note");
	}

if (inspType == "Initial Investigation" && inspResult == "Citation") {
	loopTask("Initial Investigation","Recommend Citation","Updated by Inspection Result","Note");
	}

if (inspType == "Follow-Up Investigation" && inspResult == "Compliant") {
	branchTask("Follow-Up Investigation","Violation Corrected","Updated by Inspection Result","Note");
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (inspType == "Follow-Up Investigation" && inspResult == "Citation") {
	closeTask("Follow-Up Investigation","Recommend Citation","Updated by Inspection Result","Note");
	}

if (inspType == "Follow-Up Investigation" && inspResult == "Abated") {
	branchTask("Follow-Up Investigation","Violation Abated","Updated by Inspection Result","Note");
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (inspType == "Initial Investigation" && inspResult == "Compliant") {
	updateTask("Incident Status","No Violation","Updated by Inspection Result","Note");
	closeTask("Incident Status","Closed","","");
	}

if (inspType == "Initial Investigation" && inspResult == "In Violation") {
	updateTask("Incident Status","In Violation","Updated by Inspection Result","Note");
	}

if (inspType == "Initial Investigation" && inspResult == "Citation") {
	updateTask("Incident Status","Citation Issued","Updated by Inspection Result","Note");
	}

if (inspType == "Follow-Up Investigation" && inspResult == "Compliant") {
	updateTask("Incident Status","Violation Corrected","Updated by Inspection Result","Note");
	closeTask("Incident Status","Closed","","");
	}

if (inspType == "Follow-Up Investigation" && inspResult == "Citation") {
	updateTask("Incident Status","Citation Issued","Updated by Inspection Result","Note");
	}

if (inspType == "Follow-Up Investigation" && inspResult == "Abated") {
	updateTask("Incident Status","Violation Abated","Updated by Inspection Result","Note");
	closeTask("Incident Status","Closed","","");
	}
`^
IRSA;Licenses!Business!~!~^`
showDebug = false;
showMessage = true;
if (inspType == "License Inspection" && inspResult == "Passed") {
	closeTask("Inspection","Inspection Passed","Updated by Inspection Result","Note");
	}

if (inspType == "License Inspection" && inspResult == "Failed") {
	closeTask("Inspection","Inspection Failed","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Streets and Sidewalks!Pothole!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Segment";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Streets and Sidewalks!Snow Removal!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Segment";
	newAppL4 = "Snow Removal";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Streets and Sidewalks!Street Flooding!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Storm";
	newAppL3 = "Drain";
	newAppL4 = "Cleaning";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Streets and Sidewalks!Street Light!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Light";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Water and Sewage!Leaking Fire Hydrant!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Water";
	newAppL3 = "Hydrant";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
ISA;Building!~!~!~^`
latestScheduledDate=getLatestScheduledDate();
expirationdate= aa.util.dateDiff(latestScheduledDate, "DAY", 180);
newdate=aa.util.formatDate(expirationdate, "MM/dd/YYYY");
useAppSpecificGroupName=true;
editAppSpecific("PERMIT DATES.Permit Expiration Date", newdate);
`^
InspectionResultModifyAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("IRMA:" + appTypeArray[0] + "/*/*/*");
branch("IRMA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IRMA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IRMA:" + appTypeString);
`^
InspectionResultModifyBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("IRMB:" + appTypeArray[0] + "/*/*/*");
branch("IRMB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IRMB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IRMB:" + appTypeString);
`^
InspectionResultSubmitAfter^`
showDebug = false;
showMessage= true;
branch("EMSE:GlobalFlags");
branch("IRSA:" + appTypeArray[0] + "/*/*/*");
branch("IRSA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IRSA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IRSA:" + appTypeString);
`^
InspectionResultSubmitBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("IRSB:" + appTypeArray[0] + "/*/*/*");
branch("IRSB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IRSB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IRSB:" + appTypeString);
`^
InspectionScheduleAfter^`
showDebug = true;
showMessage= true;
branch("EMSE:GlobalFlags");
branch("ISA:" + appTypeArray[0] + "/*/*/*");
branch("ISA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ISA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ISA:" + appTypeString);
if (matches(currentUserID,"TESTDRIVE")) {
	branch("EMSE:TESTDRIVE_ISA");
	}
`^
InspectionScheduleBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ISB:" + appTypeArray[0] + "/*/*/*");
branch("ISB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ISB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ISB:" + appTypeString);
`^
InvoiceFeeAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("IFA:" + appTypeArray[0] + "/*/*/*");
branch("IFA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IFA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IFA:" + appTypeString);
`^
LIC Calculate Dog License Fees^`
if (matches(String(AInfo['Service Dog']),"Yes")) {
	addFee("LIC_095","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==1 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_010","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==2 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_015","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==3 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_020","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==1 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_025","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==2 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_030","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==3 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_035","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==1 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_040","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==2 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_045","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==3 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_050","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==1 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_055","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==2 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_060","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==3 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_065","LIC_PET_GENERAL","FINAL",1,"N");
	}
`^
LIC Establish Links to Reference Contacts^`
iArr = new Array();
// attributes to ignore;
contactTypeArray = new Array("Applicant","Business Owner","Corporate Officer","Director","Manager","Officer","Partner","President","Respondent","Shareholder");
if (!feeEstimate) {
	createRefContactsFromCapContactsAndLink(capId,contactTypeArray,iArr,false,false,comparePeopleGeneric);
	}
`^
LIC Issue Animal License^`
var licenseDuration= AInfo['License Duration'];
var vaccExpirationDate= AInfo['Vaccination Expiration Date'];
vaccinationExpirationDate=aa.util.parseDate(vaccExpirationDate);
newLic = null;
newLicId = null;
newLicIdString = null;
newLicenseType = "Animal";
monthsToInitialExpire = licenseDuration*12;
newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
// create the license record;
if (newLicId) {
	newLicIdString = newLicId.getCustomID();
	updateAppStatus("Active","Originally Issued",newLicId);
	editAppName(AInfo['Pet Name'],newLicId);
	var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
	var ignoreArr = new Array();
	if(ignore != null) ignoreArr = ignore.split("|");
	copyAppSpecific(newLicId,ignoreArr);
	}

tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
tmpNewDateTodateAdd=dateAdd(tmpNewDate,0);
dateAdds=aa.util.parseDate(tmpNewDateTodateAdd+"");
var temp = vaccinationExpirationDate.after(dateAdds)?dateAdds:vaccinationExpirationDate;
newTemp=aa.util.formatDate(temp, "MM/dd/YYYY");
if (newLicId) {
	thisLic = new licenseObject(newLicIdString,newLicId);
	thisLic.setExpiration(newTemp);
	thisLic.setStatus("Active");
	}

if (newLicId) {
	changeCapContactTypes("Pet Owner","License Holder", newLicId);
	}

if (newLicId) {
	copyOwner(capId, newLicId);
	}

if (newLicId) {
	copyASITables(capId,newLicId);
	}
`^
LIC Issue Business License^`
newLic = null;
newLicId = null;
newLicIdString = null;
newLicenseType = "Business";
monthsToInitialExpire = 12;
newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
// create the license record;
if (newLicId) {
	newLicIdString = newLicId.getCustomID();
	updateAppStatus("Active","Originally Issued",newLicId);
	//editAppName(AInfo['Doing Business As (DBA) Name'],newLicId);
	}

appName = getAppName(capId);
editAppName(appName,newLicId);
//line added by CIH 03012016;
var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
var ignoreArr = new Array();
if(ignore != null) ignoreArr = ignore.split("|");
copyAppSpecific(newLicId,ignoreArr);
tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
if (newLicId) {
	thisLic = new licenseObject(newLicIdString,newLicId);
	thisLic.setExpiration(dateAdd(tmpNewDate,0));
	thisLic.setStatus("Active");
	}

if (newLicId) {
	changeCapContactTypes("Applicant","License Holder", newLicId);
	}

if (newLicId) {
	copyOwner(capId, newLicId);
	}

if (newLicId) {
	copyASITables(capId,newLicId);
	}
`^
LIC Issue Event License^`
newLic = null;
newLicId = null;
newLicIdString = null;
newLicenseType = "Event";
monthsToInitialExpire = 12;
newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
// create the license record;
if (newLicId) {
	newLicIdString = newLicId.getCustomID();
	updateAppStatus("Active","Originally Issued",newLicId);
	editAppName(AInfo['Event Title'],newLicId);
	var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
	var ignoreArr = new Array();
	if(ignore != null) ignoreArr = ignore.split("|");
	copyAppSpecific(newLicId,ignoreArr);
	}

tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
if (newLicId) {
	thisLic = new licenseObject(newLicIdString,newLicId);
	thisLic.setExpiration(dateAdd(tmpNewDate,0));
	thisLic.setStatus("Active");
	}

if (newLicId) {
	changeCapContactTypes("Applicant","License Holder", newLicId);
	}

if (newLicId) {
	copyOwner(capId, newLicId);
	}

if (newLicId) {
	copyASITables(capId,newLicId);
	}
`^
LIC Renewal Animal License^`
var licenseDuration= AInfo['License Duration'];
var vaccExpirationDate= AInfo['Vaccination Expiration Date'];
vaccinationExpirationDate=aa.util.parseDate(vaccExpirationDate);
monthsToInitialExpire = licenseDuration*12-12;
var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
var ignoreArr = new Array();
if(ignore != null) ignoreArr = ignore.split("|");
copyAppSpecific(licCapId,ignoreArr);
expResult = aa.expiration.getLicensesByCapID(licCapId).getOutput().getExpDate();
expDate  = expResult.getMonth() + "/" + expResult.getDayOfMonth() + "/" + expResult.getYear();
tmpNewDate = dateAddMonths(expDate, monthsToInitialExpire);
tmpNewDateTodateAdd=dateAdd(tmpNewDate,0);
dateAdds=aa.util.parseDate(tmpNewDateTodateAdd+"");
var temp = vaccinationExpirationDate.after(dateAdds)?dateAdds:vaccinationExpirationDate;
newTemp=aa.util.formatDate(temp, "MM/dd/YYYY");
if (licCapId) {
	thisLic = new licenseObject(licIDString,licCapId);
	thisLic.setExpiration(newTemp);
	thisLic.setStatus("Active");
	}

if (licCapId) {
	changeCapContactTypes("Applicant","License Holder", licCapId);
	}

if (licCapId) {
	copyOwner(capId, licCapId);
	}

if (licCapId) {
	copyASITables(capId,licCapId);
	}
`^
LIC_EXPIRE_CONFIG^`
if (License) {
	}

if (Licenses) {
	}

if (300) {
	}

if (N) {
	}

if (N) {
	}

if (EXPIRED LICENSE) {
	}

if (0) {
	}

if (Expired) {
	}

if (Expired) {
	}

if (About to Expire) {
	}

if (License Holder) {
	}

if (LIC_EXPIRE) {
	}

if (3) {
	}
`^
LIC_RENEWAL_CONFIG^`
if (License) {
	}

if (Licenses) {
	}

if (300) {
	}

if (N) {
	}

if (N) {
	}

if (LICENSE ABOUT TO EXPIRE) {
	}

if (0) {
	}

if (About to Expire) {
	}

if (Active) {
	}

if (License Holder) {
	}

if (LIC_RENEWAL) {
	}

if (3) {
	}
`^
LicProfLookupSubmitAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("LPLSA:" + appTypeArray[0] + "/*/*/*");
branch("LPLSA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("LPLSA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("LPLSA:" + appTypeString);
`^
LicProfLookupSubmitBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("LPLSB:" + appTypeArray[0] + "/*/*/*");
branch("LPLSB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("LPLSB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("LPLSB:" + appTypeString);
`^
LicProfUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("LPUA:" + appTypeArray[0] + "/*/*/*");
branch("LPUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("LPUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("LPUA:" + appTypeString);
`^
LicProfUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("LPUB:" + appTypeArray[0] + "/*/*/*");
branch("LPUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("LPUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("LPUB:" + appTypeString);
`^
PRA;Licenses!~!~!Renewal^`
if (balanceDue <= 0 && isTaskActive("Renewal Intake")) {
	closeTask("Renewal Intake","Fees Paid","updated via script",null);
	}

branch("ASIUA:Licenses/*/*/License");
`^
PRA;Licenses!Animal!~!Renewal^`
aa.runScriptInNewTransaction("PaymentReceiveAfter4Renew");
branch("EMSE:LicProfLookup");
var licenseDuration= AInfo['License Duration'];
var vaccExpirationDate= AInfo['Vaccination Expiration Date'];
vaccinationExpirationDate=aa.util.parseDate(vaccExpirationDate);
monthsToInitialExpire = licenseDuration*12-12;
var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
var ignoreArr = new Array();
if(ignore != null) ignoreArr = ignore.split("|");
copyAppSpecific(licCapId,ignoreArr);
editAppName(AInfo["Pet Name"],licCapId);
expResult = aa.expiration.getLicensesByCapID(licCapId).getOutput().getB1Expiration().getExpDate();
tmpNewDate = dateAddMonths(expResult, monthsToInitialExpire);
tmpNewDateTodateAdd=dateAdd(tmpNewDate,0);
dateAdds=aa.util.parseDate(tmpNewDateTodateAdd+"");
var temp = vaccinationExpirationDate.after(dateAdds)?dateAdds:vaccinationExpirationDate;
newTemp=aa.util.formatDate(temp, "MM/dd/YYYY");
if (licCapId !=null) {
	licIDString = licCapId.getCustomID();
	}

if (licCapId) {
	thisLic = new licenseObject(licIDString,licCapId);
	thisLic.setExpiration(newTemp);
	thisLic.setStatus("Active");
	}

if (licCapId) {
	changeCapContactTypes("Applicant","License Holder", licCapId);
	}

if (licCapId) {
	copyOwner(capId, licCapId);
	}

if (licCapId) {
	copyASITables(capId,licCapId);
	}
`^
PRA;Licenses!Business!~!Renewal^`
aa.runScriptInNewTransaction("PaymentReceiveAfter4Renew");
branch("EMSE:LicProfLookup");
editAppName(AInfo['Doing Business As (DBA) Name']);
`^
PRA;Licenses!Contractor!~!Renewal^`
aa.runScriptInNewTransaction("PaymentReceiveAfter4Renew");
branch("EMSE:LicProfLookup");
editAppName(AInfo['Doing Business As (DBA) Name']);
`^
ParcelAddAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("PAA:" + appTypeArray[0] + "/*/*/*");
branch("PAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("PAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("PAA:" + appTypeString);
`^
ParcelUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("PUA:" + appTypeArray[0] + "/*/*/*");
branch("PUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("PUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("PUA:" + appTypeString);
`^
PaymentReceiveAfter^`
showDebug = true;
showMessage= true;
branch("EMSE:GlobalFlags");
branch("PRA:" + appTypeArray[0] + "/*/*/*");
branch("PRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("PRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
if (aa.env.getValue("isBizFireEMSE") != "YES" || currentUserID.startsWith("PUBLICUSER")) {
	branch("PRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
	}

branch("PRA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("PRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3]);
branch("PRA:" + appTypeString);
`^
PaymentReceiveBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("PRB:" + appTypeArray[0] + "/*/*/*");
branch("PRB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("PRB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("PRB:" + appTypeString);
`^
RenewalInfoUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("RIUA:" + appTypeArray[0] + "/*/*/*");
branch("RIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("RIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("RIUA:" + appTypeString);
`^
SR Create Child AMS Cases^`
newAppId = createChild(newAppL1,newAppL2,newAppL3,newAppL4,newAppDesc);
updateAppStatus("Open","Updated by Script",newAppId);
aa.cap.copyCapWorkDesInfo(capId, newAppId);
`^
SR Create Child Cases^`
newAppId = createChild(newAppL1,newAppL2,newAppL3,newAppL4,newAppDesc);
if (newAppId) {
	copyAppSpecific(newAppId);
	updateAppStatus("Investigation Pending","Updated by Script",newAppId);
	holdCapId = capId;
	capId = newAppId;
	closeTask("Case Intake","Assigned","","");
	updateTask("Incident Status","Assigned","","");
	scheduleInspectDate("Initial Investigation",dateAdd(null,1,true));
	capId = holdCapId;
	aa.cap.copyCapWorkDesInfo(capId, newAppId);
	editPriority(AInfo['Priority'],newAppId);
	copyOwner(capId, newAppId);
	}
`^
WTUA;Building!~!~!~^`
if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
	editAppSpecific("Permit Issued Date", sysDateMMDDYYYY);
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
	editAppSpecific("Permit Expiration Date", dateAdd(null,180));
	}

if (wfTask == "Permit Status" && wfStatus == "Permit Issued") {
	editAppSpecific("Permit Issued Date", sysDateMMDDYYYY);
	}

if (wfTask == "Permit Status" && wfStatus == "Permit Issued") {
	editAppSpecific("Permit Expiration Date", dateAdd(null,180));
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
	licEditExpInfo(null,AInfo['Permit Expiration Date']);
	}

if (wfTask == "Permit Status" && wfStatus == "Permit Issued") {
	licEditExpInfo(null,AInfo['Permit Expiration Date']);
	}
`^
WTUA;Enforcement!Incident!~!~^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (wfTask == "Initial Investigation" && wfStatus == "No Violation") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","No Violation Found","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Follow-Up Investigation" && wfStatus == "Violation Corrected") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Follow-Up Investigation" && wfStatus == "Violation Abated") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Issue Citation" && wfStatus == "Violation Corrected") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Issue Citation" && wfStatus == "Violation Abated") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Route to Legal" && wfStatus == "Decision Made") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Legal Decision","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Route to Legal" && wfStatus == "Violation Abated") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "No Violation") {
	closeTask("Incident Status","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","No Violation Found","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "Violation Corrected") {
	closeTask("Incident Status","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "Violation Abated") {
	closeTask("Incident Status","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "Duplicate") {
	closeTask("Incident Status","Duplicate","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Duplicate","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "Referred") {
	closeTask("Incident Status","Referred","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Referred","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
WTUA;Licenses!~!~!Application^`
if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Establish Links to Reference Contacts");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Issue Business License");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("EMSE:LicProfLookup");
	}
`^
WTUA;Licenses!~!~!Renewal^`
if (wfTask == "License Issuance" && wfStatus == "Renewed") {
	aa.runScriptInNewTransaction("WorkflowTaskUpdateAfter4Renew");
	}

if (wfTask == "License Issuance" && wfStatus == "Renewed") {
	branch("EMSE:LicProfLookup");
	}

if (wfTask == "Registration Renewal" && wfStatus == "Renewed") {
	aa.runScriptInNewTransaction("WorkflowTaskUpdateAfter4Renew");
	}
`^
WTUA;Licenses!Animal!~!Application^`
if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Establish Links to Reference Contacts");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Issue Animal License");
	}
`^
WTUA;Licenses!Animal!~!Renewal^`
if (wfTask == "Renewal Status" && wfStatus == "Approved") {
	aa.runScriptInNewTransaction("WorkflowTaskUpdateAfter4Renew");
	}
`^
WTUA;Licenses!Business!~!Application^`
if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Establish Links to Reference Contacts");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Issue Business License");
	}
`^
WTUA;Licenses!Event!~!Application^`
if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Establish Links to Reference Contacts");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Issue Event License");
	}
`^
WTUA;ServiceRequest!~!~!~^`
if (wfTask == "SR Intake" && wfStatus == "Duplicate") {
	closeTask("Final Notification","Notification Sent"), branch("EMSE:ServiceRequestCloseCase");
	}

if (wfTask == "SR Intake" && wfStatus == "Referred") {
	closeTask("Final Notification","Notification Sent"), branch("EMSE:ServiceRequestCloseCase");
	}

if (wfTask == "Final Notification" && wfStatus == "Send Email") {
	branch("EMSE:ServiceRequestCloseCase");
	}

if (wfTask == "Final Notification" && wfStatus == "No Notification Sent") {
	branch("EMSE:ServiceRequestCloseCase");
	}
`^
WTUA;ServiceRequest!Animals!Animal Nuisance!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Animal Nuisance";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Fence Dispute!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Zoning";
	newAppL4 = "Fence Dispute";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Grading!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Building";
	newAppL4 = "Grading";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Home Occupation!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Zoning";
	newAppL4 = "Home Occupation";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Illegal Occupancy!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Building";
	newAppL4 = "Illegal Occupancy";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Junk on Property!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Health and Safety";
	newAppL4 = "Junk";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Sub-Standard Property!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Building";
	newAppL4 = "Sub-Standard Property";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Vacant Building!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Health and Safety";
	newAppL4 = "Vacant Building";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Working Without Permit!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Building";
	newAppL4 = "Working Without Permit";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Garbage!Trash Removal!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Health and Safety";
	newAppL4 = "Garbage Service";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Graffiti!Graffiti!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Graffiti";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Noise!Excessive Noise!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Noise Nuisance";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Signage!Illegal Sign!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Zoning";
	newAppL4 = "Illegal Sign";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Streets and Sidewalks!Pothole!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Segment";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUA;ServiceRequest!Streets and Sidewalks!Snow Removal!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Segment";
	newAppL4 = "Snow Removal";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUA;ServiceRequest!Streets and Sidewalks!Street Flooding!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Storm";
	newAppL3 = "Drain";
	newAppL4 = "Cleaning";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUA;ServiceRequest!Streets and Sidewalks!Street Light!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Light";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUA;ServiceRequest!Trees and Weeds!Tall Grass and Weeds!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Weeds";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Trees and Weeds!Tree Maintenance!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Trees";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Vehicles!Abandoned Vehicle!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Abandoned Vehicle";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Water and Sewage!Leaking Fire Hydrant!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Water";
	newAppL3 = "Hydrant";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUB;Building!~!~!~^`
if (wfTask == "Permit Issuance" && wfStatus == "Issued" && balanceDue > 0) {
	showMessage = true;
	cancel = true;
	comment("Cannot issue this permit with a balance greater than zero");
	}

if (wfTask == "Permit Status" && wfStatus == "Permit Issued" && balanceDue > 0) {
	showMessage = true;
	cancel = true;
	comment("Cannot issue this permit with a balance greater than zero");
	}
`^
WTUB;Licenses!~!~!~^`
if (wfTask == "License Issuance" && wfStatus == "Issued" && balanceDue > 0) {
	showMessage = true;
	cancel = true;
	comment("Cannot issue this license with a balance greater than zero");
	}
`^
WorkflowTaskUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
if (matches(currentUserID,"ADMIN","CHAAS")) {
	showDebug = 3;
	showMessage = true;
	}

branch("WTUA:" + appTypeArray[0] + "/*/*/*");
branch("WTUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("WTUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("WTUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("WTUA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("WTUA:" + appTypeString);
if (matches(currentUserID,"TESTDRIVE")) {
	branch("EMSE:TESTDRIVE_WTUA");
	}
`^
WorkflowTaskUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("WTUB:" + appTypeArray[0] + "/*/*/*");
branch("WTUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("WTUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("WTUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("WTUB:" + appTypeString);
`^
