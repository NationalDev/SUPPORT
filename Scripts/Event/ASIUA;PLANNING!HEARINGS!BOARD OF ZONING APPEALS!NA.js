//ASIUA:PLANNING/HEARINGS/BOARD OF ZONING APPEALS/NA
//Assess Fees based on Type of Appeal
//Testing in ASIUA before also triggering in ASA
showDebug = true;
var qty = 1;
if (AInfo["Applicant Appeal of BSEED Decision"] == "CHECKED") {
	updateFee("APPAPPEAL","PLNBZA_F","FINAL",qty,"N");
}
if (AInfo["Community Appeal of BSEED Decision"] == "CHECKED") {
	updateFee("COMMAPPEAL","PLNBZA_F","FINAL",qty,"N");
}
if (AInfo["Dimensional Variance"] == "CHECKED") {
	updateFee("DIMVAR","PLNBZA_F","FINAL",qty,"N");
}
if (AInfo["Hardship Relief/Use Variance"] == "CHECKED") {
	updateFee("USEVAR","PLNBZA_F","FINAL",qty,"N");
}
if (AInfo["Modify/Expand Previous Grant"] == "CHECKED") {
	updateFee("REQMOD","PLNBZA_F","FINAL",qty,"N");
}
if (AInfo["Non-conforming Use"] == "CHECKED") {
	updateFee("CHGUSE","PLNBZA_F","FINAL",qty,"N");
}
if (AInfo["Parking/Loading Variance"] == "CHECKED") {
	updateFee("PRKGLOT","PLNBZA_F","FINAL",qty,"N");
}
if (AInfo["Sign Variance"] == "CHECKED") {
	updateFee("SIGN","PLNBZA_F","FINAL",qty,"N");
}
if (AInfo["Waiver of Development Standards/Use Regulations"] == "CHECKED") {
	updateFee("CTRLUSE","PLNBZA_F","FINAL",qty,"N");
	//updateFee("REGUSE","PLNBZA_F","FINAL",qty,"N");
	//which fee applies to this CF - need to verify with Jayda/James Ribbron/Tonja Stapleton
}
if (AInfo["Waiver of Over-Concentration/Spacing"] == "CHECKED") {
	updateFee("NEWUSE","PLNBZA_F","FINAL",qty,"N");
}