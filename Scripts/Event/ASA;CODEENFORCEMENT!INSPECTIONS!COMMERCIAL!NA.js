/**
 * 
 * To calculate and assess fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Subbmittal
 * Master Script:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;CODEENFORCEMENT!INSPECTIONS!COMMERCIAL!NA.js
 * 
 * 09/28/2016 Abhishek Jain, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
 
if (currentUserID == "ADMIN") {
    showMessage=true;
    showDebug=true;
}

var SquareFeet = parseInt (AInfo["Commercial Square Ft"]);
var Building = parseInt (AInfo["No. Addl Bldgs"]);
var Fees = 0;
var ReminderFeet = 0;
var Factor = 0;

if ((AInfo["Fee Class"] == "Group Buildings")) {
	if( SquareFeet <= 5000 ) {
		Fees = 208;
	} else if ( SquareFeet > 5000 && SquareFeet <= 10000 ) {
        Fees = 245;
	} else if ( SquareFeet > 10000 && SquareFeet <= 25000 ) {
        Fees = 312;
	} else if ( SquareFeet > 25000 && SquareFeet <= 50000 ) {
        Fees = 342;
	} else if ( SquareFeet > 50000 && SquareFeet <= 75000 ) {
		Fees = 372;
	} else if ( SquareFeet > 75000 && SquareFeet <= 100000 ) {
		Fees = 402;
	} else {
		ReminderFeet = SquareFeet - 100000;
		Factor = Math.ceil(ReminderFeet / 50000);
		Fees = 402 + ( Factor * 100);
	}
	Fees = Fees + ( 134 * Building );
} else if ((AInfo["Fee Class"] == "Parking Lot")) {
	if( SquareFeet <= 10000 ) {
		Fees = 185;
	} else if ( SquareFeet > 10000 && SquareFeet <= 50000 ) {
        Fees = 210;
	} else if ( SquareFeet > 50000 && SquareFeet <= 100000 ) {
		Fees = 240;
	} else {
		ReminderFeet = SquareFeet - 100000;
		Factor = Math.ceil(ReminderFeet / 100000);
		Fees = 240 + ( Factor * 30);
	}
} else if ((AInfo["Fee Class"] == "Stripmall")) {
	if( SquareFeet <= 5000 ) {
		Fees = 171;
	} else if ( SquareFeet > 5000 && SquareFeet <= 10000 ) {
        Fees = 245;
	} else if ( SquareFeet > 10000 && SquareFeet <= 25000 ) {
        Fees = 312;
	} else if ( SquareFeet > 25000 && SquareFeet <= 50000 ) {
        Fees = 342;
	} else if ( SquareFeet > 50000 && SquareFeet <= 75000 ) {
		Fees = 372;
	} else if ( SquareFeet > 75000 && SquareFeet <= 100000 ) {
		Fees = 402;
	} else {
		ReminderFeet = SquareFeet - 100000;
		Factor = Math.ceil(ReminderFeet / 50000);
		Fees = 402 + ( Factor * 100);
	}
} else if ((AInfo["Fee Class"] == "Junk Yard") || (AInfo["Fee Class"] == "Scrap Yard") || (AInfo["Fee Class"] == "Open Storage Yard")) {
	if( SquareFeet <= 5000 ) {
		Fees = 185;
	} else if ( SquareFeet > 5000 && SquareFeet <= 10000 ) {
        Fees = 200;
	} else if ( SquareFeet > 10000 && SquareFeet <= 50000 ) {
        Fees = 240;
	} else if ( SquareFeet > 50000 && SquareFeet <= 100000 ) {
        Fees = 320;
	} else {
		ReminderFeet = SquareFeet - 100000;
		Factor = Math.ceil(ReminderFeet / 40000);
		Fees = 320 + ( Factor * 32);
	}
} else {
	if( SquareFeet <= 5000 ) {
		Fees = 208;
	} else if ( SquareFeet > 5000 && SquareFeet <= 10000 ) {
        Fees = 245;
	} else if ( SquareFeet > 10000 && SquareFeet <= 25000 ) {
        Fees = 312;
	} else if ( SquareFeet > 25000 && SquareFeet <= 50000 ) {
        Fees = 342;
	} else if ( SquareFeet > 50000 && SquareFeet <= 75000 ) {
		Fees = 372;
	} else if ( SquareFeet > 75000 && SquareFeet <= 100000 ) {
		Fees = 402;
	} else {
		ReminderFeet = SquareFeet - 100000;
		Factor = Math.ceil(ReminderFeet / 50000);
		Fees = 402 + ( Factor * 100);
	}
}
var feeScheduleItemArr = aa.finance.getFeeItemList(null,"ENFANN_F",null).getOutput();
for (f=0;f<feeScheduleItemArr.length;f++) {
    if (AInfo["Fee Class"] == feeScheduleItemArr[f].getFeeDes().toString()) {
        updateFee(feeScheduleItemArr[f].getFeeCod().toString(),"ENFANN_F","FINAL",Fees,"N");
    }
}
Item1=0;
Item2=0;
Item3=0;
Item4=0;
Item5=0;
Item6=0;
Item7=0;
Item8=0;
Item9=0;
Item10=0;
Item11=0;
Item12=0;
Item13=0;
Item14=0;
Item15=0;
Item16=0;
subTotalItem1=0;
subTotalItem2=0;
signFee4 = 0;
signFee6 = 0;
signFee7 = 0;
signFee8 = 0;
signFee9 = 0;
signFee16 = 0;
if(typeof(SIGN) == "object") {
	for(row in SIGN) {
        if(SIGN[row]["Sign Type"] == "Fixed Awning") {
               Item1= parseInt(SIGN[row]["Quantity"]);
               subTotalItem1+= Item1;
          } else if(SIGN[row]["Sign Type"] == "Fixed/Retractable Awning - Grouped Installations") {
               Item2= parseInt(SIGN[row]["Quantity"]);
			   if(Item2 <= 3)
				   subTotalItem2+= 76;
			   else
               subTotalItem2+= 76 + (( Item2 - 3) * 24) ;
          } else if(SIGN[row]["Sign Type"] == "Sign - Ground Sign") {
              // Item4= parseInt(SIGN[row]["Quantity"]);
              // subTotalItem4+= Item4;
			  var basearea4 = 300,
			  basefee4 = 58,
			  aditionalarea4 =300,
			  additionalfee4 = 58,
			  factor4 = 0,
			  reminder4 = 0,
			  area4 = 0;
			  area4 = parseInt(SIGN[row]["Area"]);
			  if (area4 <= basearea4) {
				signFee4 = basefee4;
			} else if (area4 > basearea4) {
				factor4 = parseInt( (area4 - basearea4) / aditionalarea4);
				reminder4 = parseInt((area4 - basearea4) % aditionalarea4);
				if (reminder4 > 0) {
					signFee4 = basefee4 + additionalfee4 * (factor4+1);
					} else if (reminder4 == 0) {
						signFee4 = basefee4 + additionalfee4 * factor4;
					}
			}		
          } else if(SIGN[row]["Sign Type"] == "Sign - Painted Wall Graphic (Advertising)") {
        	  //Item6= parseInt(SIGN[row]["Quantity"]);
              //subTotalItem6+= Item6;
        	  var basearea6 = 1000, basefee6 = 40, aditionalarea6 = 1000, additionalfee6 = 40, factor6 = 0, reminder6 = 0, area6 = 0;
        	  area6 = parseInt(SIGN[row]["Area"]);
        	  if (area6 <= basearea6) {
        		  signFee6 = basefee6;
			  } else if (area6 > basearea6) {
				  factor6 = parseInt( (area6 - basearea6) / aditionalarea6);
				  reminder6 = parseInt((area6 - basearea6) % aditionalarea6);
				  if (reminder6 > 0) {
					signFee6 = basefee6 + additionalfee6 * (factor6+1);
				  } else if (reminder6 == 0) {
					  signFee6 = basefee6 + additionalfee6 * factor6;
				  }
			  }
          } else if(SIGN[row]["Sign Type"] == "Sign - Painted Wall Graphics (Business)") {
        	  //Item7= parseInt(SIGN[row]["Quantity"]);
        	  // subTotalItem7+= Item7;
        	  var basearea7 = 300, basefee7 = 46, aditionalarea7 =300, additionalfee7 = 46, factor7 = 0, reminder7 = 0, area7 = 0;
        	  area7 = parseInt(SIGN[row]["Area"]);
        	  if (area7 <= basearea7) {
				signFee7 = basefee7;
			} else if (area7 > basearea7) {
				factor7 = parseInt( (area7 - basearea7) / aditionalarea7);
				reminder7 = parseInt((area7 - basearea7) % aditionalarea7);
				if (reminder7 > 0) {
					signFee7 = basefee7 + additionalfee7 * (factor7+1);
				} else if (reminder7 == 0) {
					signFee7 = basefee7 + additionalfee7 * factor7;
				}
			}
          } else if(SIGN[row]["Sign Type"] == "Sign - Projecting Sign") {
               //Item8= parseInt(SIGN[row]["Quantity"]);
               //subTotalItem8+= Item8;
			   var basearea8 = 32, basefee8 = 52, aditionalarea8 = 32, additionalfee8 = 52, factor8 = 0, reminder8 = 0, area8 = 0;
			   area8 = parseInt(SIGN[row]["Area"]);
			   if (area8 <= basearea8) {
				   signFee8 = basefee8;
			} else if (area8 > basearea8) {
				factor8 = parseInt( (area8 - basearea8) / aditionalarea8);
				reminder8 = parseInt((area8 - basearea8) % aditionalarea8);
				if (reminder8 > 0) {
					signFee8 = basefee8 + additionalfee8 * (factor8+1);
				} else if (reminder8 == 0) {
					signFee8 = basefee8 + additionalfee8 * factor8;
				}
			}
          } else if(SIGN[row]["Sign Type"] == "Sign - Roof Sign") {
               //Item9= parseInt(SIGN[row]["Quantity"]);
               //subTotalItem9+= Item9;
			   var basearea9 = 50, basefee9 = 50, aditionalarea9 =50, additionalfee9 = 50, factor9 = 0, reminder9 = 0, area9 = 0;
			   area9 = parseInt(SIGN[row]["Area"]);
			   if (area9 <= basearea9) {
				signFee9 = basefee9;
			   } else if (area9 > basearea9) {
					factor9 = parseInt( (area9 - basearea9) / aditionalarea9);
					reminder9 = parseInt((area9 - basearea9) % aditionalarea9);
					if (reminder9 > 0) {
						signFee9 = basefee9 + additionalfee9 * (factor9+1);
					} else if (reminder9 == 0) {
						signFee9 = basefee9 + additionalfee9 * factor9;
					}
			   }
          } else if(SIGN[row]["Sign Type"] == "Wall Sign") { 
               //Item16= parseInt(SIGN[row]["Quantity"]);
               //subTotalItem16+= Item16;
				var basearea16 = 300, basefee16 = 46, aditionalarea16 = 300, additionalfee16 = 46, factor16 = 0, reminder16 = 0, area16 = 0;
				area16 = parseInt(SIGN[row]["Area"]);
				if (area16 <= basearea16) {
				signFee16 = basefee16;
				} else if (area16 > basearea16) {
					factor16 = parseInt( (area16 - basearea16) / aditionalarea16);
					reminder16 = parseInt((area16 - basearea16) % aditionalarea16);
					if (reminder16 > 0) {
						signFee16 = basefee16 + additionalfee16 * (factor16+1);
					} else if (reminder16 == 0) {
						signFee16 = basefee16 + additionalfee16 * factor16;
					}
				}
          }
    }
}
updateFee("ANN034","ENFANN_F","FINAL",subTotalItem1,"N");
updateFee("ANN035","ENFANN_F","FINAL",subTotalItem2,"N");
updateFee("ANN037","ENFANN_F","FINAL",signFee4,"N");
updateFee("ANN039","ENFANN_F","FINAL",signFee6,"N");
updateFee("ANN040","ENFANN_F","FINAL",signFee7,"N");
updateFee("ANN041","ENFANN_F","FINAL",signFee8,"N");
updateFee("ANN053","ENFANN_F","FINAL",signFee9,"N");
updateFee("ANN046","ENFANN_F","FINAL",signFee16,"N");