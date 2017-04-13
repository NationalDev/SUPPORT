/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * MasterScript:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;PERMITS!REVIEW!STRUCTURAL!NA.js
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

var estCost = (getAppSpecific("Estimated Cost") * 1); comment("estCost is: " +estCost);
var baseFee0 = 0; var baseFee1 = 150; var baseFee2 = 10110; var baseFee3 = 18110; var baseFee4 = 28110;
var feeTotal = 0; var feeDeposit = 0;
var estLimit0 = 2000; var estLimit1 = 50000; var estLimit2 = 500000; var estLimit3 = 1000000; var estLimit4 = 2000000;
if (estCost <= estLimit0) {
	feeTotal = feeTotal + baseFee1;
	feeDeposit = (feeTotal * 0.30); 
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N"); 
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N"); 
	//call custom function updateFeeAmount instead of includes function updateFee
}
if ((estCost > estLimit0) && (estCost <= estLimit2)) {
	feeTotal = feeTotal + ((((estCost-estLimit0)/1000)*20)+baseFee1);
	feeDeposit = (feeTotal * 0.30); 
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//call custom function updateFeeAmount instead of includes function updateFee
}	
if ((estCost > estLimit2) && (estCost <= estLimit3)) {
	feeTotal = feeTotal + ((((estCost-estLimit2)/1000)*16)+baseFee2);
	feeDeposit = (feeTotal * 0.30); 
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//call custom function updateFeeAmount instead of includes function updateFee
}	
if ((estCost > estLimit3) && (estCost <= estLimit4)) {
	feeTotal = feeTotal + ((((estCost-estLimit3)/1000)*10)+baseFee3);	
	feeDeposit = (feeTotal * 0.30); 
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//call custom function updateFeeAmount instead of includes function updateFee
}
if 	(estCost > estLimit4) {
	feeTotal = feeTotal + ((((estCost-estLimit4)/1000)*8)+baseFee4);
	feeDeposit = (feeTotal * 0.30);
	updateFee("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");	
	//updateFeeAmount("PRV_BLD","PMTPRV_F","FINAL",feeDeposit,"N");
	//call custom function updateFeeAmount instead of includes function updateFee
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
	//call custom function updateFeeAmount instead of includes function updateFee
}
if (((feeTotal * 0.04) >= 35) && ((feeTotal * 0.04) < 5000)) {
	updateFee("PRV_ELEC","PMTPRV_F","FINAL",feeTotal*0.04,"N");
	//updateFeeAmount("PRV_ELEC","PMTPRV_F","FINAL",feeTotal*0.04,"N");
	//call custom function updateFeeAmount instead of includes function updateFee
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
}
if (((feeTotal * 0.03) >= 150) && ((feeTotal * 0.04) < 5000)) {
	updateFee("PRV_FIRE","PMTPRV_F","FINAL",feeTotal*0.03,"N");
	//updateFeeAmount("PRV_FIRE","PMTPRV_F","FINAL",feeTotal*0.03,"N");
	//call custom function updateFeeAmount instead of includes function updateFee
}
if ((feeTotal * 0.03) >= 5000) {
	updateFee("PRV_FIRE","PMTPRV_F","FINAL",5000,"N");
}