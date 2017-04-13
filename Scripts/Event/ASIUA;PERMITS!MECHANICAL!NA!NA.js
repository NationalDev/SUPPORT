/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Specific Info Update After
 * Event Description:- The after event for when a user updates application specific information
 * MasterScript:- ApplicationSpecificInfoUpdateAfterV3.0.js
 * Record Type:- ASIUA;PERMITS!MECHANICAL!NA!NA.js
 * 
 * 09/17/2016 Abhishek Jain, FutureNetGroup, Inc.
 * 
 * TODO: NEED TO add appMatch("") strings to specify which food service record types will trigger this script
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

Item1 = 0 ;
Item2 = 0 ;
Item3 = 0 ;
Item4 = 0 ;
Item5 = 0 ;
Item6 = 0 ;
Item7 = 0 ;
Item8 = 0 ;
Item9 = 0 ;
Item10 = 0 ;
Item11 = 0 ;
Item12 = 0 ;
Item13 = 0 ;
Item14 = 0 ;
Item15 = 0 ;
Item16 = 0 ;
Item17 = 0 ;
Item18 = 0 ;
Item19 = 0 ;
Item20 = 0 ;
Item21 = 0 ;
Item22 = 0 ;
Item23 = 0 ;
Item24 = 0 ;
Item25 = 0 ;
Item26 = 0 ;
Item27 = 0 ;
Item28 = 0 ;
Item29 = 0 ;
Item30 = 0 ;
Item31 = 0 ;
Item32 = 0 ;
Item33 = 0 ;
Item34 = 0 ;
Item35 = 0 ;
Item36 = 0 ;
Item37 = 0 ;
Item38 = 0 ;
Item39 = 0 ;
Item40 = 0 ;
Item41 = 0 ;
Item42 = 0 ;
Item43 = 0 ;
Item44 = 0 ;
Item45 = 0 ;
Item46 = 0 ;
Item47 = 0 ;
Item48 = 0 ;
Item49 = 0 ;
Item50 = 0 ;
Item51 = 0 ;
Item52 = 0 ;
Item53 = 0 ;
Item54 = 0 ;
Item55 = 0 ;
Item56 = 0 ;
Item57 = 0 ;
Item58 = 0 ;
Item59 = 0 ;

subTotalItem1 = 0 ;
subTotalItem2 = 0 ;
subTotalItem3 = 0 ;
subTotalItem4 = 0 ;
subTotalItem5 = 0 ;
subTotalItem6 = 0 ;
subTotalItem7 = 0 ;
subTotalItem8 = 0 ;
subTotalItem9 = 0 ;
subTotalItem10 = 0 ;
subTotalItem11 = 0 ;
subTotalItem12 = 0 ;
subTotalItem13 = 0 ;
subTotalItem14 = 0 ;
subTotalItem15 = 0 ;
subTotalItem16 = 0 ;
subTotalItem17 = 0 ;
subTotalItem18 = 0 ;
subTotalItem19 = 0 ;
subTotalItem20 = 0 ;
subTotalItem21 = 0 ;
subTotalItem22 = 0 ;
subTotalItem23 = 0 ;
subTotalItem24 = 0 ;
subTotalItem25 = 0 ;
subTotalItem26 = 0 ;
subTotalItem27 = 0 ;
subTotalItem28 = 0 ;
subTotalItem29 = 0 ;
subTotalItem30 = 0 ;
subTotalItem31 = 0 ;
subTotalItem32 = 0 ;
subTotalItem33 = 0 ;
subTotalItem34 = 0 ;
subTotalItem35 = 0 ;
subTotalItem36 = 0 ;
subTotalItem37 = 0 ;
subTotalItem38 = 0 ;
subTotalItem39 = 0 ;
subTotalItem40 = 0 ;
subTotalItem41 = 0 ;
subTotalItem42 = 0 ;
subTotalItem43 = 0 ;
subTotalItem44 = 0 ;
subTotalItem45 = 0 ;
subTotalItem46 = 0 ;
subTotalItem47 = 0 ;
subTotalItem48 = 0 ;
subTotalItem49 = 0 ;
subTotalItem50 = 0 ;
subTotalItem51 = 0 ;
subTotalItem52 = 0 ;
subTotalItem53 = 0 ;
subTotalItem54 = 0 ;
subTotalItem55 = 0 ;
subTotalItem56 = 0 ;
subTotalItem57 = 0 ;
subTotalItem58 = 0 ;
subTotalItem59 = 0 ;

