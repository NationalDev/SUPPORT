/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: ApplicationSpecificInfoUpdateAfter
 * Event Description: Citizen Access - The after event for converting a partial record ID to a real record ID.
 * Master Script: ApplicationSpecificInfoUpdateAfter
 *
 * Record Type: Permits/SignAwning/NA/NA (Sign/Awning Permit)
 * 07/25/2016 Abhishek Jain, FutureNet Group, Inc.  
 */ 
 
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
subTotalItem3=0;

subTotalItem5=0;
subTotalItem6=0;
subTotalItem7=0;
subTotalItem8=0;
subTotalItem9=0;
subTotalItem10=0;
subTotalItem11=0;
subTotalItem12=0;
subTotalItem13=0;
subTotalItem14=0;
subTotalItem15=0;


signFee4 = 0;
signFee5 = 0;
signFee6 = 0;
signFee7 = 0;
signFee8 = 0;
signFee9 = 0;
signFee12 = 0;
signFee16 = 0;


if(typeof(SIGN) == "object") {
	for(row in SIGN) {

   if(SIGN[row]["Sign Type"] == "Fixed Awning"){
               Item1= parseInt(SIGN[row]["Quantity"]);
               subTotalItem1+= Item1;

          } else if(SIGN[row]["Sign Type"] == "Fixed/Retractable Awning - Grouped Installations"){
               Item2= parseInt(SIGN[row]["Quantity"]);
			   if(Item2 <= 5)
				   subTotalItem2+= 112;
			   else
               subTotalItem2+= 112 + (( Item2 - 5) * 18) ;

          } else if(SIGN[row]["Sign Type"] == "Retractable Awning"){
               Item3= parseInt(SIGN[row]["Quantity"]);
               subTotalItem3+= Item3;

          } else if(SIGN[row]["Sign Type"] == "Sign - Ground Sign"){
                var baseArea4 = 50,       
				baseFee4 = 122,							
				aditionalArea4 = 50,        
				additionalFee4 = 46,		
			    factor4 = 0,
				reminder4 = 0,
			    area4 = parseInt(SIGN[row]["Area"]);

				if (area4 <= baseArea4) {
				signFee4 = baseFee4;
			    } else if (area4 > baseArea4) {
				      factor4 = parseInt( (area4 - baseArea4) / aditionalArea4);
				      reminder4 = (area4 - baseArea4) % aditionalArea4;
						if (reminder4 > 0) {
							signFee4 = baseFee4 + additionalFee4 * (factor4 + 1);
						} else {
							signFee4 = baseFee4 + additionalFee4 * factor4;
						  }
				  }


          } else if(SIGN[row]["Sign Type"] == "Sign - Marquee Sign"){
                var baseArea5 = 50,       
				baseFee5 = 80,							
				aditionalArea5 = 50,        
				additionalFee5 = 32,		
			    factor5 = 0,
				reminder5 = 0,
			    area5 = parseInt(SIGN[row]["Area"]);

				if (area5 <= baseArea5) {
				signFee5 = baseFee5;
			    } else if (area5 > baseArea5) {
				      factor5 = parseInt( (area5 - baseArea5) / aditionalArea5);
				      reminder5 = (area5 - baseArea5) % aditionalArea5;
						if (reminder5 > 0) {
							signFee5 = baseFee5 + additionalFee5 * (factor5 + 1);
						} else {
							signFee5 = baseFee5 + additionalFee5 * factor5;
						  }
				  }

          } else if(SIGN[row]["Sign Type"] == "Sign - Painted Wall Graphic (Advertising)"){
                var baseArea6 = 1000,       
				baseFee6 = 210,							
				aditionalArea6 = 1000,        
				additionalFee6 = 42,		
			    factor6 = 0,
				reminder6 = 0,
			    area6 = parseInt(SIGN[row]["Area"]);

				if (area6 <= baseArea6) {
				signFee6 = baseFee6;
			    } else if (area6 > baseArea6) {
				      factor6 = parseInt( (area6 - baseArea6) / aditionalArea6);
				      reminder6 = (area6 - baseArea6) % aditionalArea6;
						if (reminder6 > 0) {
							signFee6 = baseFee6 + additionalFee6 * (factor6 + 1);
						} else {
							signFee6 = baseFee6 + additionalFee6 * factor6;
						  }
				  }


          } else if(SIGN[row]["Sign Type"] == "Sign - Painted Wall Graphics (Business)"){
                var baseArea7 = 100,       
				baseFee7 = 80,							
				aditionalArea7 = 50,        
				additionalFee7 = 26,		
			    factor7 = 0,
				reminder7 = 0,
			    area7 = parseInt(SIGN[row]["Area"]);

				if (area7 <= baseArea7) {
				signFee7 = baseFee7;
			    } else if (area7 > baseArea7) {
				      factor7 = parseInt( (area7 - baseArea7) / aditionalArea7);
				      reminder7 = (area7 - baseArea7) % aditionalArea7;
						if (reminder7 > 0) {
							signFee7 = baseFee7 + additionalFee7 * (factor7 + 1);
						} else {
							signFee7 = baseFee7 + additionalFee7 * factor7;
						  }
				  }

          } else if(SIGN[row]["Sign Type"] == "Sign - Projecting Sign"){
                var baseArea8 = 100,       
				baseFee8 = 80,							
				aditionalArea8 = 50,        
				additionalFee8 = 26,		
			    factor8 = 0,
				reminder8 = 0,
			    area8 = parseInt(SIGN[row]["Area"]);

				if (area8 <= baseArea8) {
				signFee8 = baseFee8;
			    } else if (area8 > baseArea8) {
				      factor8 = parseInt( (area8 - baseArea8) / aditionalArea8);
				      reminder8 = (area8 - baseArea8) % aditionalArea8;
						if (reminder8 > 0) {
							signFee8 = baseFee8 + additionalFee8 * (factor8 + 1);
						} else {
							signFee8 = baseFee8 + additionalFee8 * factor8;
						  }
				  }
          } else if(SIGN[row]["Sign Type"] == "Sign - Roof Sign"){
                var baseArea9 = 50,       
				baseFee9 = 180,							
				aditionalArea9 = 50,        
				additionalFee9 = 32,		
			    factor9 = 0,
				reminder9 = 0,
			    area9 = parseInt(SIGN[row]["Area"]);

				if (area9 <= baseArea9) {
				signFee9 = baseFee9;
			    } else if (area9 > baseArea9) {
				      factor9 = parseInt( (area9 - baseArea9) / aditionalArea9);
				      reminder9 = (area9 - baseArea9) % aditionalArea9;
						if (reminder9 > 0) {
							signFee9 = baseFee9 + additionalFee9 * (factor9 + 1);
						} else {
							signFee9 = baseFee9 + additionalFee9 * factor9;
						  }
				  }

          } else if(SIGN[row]["Sign Type"] == "Special Event/Temp Prmt - Subsequent Insp."){
               Item10= parseInt(SIGN[row]["Quantity"]);
               subTotalItem10+= Item10;

          } else if(SIGN[row]["Sign Type"] == "Special Event/Temporary Permits"){
               Item11= parseInt(SIGN[row]["Quantity"]);
               subTotalItem11+= Item11;

          } else if(SIGN[row]["Sign Type"] == "Temp Sign (Advertising)"){
                var baseArea12 = 1500,       
				baseFee12 = 400,							
				aditionalArea12 = 500,        
				additionalFee12 = 100,		
			    factor12 = 0,
				reminder12 = 0,
			    area12 = parseInt(SIGN[row]["Area"]);

				if (area12 <= baseArea12) {
				signFee12 = baseFee12;
			    } else if (area12 > baseArea12) {
				      factor12 = parseInt( (area12 - baseArea12) / aditionalArea12);
				      reminder12 = (area12 - baseArea12) % aditionalArea12;
						if (reminder12 > 0) {
							signFee12 = baseFee12 + additionalFee12 * (factor12 + 1);
						} else {
							signFee12 = baseFee12 + additionalFee12 * factor12;
						  }
				  }
          } else if(SIGN[row]["Sign Type"] == "Temp Sign (Business)"){
               Item13= parseInt(SIGN[row]["Quantity"]);
               subTotalItem13+= Item13;

          } else if(SIGN[row]["Sign Type"] == "Tempory Banner"){
               Item14= parseInt(SIGN[row]["Quantity"]);
               subTotalItem14+= Item14;

          } else if(SIGN[row]["Sign Type"] == "Wall Banner"){
               Item15= parseInt(SIGN[row]["Quantity"]);
               subTotalItem15+= Item15;

          } else if(SIGN[row]["Sign Type"] == "Wall Sign"){
                
				var baseArea16 = 100,       
				baseFee16 = 80,							
				aditionalArea16 = 50,        
				additionalFee16 = 26,		
			    factor16 = 0,
				reminder16 = 0,
			    area16 = parseInt(SIGN[row]["Area"]);

				if (area16 <= baseArea16) {
				signFee16 = baseFee16;
			    } else if (area16 > baseArea16) {
				      factor16 = parseInt( (area16 - baseArea16) / aditionalArea16);
				      reminder16 = (area16 - baseArea16) % aditionalArea16;
						if (reminder16 > 0) {
							signFee16 = baseFee16 + additionalFee16 * (factor16 + 1);
						} else {
							signFee16 = baseFee16 + additionalFee16 * factor16;
						  }
				  }


        }

    
    }
}


