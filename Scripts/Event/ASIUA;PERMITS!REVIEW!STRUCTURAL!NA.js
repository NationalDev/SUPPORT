/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Specific Info Update After
 * Event Description:- The after event for when a user updates application specific information
 * MasterScript:- ApplicationSpecificInfoUpdateAfterV3.0.js
 * Record Type:- ASIUA;PERMITS!REVIEW!STRUCTURAL!NA.js
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//showDebug = true; showMessage = true;
var estCost = (getAppSpecific("Estimated Cost") * 1); comment("estCost is: " +estCost);
var baseFee1 = 150; var baseFee2 = 10110; var baseFee3 = 18110; var baseFee4 = 28110;
var estLimit0 = 0; var estLimit1 = 2000; var estLimit2 = 500000; var estLimit3 = 1000000; var estLimit4 = 2000000;
var feeTotal = 0; var feeDeposit = 0;
if (estCost <= estLimit1) {
	feeTotal = feeTotal + baseFee1;
	feeDeposit = (feeTotal * 0.30); 
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
}
if ((estCost > estLimit1) && (estCost <= estLimit2)) {
	feeTotal = feeTotal + ((((estCost-estLimit0)/1000)*20)+baseFee1);
	feeDeposit = (feeTotal * 0.30); 
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N"); 
	//custom function that calls f4FeeItemScriptModel.getF4FeeItem(); emse complaining about this method not found
}	
if ((estCost > estLimit2) && (estCost <= estLimit3)) {
	feeTotal = feeTotal + ((((estCost-estLimit2)/1000)*16)+baseFee2);
	feeDeposit = (feeTotal * 0.30); 
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
}	
if ((estCost > estLimit3) && (estCost <= estLimit4)) {
	feeTotal = feeTotal + ((((estCost-estLimit3)/1000)*10)+baseFee3);	
	feeDeposit = (feeTotal * 0.30); 
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
}
if 	(estCost > estLimit4) {
	feeTotal = feeTotal + ((((estCost-estLimit4)/1000)*8)+baseFee4);
	feeDeposit = (feeTotal * 0.30); 
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
}
//Adding Mechanical, Electrical, Plumbing fees to this script
if ((feeTotal * 0.04) < 35) {
	updateFee("PRV_MECH","PMTPRV_F","FINAL",35,"N");
	updateFee("PRV_PLUM","PMTPRV_F","FINAL",35,"N");
	updateFee("PRV_ELEC","PMTPRV_F","FINAL",35,"N");
}
if (((feeTotal * 0.04) >= 35) && ((feeTotal * 0.04) < 3000)) {
	updateFee("PRV_MECH","PMTPRV_F","FINAL",feeTotal*0.04,"N");
	updateFee("PRV_PLUM","PMTPRV_F","FINAL",feeTotal*0.04,"N");
	//updateFeeAmount("PRV_MECH","PMTPRV_F","FINAL",feeTotal*0.04,"N");
	//updateFeeAmount("PRV_PLUM","PMTPRV_F","FINAL",feeTotal*0.04,"N");
}
if (((feeTotal * 0.04) >= 35) && ((feeTotal * 0.04) < 5000)) {
	updateFee("PRV_ELEC","PMTPRV_F","FINAL",feeTotal*0.04,"N");
	//updateFeeAmount("PRV_ELEC","PMTPRV_F","FINAL",feeTotal*0.04,"N");
}
if ((feeTotal * 0.04) >= 3000) {
	updateFee("PRV_MECH","PMTPRV_F","FINAL",3000,"N");
	updateFee("PRV_PLUM","PMTPRV_F","FINAL",3000,"N");
}
if ((feeTotal * 0.04) >= 5000) {
	updateFee("PRV_ELEC","PMTPRV_F","FINAL",5000,"N");
}
//Adding Fire fees to this script
if ((feeTotal * 0.03) < 150) {
	updateFee("PRV_FIRE","PMTPRV_F","FINAL",150,"N"); 
	//1/27/2016 result when feeDeposit miscalcs using updateFeeAmount() = 0.01 - still don't get quantity correctly... so why use a custom function?
}
if (((feeTotal * 0.03) >= 150) && ((feeTotal * 0.04) < 5000)) {
	updateFee("PRV_FIRE","PMTPRV_F","FINAL",feeTotal*0.03,"N");
	//updateFeeAmount("PRV_FIRE","PMTPRV_F","FINAL",feeTotal*0.03,"N");
}
if ((feeTotal * 0.03) >= 5000) {
	updateFee("PRV_FIRE","PMTPRV_F","FINAL",5000,"N");
}