if (typeof(MECEQUTYPE) == "object") {
	for (row in MECEQUTYPE) {
		if(MECEQUTYPE[row]["Mechanical_Equipment"] == "01 - IP - Gas Burner <=50,000 BTU") {
               Item1= parseInt(MECEQUTYPE[row]["Quantity"]);
			   if (Item1 <= 5)
				   subTotalItem1 += Item1 * 98;
			   else
				   subTotalItem1 += (5 * 98) + ((Item1 - 5) * 53);
		} else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "02 - IP - Gas Burner 50,001-75,000 BTU") {
               Item2= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item2 <= 5)
            	   subTotalItem2 += Item2 * 123;
			   else
				   subTotalItem2 += (5 * 123) + ((Item2 - 5) * 74);
		} else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "03 - IP - Gas Burner 75,001-500,000 BTU") {
               Item3= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item3 <= 5)
            	   subTotalItem3 += Item3 * 144;
			   else
				   subTotalItem3 += (5 * 144) + ((Item3 - 5) * 98);
		} else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "04 - IP - Gas Burner>500,000 BTU") {
               Item4= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem4+= Item4 * 165;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "05 - IP - Gas Fired Infra-Red Heaters <=50,000 BTU") {
               Item5= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item5 <= 5)
            	   subTotalItem5 += Item5 * 84;
			   else if (Item5 >=6 && Item5 <= 15)
				   subTotalItem5 += (5 * 84) + ((Item5 - 5) * 48);
			   else
				   subTotalItem5 += (5 * 84) + (10 * 48) + ((Item5 - 15) * 36);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "06 - IP - Gas Fired Infra-Red Heaters 50,001-75,000 BTU") {
               Item6= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item6 <= 5)
            	   subTotalItem6 += Item6 * 110;
			   else if (Item6 >=6 && Item6 <= 15)
				   subTotalItem6 += (5 * 110) + ((Item6 - 5) * 60);
			   else
				   subTotalItem6 += (5 * 110) + (10 * 60) + ((Item6 - 15) * 50);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "07 - IP - Gas Fired Infra-Red Heaters >75,000 BTU") {
               Item7= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item7 <= 5)
            	   subTotalItem7 += Item7 * 131;
			   else if (Item7 >=6 && Item7 <= 15)
				   subTotalItem7 += (5 * 131) + ((Item7 - 5) * 99);
			   else
				   subTotalItem7 += (5 * 131) + (10 * 99) + ((Item7 - 15) * 53);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "08 - Pressurization Inspection") { 
               Item8= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem8+= Item8;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "09 - Special/Shop Inspection") {
               Item9= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem9+= Item9;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "10 - Preliminary Inspection - Gas") {
               Item10= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem10+= Item10;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "11 - Preliminary Inspection - Refrigeration") {
               Item11= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem11+= Item11;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "12 - Special Gas Piping System Pressure Test") {
               Item12= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem12+= Item12;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "13 - Hot Water Heater") {
               Item13= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem13+= Item13;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "14 - IP - Fuel Oil Heater & Tanks or drums installed <=5 GPH") {
               Item14= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem14+= Item14;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "15 - IP - Fuel Oil Heater & Tanks or drums installed >5 GPH") {
               Item15= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem15+= Item15;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "16 - IP - Fuel-Oil Tanks or Drums Above Ground<=550 Gal") {
               Item16= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem16+= Item16;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "17 - IP - Fuel-Oil Tanks or Drums Below Ground<=550 Gal") {
               Item17= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem17+= Item17;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "18 - Fuel Oil - Room Heaters & Stove") {
               Item18= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem18+= Item18;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "19 - Smoke Duct Detector") {
               Item19= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem19+= Item19;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "20 - Installation Solid Fuel-Fired Units (Coal or Wood)") { 
               Item20= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem20+= Item20;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "21 - Fire Suppression / Protection") {
               Item21= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem21+= Item21;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "22 - Fire Suppression - Hydro Pressure Test") {
               Item22= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem22+= Item22;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "23 - Fire Suppression - Puff Test") {
               Item23= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem23+= Item23;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "24 - Fire Suppression - FM 200 Test") {
               Item24= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem24+= Item24;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "25 - Install Space Heating / Cooling Distribution System / Process Piping") {
               Item25= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem25+= Item25;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "26 - Additional Hours for Inspection of Space Heating") {
               Item26= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem26+= Item26;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "27 - Alteration of Space Heating/Cooling Distribution"){
               Item27= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem27+= Item27;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "28 - Exhaust System") {
               Item28= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem28+= Item28;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "29 - Special Inspection for Failure to Obtain Permit") {
               Item29= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem29+= Item29;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "30 - Homeowner installation permit") {
               Item30= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem30+= Item30;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "31 - Gas Piping System") {
               Item31= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem31+= Item31;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "32 - Alterations to exist Fuel Burner, Furnace installation") {
               Item32= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem32+= Item32;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "33 - Homeowner Room/Wall heater") {
               Item33= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem33+= Item33;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "34 - Remote Refrig Sys activated by motors/engine<=10HP") {
               Item34= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem34+= Item34;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "35 - IP - Refrig Sys/Compressor 10-50 HP") {
               Item35= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem35+= Item35;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "36 - IP - Refrig Sys/Compressor 51-100 HP") {
               Item36= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem36+= Item36;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "37 - IP - Refrig Sys/Compressor >100 HP") {
               Item37= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem37+= Item37;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "38 - IP - Self Contained Refrig Systems 2 HP") {
               Item38= parseInt(MECEQUTYPE[row]["Quantity"]);
               if(Item38 <= 5)
            	   subTotalItem38 += Item38 * 74;
			   else
				   subTotalItem38 += (5 * 74) + ((Item38 - 5) * 49);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "39 - IP - Self Contained Refrig Systems>2-10 HP") {
               Item39= parseInt(MECEQUTYPE[row]["Quantity"]);
               if(Item39 <= 5)
            	   subTotalItem39 += Item39 * 96;
			   else
				   subTotalItem39 += (5 * 96) + ((Item39 - 5) * 74);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "40 - Alteration to Refrigeration Systems") {
               Item40= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem40+= Item40;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "41 - Vent Exhaust Sys not HVAC") {
               Item41= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem41+= Item41;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "42 - Fire/Smoke Dampers") {
               Item42= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem42+= Item42;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "43 - Info Inspection - Air Conditioning Equipment") {
               Item43= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem43+= Item43;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "44 - Info Inspection - Residential Heating Equipment") {
               Item44= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem44+= Item44;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "45 - Approval Inspection of Unlisted Refrigeration Equipment") {
               Item45= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem45+= Item45;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "46 - Installation of Dist Sys - 4 Fan Boxes") {
               Item46= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem46+= Item46;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "47 - Installation of Dist Sys - 4 VAV Boxes") {
               Item47= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem47+= Item47;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "48 - Gas Piping Pressure Test") {
               Item48= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem48+= Item48;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "49 - Combo Gas/Oil Burner") {
               Item49= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem49+= Item49;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "50 - BL - Gas Burner <=50,000 BTU") {
               Item50= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item50 <= 5)
            	   subTotalItem50 += Item50 * 66;
			   else if (Item50 >=6 && Item50 <= 15)
				   subTotalItem50 += (5 * 66) + ((Item50 - 5) * 43);
			   else
				   subTotalItem50 += (5 * 66) + (10 * 43) + ((Item50 - 15) * 31);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "51 - BL - Gas Burner 50,001-75,000 BTU") {
               Item51= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item51 <= 5)
            	   subTotalItem51 += Item51 * 73;
			   else if (Item51 >=6 && Item51 <= 15)
				   subTotalItem51 += (5 * 73) + ((Item51 - 5) * 43);
			   else
				   subTotalItem51 += (5 * 73) + (10 * 43) + ((Item51 - 15) * 34);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "52 - BL - Gas Burner 75,001-500,000 BTU") {
               Item52= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item52 <= 5)
            	   subTotalItem52 += Item52 * 100;
			   else if (Item52 >=6 && Item52 <= 15)
				   subTotalItem52 += (5 * 100) + ((Item52 - 5) * 60);
			   else
				   subTotalItem52 += (5 * 100) + (10 * 60) + ((Item52 - 15) * 38);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "53 - BL - Gas Burner >500,000 BTU") {
               Item53= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem53+= Item53 * 165;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "54 - BL - Gas Fired Infra-Red Heaters") {
               Item54= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item54 <= 5)
            	   subTotalItem54 += Item54 * 60;
			   else if (Item54 >=6 && Item54 <= 15)
				   subTotalItem54 += (5 * 60) + ((Item54 - 5) * 41);
			   else
				   subTotalItem54 += (5 * 60) + (10 * 41) + ((Item54 - 15) * 30);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "55 - BL - Refrigeration Sys Class A <=5hp") {
               Item55= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item55 <= 2)
            	   subTotalItem55 += Item55 * 90;
			   else if (Item55 >=3 && Item55 <= 5)
				   subTotalItem55 += (2 * 90) + ((Item55 - 2) * 43);
			   else
				   subTotalItem55 += (2 * 90) + (3 * 43) + ((Item55 - 5) * 23);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "56 - BL - Refrigeration Sys Class B >5<=50 hp") {
               Item56= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item56 <= 2)
            	   subTotalItem56 += Item56 * 123;
			   else
				   subTotalItem56 += (2 * 123) + ((Item56 - 2) * 59);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "57 - BL - Refrigeration Sys Class B > 50 hp") {
               Item57= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem57+= Item57 * 198;
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "58 - BL - Fuel Oil Heater & Tanks <=5GPH") {
               Item58= parseInt(MECEQUTYPE[row]["Quantity"]);
               if (Item58 <= 5)
            	   subTotalItem58 += Item58 * 100;
			   else
				   subTotalItem58 += (5 * 100) + ((Item58 - 5) * 73);
          } else if (MECEQUTYPE[row]["Mechanical_Equipment"] == "59 - BL - Fuel Oil Heater & Tanks >5GPH") {
               Item59= parseInt(MECEQUTYPE[row]["Quantity"]);
               subTotalItem59+= Item59 * 165;
          }
    }
}
updateFee("FIX0001","PMTMEC_F","FINAL",subTotalItem1,"N");
updateFee("FIX0002","PMTMEC_F","FINAL",subTotalItem2,"N");
updateFee("FIX0003","PMTMEC_F","FINAL",subTotalItem3,"N");
updateFee("FIX0004","PMTMEC_F","FINAL",subTotalItem4,"N");
updateFee("FIX0005","PMTMEC_F","FINAL",subTotalItem5,"N");
updateFee("FIX0006","PMTMEC_F","FINAL",subTotalItem6,"N");
updateFee("FIX0007","PMTMEC_F","FINAL",subTotalItem7,"N");
updateFee("FIX0008","PMTMEC_F","FINAL",subTotalItem8,"N");
updateFee("FIX0009","PMTMEC_F","FINAL",subTotalItem9,"N");
updateFee("FIX0010","PMTMEC_F","FINAL",subTotalItem10,"N");
updateFee("FIX0011","PMTMEC_F","FINAL",subTotalItem11,"N");
updateFee("FIX0012","PMTMEC_F","FINAL",subTotalItem12,"N");
updateFee("FIX0013","PMTMEC_F","FINAL",subTotalItem13,"N");
updateFee("FIX0014","PMTMEC_F","FINAL",subTotalItem14,"N");
updateFee("FIX0015","PMTMEC_F","FINAL",subTotalItem15,"N");
updateFee("FIX0016","PMTMEC_F","FINAL",subTotalItem16,"N");
updateFee("FIX0017","PMTMEC_F","FINAL",subTotalItem17,"N");
updateFee("FIX0018","PMTMEC_F","FINAL",subTotalItem18,"N");
updateFee("FIX0019","PMTMEC_F","FINAL",subTotalItem19,"N");
updateFee("FIX0020","PMTMEC_F","FINAL",subTotalItem20,"N");
updateFee("FIX0021","PMTMEC_F","FINAL",subTotalItem21,"N");
updateFee("FIX0022","PMTMEC_F","FINAL",subTotalItem22,"N");
updateFee("FIX0023","PMTMEC_F","FINAL",subTotalItem23,"N");
updateFee("FIX0024","PMTMEC_F","FINAL",subTotalItem24,"N");
updateFee("FIX0025","PMTMEC_F","FINAL",subTotalItem25,"N");
updateFee("FIX0026","PMTMEC_F","FINAL",subTotalItem26,"N");
updateFee("FIX0027","PMTMEC_F","FINAL",subTotalItem27,"N");
updateFee("FIX0028","PMTMEC_F","FINAL",subTotalItem28,"N");
updateFee("FIX0029","PMTMEC_F","FINAL",subTotalItem29,"N");
updateFee("FIX0030","PMTMEC_F","FINAL",subTotalItem30,"N");
updateFee("FIX0031","PMTMEC_F","FINAL",subTotalItem31,"N");
updateFee("FIX0032","PMTMEC_F","FINAL",subTotalItem32,"N");
updateFee("FIX0033","PMTMEC_F","FINAL",subTotalItem33,"N");
updateFee("FIX0034","PMTMEC_F","FINAL",subTotalItem34,"N");
updateFee("FIX0035","PMTMEC_F","FINAL",subTotalItem35,"N");
updateFee("FIX0036","PMTMEC_F","FINAL",subTotalItem36,"N");
updateFee("FIX0037","PMTMEC_F","FINAL",subTotalItem37,"N");
updateFee("FIX0038","PMTMEC_F","FINAL",subTotalItem38,"N");
updateFee("FIX0039","PMTMEC_F","FINAL",subTotalItem39,"N");
updateFee("FIX0040","PMTMEC_F","FINAL",subTotalItem40,"N");
updateFee("FIX0041","PMTMEC_F","FINAL",subTotalItem41,"N");
updateFee("FIX0042","PMTMEC_F","FINAL",subTotalItem42,"N");
updateFee("FIX0043","PMTMEC_F","FINAL",subTotalItem43,"N");
updateFee("FIX0044","PMTMEC_F","FINAL",subTotalItem44,"N");
updateFee("FIX0045","PMTMEC_F","FINAL",subTotalItem45,"N");
updateFee("FIX0046","PMTMEC_F","FINAL",subTotalItem46,"N");
updateFee("FIX0047","PMTMEC_F","FINAL",subTotalItem47,"N");
updateFee("FIX0048","PMTMEC_F","FINAL",subTotalItem48,"N");
updateFee("FIX0049","PMTMEC_F","FINAL",subTotalItem49,"N");
updateFee("FIX0050","PMTMEC_F","FINAL",subTotalItem50,"N");
updateFee("FIX0051","PMTMEC_F","FINAL",subTotalItem51,"N");
updateFee("FIX0052","PMTMEC_F","FINAL",subTotalItem52,"N");
updateFee("FIX0053","PMTMEC_F","FINAL",subTotalItem53,"N");
updateFee("FIX0054","PMTMEC_F","FINAL",subTotalItem54,"N");
updateFee("FIX0055","PMTMEC_F","FINAL",subTotalItem55,"N");
updateFee("FIX0056","PMTMEC_F","FINAL",subTotalItem56,"N");
updateFee("FIX0057","PMTMEC_F","FINAL",subTotalItem57,"N");
updateFee("FIX0058","PMTMEC_F","FINAL",subTotalItem58,"N");
updateFee("FIX0059","PMTMEC_F","FINAL",subTotalItem59,"N");