updateFee("SPMT","PMTSGN_F","FINAL",1,"N"); // Sign Permit Application fee

updateFee("SGN0001","PMTSGN_F","FINAL",subTotalItem1,"N");
updateFee("SGN0002","PMTSGN_F","FINAL",subTotalItem2,"N");
updateFee("SGN0003","PMTSGN_F","FINAL",subTotalItem3,"N");
updateFee("SGN0004","PMTSGN_F","FINAL",signFee4,"N");
updateFee("SGN0005","PMTSGN_F","FINAL",signFee5,"N");
updateFee("SGN0006","PMTSGN_F","FINAL",signFee6,"N");
updateFee("SGN0007","PMTSGN_F","FINAL",signFee7,"N");
updateFee("SGN0008","PMTSGN_F","FINAL",signFee8,"N");
updateFee("SGN0009","PMTSGN_F","FINAL",signFee9,"N");
updateFee("SGN0010","PMTSGN_F","FINAL",subTotalItem10,"N");
updateFee("SGN0011","PMTSGN_F","FINAL",subTotalItem11,"N");
updateFee("SGN0012","PMTSGN_F","FINAL",signFee12,"N");
updateFee("SGN0013","PMTSGN_F","FINAL",subTotalItem13,"N");
updateFee("SGN0015","PMTSGN_F","FINAL",subTotalItem14,"N");
updateFee("SGN0016","PMTSGN_F","FINAL",subTotalItem15,"N");
updateFee("SGN0014","PMTSGN_F","FINAL",signFee16,"N");