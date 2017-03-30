/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: ConvertToRealCapAfter
 * Event Description: Citizen Access - The after event for converting a partial record ID to a real record ID.
 * Master Script: ConvertToRealCapAfter
 *
 * Record Type: Permits/Electrical/NA/NA (Electrical Permit)
 * 07/29/2016 Abhishek Jain, FutureNet Group, Inc.  
 *
 * --UPDATE-- 08/05/2016 Charles D. Redmond, FutureNet Group, Inc.
 * Now declaring one array instead of declaring two sets of 64 integers.
 * Import fee schedule into an array of fee objects of type RFeeItemScriptModel
 * Added loop to find "Fixture Type" match with "Fee Description"
 * Added updateFee() loop inside of the Custom List check. No need to update anything but Base Fee if there is no CL
 * Added copyGisObjects(). Should be in every ASA in PERMITS
 *
 */ 

//---CHANGE PARAMETERS BELOW TO MATCH RECORD TYPE CONFIG-----------------------------------------//
var feeSched = "PMTELE_F";
var baseFee = "ELE0000";
var cList = ELEFIX;
//var sharedDropDown = "ELE_FIX_TYPE";   //Name of Shared Drop Down as it appears in Standard Choices
//---END PARAMETERS-------------------------------------------------------------------------------//

copyParcelGisObjects();

var feeScheduleItemArr = aa.finance.getFeeItemList(null,feeSched,null).getOutput();
var subTotalItemArr = new Array(feeScheduleItemArr.length);

updateFee(baseFee,feeSched,"FINAL",1,"N");

if (typeof(cList) == "object") {
    
    for (row in cList) {
        var fixTypeFee = cList[row]["Electrical Equipment"].toString();
        for (i=0;i<feeScheduleItemArr.length;i++) {
            
            if (row == 0) {
                subTotalItemArr[i]=0;
            }
            
            if (fixTypeFee == feeScheduleItemArr[i].getFeeDes().toString()) {
                
                subTotalItemArr[i] += parseInt(cList[row]["Quantity"]);
            }
        }
    }
    for (f=0;f<feeScheduleItemArr.length;f++) {
        
        if (subTotalItemArr[f] > 0) {
            
            updateFee(feeScheduleItemArr[f].getFeeCod().toString(),feeSched,"FINAL",parseInt(subTotalItemArr[f]),"N");
        }
    }
}


/*
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
Item60 = 0 ;
Item61 = 0 ;
Item62 = 0 ;
Item63 = 0 ;
Item64 = 0 ;
Item65 = 0 ;
Item66 = 0 ;
Item67 = 0 ;
Item68 = 0 ;
Item69 = 0 ;
Item70 = 0 ;
Item71 = 0 ;
Item72 = 0 ;
Item73 = 0 ;
Item74 = 0 ;
Item75 = 0 ;
Item76 = 0 ;
Item77 = 0 ;
Item78 = 0 ;
Item79 = 0 ;
Item80 = 0 ;
Item81 = 0 ;
Item82 = 0 ;
Item83 = 0 ;
Item84 = 0 ;
Item85 = 0 ;
Item86 = 0 ;
           
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
subTotalItem60 = 0 ;
subTotalItem61 = 0 ;
subTotalItem62 = 0 ;
subTotalItem63 = 0 ;
subTotalItem64 = 0 ;
subTotalItem65 = 0 ;
subTotalItem66 = 0 ;
subTotalItem67 = 0 ;
subTotalItem68 = 0 ;
subTotalItem69 = 0 ;
subTotalItem70 = 0 ;
subTotalItem71 = 0 ;
subTotalItem72 = 0 ;
subTotalItem73 = 0 ;
subTotalItem74 = 0 ;
subTotalItem75 = 0 ;
subTotalItem76 = 0 ;
subTotalItem77 = 0 ;
subTotalItem78 = 0 ;
subTotalItem79 = 0 ;
subTotalItem80 = 0 ;
subTotalItem81 = 0 ;
subTotalItem82 = 0 ;
subTotalItem83 = 0 ;
subTotalItem84 = 0 ;
subTotalItem85 = 0 ;
subTotalItem86 = 0 ;



if(typeof(ELEFIX) == "object") {
	for(row in ELEFIX) {

    if(ELEFIX[row]["Electrical Fixture"] == "A1 - Circuits"){
               Item1= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem1+= Item1

          } else if(ELEFIX[row]["Electrical Fixture"] == "A10 - Underfloor Headers for Cellular Floors, Etc."){
               Item2= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem2+= Item2

          } else if(ELEFIX[row]["Electrical Fixture"] == "A11 - Motion Picture Apparatus"){
               Item3= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem3+= Item3

          } else if(ELEFIX[row]["Electrical Fixture"] == "A12 - Sign connection to existing circuits"){
               Item4= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem4+= Item4

          } else if(ELEFIX[row]["Electrical Fixture"] == "A13 - Outline Neon Tubing - Connection"){
               Item5= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem5+= Item5

          } else if(ELEFIX[row]["Electrical Fixture"] == "A14 - Residential Unsupervised Smoke Detectors"){
               Item6= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem6+= Item6

          } else if(ELEFIX[row]["Electrical Fixture"] == "A2 - Residential Rough Inspection"){
               Item7= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem7+= Item7

          } else if(ELEFIX[row]["Electrical Fixture"] == "A3 - Fixtures"){
               Item8= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem8+= Item8

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Furnaces > 10 to 20 HP"){
               Item9= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem9+= Item9

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Furnaces > 20 to 40 HP"){
               Item10= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem10+= Item10

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Furnaces > 40 to 60 HP"){
               Item11= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem11+= Item11

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Furnaces > 60 to 75 HP"){
               Item12= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem12+= Item12

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Furnaces > 75 to 100 HP"){
               Item13= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem13+= Item13

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Furnaces >100 HP"){
               Item14= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem14+= Item14

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Furnaces 1/4 - 10 HP"){
               Item15= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem15+= Item15

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Heating and Electrical > 75 to 100 KW, KVA"){
               Item16= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem16+= Item16

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Heating and Electrical Unit > 10 to 20 KW, KVA"){
               Item17= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem17+= Item17

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Heating and Electrical Unit > 20 to 40 KW, KVA"){
               Item18= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem18+= Item18

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Heating and Electrical Unit > 40 to 60 KW, KVA"){
               Item19= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem19+= Item19

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Heating and Electrical Unit > 60 to 75 KW, KVA"){
               Item20= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem20+= Item20

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Heating and Electrical Unit >100 KW, KVA"){
               Item21= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem21+= Item21

          } else if(ELEFIX[row]["Electrical Fixture"] == "A4 - Heating and Electrical Unit 1/4 - 10 HP,KW, KVA"){
               Item22= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem22+= Item22

          } else if(ELEFIX[row]["Electrical Fixture"] == "A5 - Service Amps <600 Volts 100 or less Amperes"){
               Item23= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem23+= Item23

          } else if(ELEFIX[row]["Electrical Fixture"] == "A5 - Service Amps <600 Volts 100 to 200 amperes"){
               Item24= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem24+= Item24

          } else if(ELEFIX[row]["Electrical Fixture"] == "A5 - Service Amps <600 Volts Over 200 to 400 amperes"){
               Item25= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem25+= Item25

          } else if(ELEFIX[row]["Electrical Fixture"] == "A5 - Service Amps <600 volts Over 400 to 800 amperes"){
               Item26= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem26+= Item26

          } else if(ELEFIX[row]["Electrical Fixture"] == "A5 - Service Amps <600 volts Over 800 to 1200 amperes"){
               Item27= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem27+= Item27

          } else if(ELEFIX[row]["Electrical Fixture"] == "A5 - Service Amps >600 volts >200 amps"){
               Item28= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem28+= Item28

          } else if(ELEFIX[row]["Electrical Fixture"] == "A5 - Service Amps >600 volts 200 amps or less"){
               Item29= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem29+= Item29

          } else if(ELEFIX[row]["Electrical Fixture"] == "A6 - Interruptible Service each unit <15 KW"){
               Item30= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem30+= Item30

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - DistPan & SwtchBrds <600 Volts & <100 Amps"){
               Item31= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem31+= Item31

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - DistPan & SwtchBrds <600 Volts & >1200 Amps"){
               Item32= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem32+= Item32

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - DistPan & SwtchBrds <600 Volts & 100-200 Amps"){
               Item33= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem33+= Item33

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - DistPan & SwtchBrds <600 Volts & 200-400 Amps"){
               Item34= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem34+= Item34

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - DistPan & SwtchBrds <600 Volts & 400-800 Amps"){
               Item35= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem35+= Item35

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - DistPan & SwtchBrds <600 Volts & 800-1200 Amps"){
               Item36= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem36+= Item36

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - DistPan & SwtchBrds >600 Volts & <200 Amps"){
               Item37= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem37+= Item37

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - DistPan & SwtchBrds >600 Volts & >200 Amps"){
               Item38= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem38+= Item38

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - Transfer Switches >600 Volts, Not over 200 Amps"){
               Item39= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem39+= Item39

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - Transfer Switches >600 Volts, 200 to 400 Amps"){
               Item40= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem40+= Item40

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - Transfer Switches >600 Volts, 400 to 800 Amps"){
               Item41= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem41+= Item41

          } else if(ELEFIX[row]["Electrical Fixture"] == "A7 - Transfer Switches >600 Volts, Over 800 Amps"){
               Item42= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem42+= Item42

          } else if(ELEFIX[row]["Electrical Fixture"] == "A8 - Dryers"){
               Item43= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem43+= Item43

          } else if(ELEFIX[row]["Electrical Fixture"] == "A8 - Range & Ovens"){
               Item44= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem44+= Item44

          } else if(ELEFIX[row]["Electrical Fixture"] == "A8 - Water Heater"){
               Item45= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem45+= Item45

          } else if(ELEFIX[row]["Electrical Fixture"] == "A9 - Feeders (total number of feet)"){
               Item46= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem46+= Item46

          } else if(ELEFIX[row]["Electrical Fixture"] == "B1 - Repairs-Genral"){
               Item47= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem47+= Item47

          } else if(ELEFIX[row]["Electrical Fixture"] == "B2 - Inspection (Additional Investigation)"){
               Item48= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem48+= Item48

          } else if(ELEFIX[row]["Electrical Fixture"] == "B3 - Electrical Service Reconnect Insp <200 amps"){
               Item49= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem49+= Item49

          } else if(ELEFIX[row]["Electrical Fixture"] == "B3 - Electrical Service Reconnect Insp. Over 200 to 400 amps"){
               Item50= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem50+= Item50

          } else if(ELEFIX[row]["Electrical Fixture"] == "B3 - Electrical Service Reconnect Inspection - Addl Hr."){
               Item51= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem51+= Item51

          } else if(ELEFIX[row]["Electrical Fixture"] == "B3 - Electrical Service Reconnect Inspection > 400 amps"){
               Item52= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem52+= Item52

          } else if(ELEFIX[row]["Electrical Fixture"] == "B4 - Multi Fam & Comm Rough >20,000 to 40,000 Sq.Ft."){
               Item53= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem53+= Item53

          } else if(ELEFIX[row]["Electrical Fixture"] == "B4 - Multi Family & Comm Rough Insp <20,000 St. Ft."){
               Item54= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem54+= Item54

          } else if(ELEFIX[row]["Electrical Fixture"] == "B4 - Multi Family & Comm.Rough Insp Over 40,000 Sq. Ft."){
               Item55= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem55+= Item55

          } else if(ELEFIX[row]["Electrical Fixture"] == "B5 - Special Event Inspection - Indoor (per 100,000)"){
               Item56= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem56+= Item56

          } else if(ELEFIX[row]["Electrical Fixture"] == "B5 - Special Event Inspection - Outdoor (per hours)"){
               Item57= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem57+= Item57

          } else if(ELEFIX[row]["Electrical Fixture"] == "B6 - Ind/Comm Bldgs - Per Elec. Personnel - 13 to 20"){
               Item58= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem58+= Item58

          } else if(ELEFIX[row]["Electrical Fixture"] == "B6 - Ind/Comm Bldgs - Per Elec. Personnel - 21 to 100"){
               Item59= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem59+= Item59

          } else if(ELEFIX[row]["Electrical Fixture"] == "B6 - Ind/Comm Bldgs - Per Elec. Personnel - Over 100"){
               Item60= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem60+= Item60

          } else if(ELEFIX[row]["Electrical Fixture"] == "B6 - Ind/Comm Bldgs - Per Elec. Personnel - Up to 12"){
               Item61= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem61+= Item61

          } else if(ELEFIX[row]["Electrical Fixture"] == "B7 - Annual Electrical Inspections"){
               Item62= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem62+= Item62

          } else if(ELEFIX[row]["Electrical Fixture"] == "B8 - Cert of Occ and Comp Inspection"){
               Item63= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem63+= Item63

          } else if(ELEFIX[row]["Electrical Fixture"] == "B9 - Stop Processsing"){
               Item64= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem64+= Item64

          } else if(ELEFIX[row]["Electrical Fixture"] == "C2 - Field Alteration of Fuel Pump or Dispensing Unit"){
               Item65= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem65+= Item65

          } else if(ELEFIX[row]["Electrical Fixture"] == "C2 - Fuel Pump Nozzle Alteration"){
               Item66= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem66+= Item66

          } else if(ELEFIX[row]["Electrical Fixture"] == "C2 - Fuel Pump Nozzles"){
               Item67= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem67+= Item67

          } else if(ELEFIX[row]["Electrical Fixture"] == "C4 - Signs (Tag Inspection)"){
               Item68= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem68+= Item68

          } else if(ELEFIX[row]["Electrical Fixture"] == "C5 - OutlineTubing Neon Signs (Tag Inspection)"){
               Item69= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem69+= Item69

          } else if(ELEFIX[row]["Electrical Fixture"] == "D1 - Dwelling Unit - Single"){
               Item70= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem70+= Item70

          } else if(ELEFIX[row]["Electrical Fixture"] == "D1 - Dwelling Units =>21"){
               Item71= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem71+= Item71

          } else if(ELEFIX[row]["Electrical Fixture"] == "D1 - Dwelling Units 2 - 4"){
               Item72= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem72+= Item72

          } else if(ELEFIX[row]["Electrical Fixture"] == "D1 - Dwelling Units 5 - 20"){
               Item73= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem73+= Item73

          } else if(ELEFIX[row]["Electrical Fixture"] == "D2 - Other Occupancies - 50,001 - 250,000 Sq.Ft."){
               Item74= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem74+= Item74

          } else if(ELEFIX[row]["Electrical Fixture"] == "D2 - Other Occupancies <=1,000 Sq.Ft."){
               Item75= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem75+= Item75

          } else if(ELEFIX[row]["Electrical Fixture"] == "D2 - Other Occupancies =>250,001 Sq.Ft."){
               Item76= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem76+= Item76

          } else if(ELEFIX[row]["Electrical Fixture"] == "D2 - Other Occupancies -1,001 - 50,000 Sq.Ft."){
               Item77= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem77+= Item77

          } else if(ELEFIX[row]["Electrical Fixture"] == "D3 - Rough Inspection - 1,001 - 50,000 Sq.Ft."){
               Item78= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem78+= Item78

          } else if(ELEFIX[row]["Electrical Fixture"] == "D3 - Rough Inspection - 50,001 - 250,000 Sq.Ft."){
               Item79= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem79+= Item79

          } else if(ELEFIX[row]["Electrical Fixture"] == "D3 - Rough Inspection <=1,000 Sq.Ft."){
               Item80= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem80+= Item80

          } else if(ELEFIX[row]["Electrical Fixture"] == "D3 - Rough Inspection =>250,001 Sq.Ft."){
               Item81= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem81+= Item81

          } else if(ELEFIX[row]["Electrical Fixture"] == "E1 - Solar Photovoltaic - Grid Connection Per Inverter"){
               Item82= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem82+= Item82

          } else if(ELEFIX[row]["Electrical Fixture"] == "E1 - Solar Photovoltaic - NO Connection to Utility Grid"){
               Item83= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem83+= Item83

          } else if(ELEFIX[row]["Electrical Fixture"] == "E2 - Wind Generators:Systems >5000 Watts per Inverter Connection"){
               Item84= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem84+= Item84

          } else if(ELEFIX[row]["Electrical Fixture"] == "E2 - Wind Generators:Systems 5000 Watts and Less"){
               Item85= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem85+= Item85

          } else if(ELEFIX[row]["Electrical Fixture"] == "E2 - Wind Generators:Systems Greater than 5000 Watts"){
               Item86= parseInt(ELEFIX[row]["Quantity"]);
               subTotalItem86+= Item86


        }

    
    }
}


updateFee("ELE0000","PMTELE_F","FINAL",1,"N");  //Basic Electrical Permit Application fee

updateFee("FIX0002","PMTELE_F","FINAL",subTotalItem1,"N");
updateFee("FIX0030","PMTELE_F","FINAL",subTotalItem2,"N");
updateFee("FIX0031","PMTELE_F","FINAL",subTotalItem3,"N");
updateFee("FIX0032","PMTELE_F","FINAL",subTotalItem4,"N");
updateFee("FIX0033","PMTELE_F","FINAL",subTotalItem5,"N");
updateFee("FIX0034","PMTELE_F","FINAL",subTotalItem6,"N");
updateFee("FIX0003","PMTELE_F","FINAL",subTotalItem7,"N");
updateFee("FIX0001","PMTELE_F","FINAL",subTotalItem8,"N");
updateFee("FIX0053","PMTELE_F","FINAL",subTotalItem9,"N");
updateFee("FIX0054","PMTELE_F","FINAL",subTotalItem10,"N");
updateFee("FIX0055","PMTELE_F","FINAL",subTotalItem11,"N");
updateFee("FIX0056","PMTELE_F","FINAL",subTotalItem12,"N");
updateFee("FIX0057","PMTELE_F","FINAL",subTotalItem13,"N");
updateFee("FIX0058","PMTELE_F","FINAL",subTotalItem14,"N");
updateFee("FIX0052","PMTELE_F","FINAL",subTotalItem15,"N");
updateFee("FIX0099","PMTELE_F","FINAL",subTotalItem16,"N");
updateFee("FIX0095","PMTELE_F","FINAL",subTotalItem17,"N");
updateFee("FIX0096","PMTELE_F","FINAL",subTotalItem18,"N");
updateFee("FIX0097","PMTELE_F","FINAL",subTotalItem19,"N");
updateFee("FIX0098","PMTELE_F","FINAL",subTotalItem20,"N");
updateFee("FIX0100","PMTELE_F","FINAL",subTotalItem21,"N");
updateFee("FIX0094","PMTELE_F","FINAL",subTotalItem22,"N");
updateFee("FIX0011","PMTELE_F","FINAL",subTotalItem23,"N");
updateFee("FIX0012","PMTELE_F","FINAL",subTotalItem24,"N");
updateFee("FIX0013","PMTELE_F","FINAL",subTotalItem25,"N");
updateFee("FIX0014","PMTELE_F","FINAL",subTotalItem26,"N");
updateFee("FIX0015","PMTELE_F","FINAL",subTotalItem27,"N");
updateFee("FIX0016","PMTELE_F","FINAL",subTotalItem28,"N");    //  FIX0036 is having same description
updateFee("FIX0035","PMTELE_F","FINAL",subTotalItem29,"N");
updateFee("FIX0017","PMTELE_F","FINAL",subTotalItem30,"N");
updateFee("FIX0018","PMTELE_F","FINAL",subTotalItem31,"N");
updateFee("FIX0023","PMTELE_F","FINAL",subTotalItem32,"N");
updateFee("FIX0019","PMTELE_F","FINAL",subTotalItem33,"N");
updateFee("FIX0020","PMTELE_F","FINAL",subTotalItem34,"N");
updateFee("FIX0021","PMTELE_F","FINAL",subTotalItem35,"N");
updateFee("FIX0022","PMTELE_F","FINAL",subTotalItem36,"N");
updateFee("FIX0024","PMTELE_F","FINAL",subTotalItem37,"N");
updateFee("FIX0025","PMTELE_F","FINAL",subTotalItem38,"N");
updateFee("FIX0115","PMTELE_F","FINAL",subTotalItem39,"N");
updateFee("FIX0116","PMTELE_F","FINAL",subTotalItem40,"N");
updateFee("FIX0117","PMTELE_F","FINAL",subTotalItem41,"N");
updateFee("FIX0118","PMTELE_F","FINAL",subTotalItem42,"N");
updateFee("FIX0027","PMTELE_F","FINAL",subTotalItem43,"N");
updateFee("FIX0026","PMTELE_F","FINAL",subTotalItem44,"N");
updateFee("FIX0028","PMTELE_F","FINAL",subTotalItem45,"N");
updateFee("FIX0029","PMTELE_F","FINAL",subTotalItem46,"N");
updateFee("ELE0042","PMTELE_F","FINAL",subTotalItem47,"N");
updateFee("ELE0012","PMTELE_F","FINAL",subTotalItem48,"N");
updateFee("ELE0014","PMTELE_F","FINAL",subTotalItem49,"N");
updateFee("ELE0015","PMTELE_F","FINAL",subTotalItem50,"N");
updateFee("ELE0017","PMTELE_F","FINAL",subTotalItem51,"N");
updateFee("ELE0016","PMTELE_F","FINAL",subTotalItem52,"N");
updateFee("ELE0032","PMTELE_F","FINAL",subTotalItem53,"N");
updateFee("ELE0035","PMTELE_F","FINAL",subTotalItem54,"N");
updateFee("ELE0047","PMTELE_F","FINAL",subTotalItem55,"N");
updateFee("ELE0029","PMTELE_F","FINAL",subTotalItem56,"N");
updateFee("ELE0030","PMTELE_F","FINAL",subTotalItem57,"N");
updateFee("ELE0025","PMTELE_F","FINAL",subTotalItem58,"N");
updateFee("ELE0026","PMTELE_F","FINAL",subTotalItem59,"N");
updateFee("FIX0119","PMTELE_F","FINAL",subTotalItem60,"N");
updateFee("ELE0024","PMTELE_F","FINAL",subTotalItem61,"N");
updateFee("ELE0002","PMTELE_F","FINAL",subTotalItem62,"N");
updateFee("ELE0004","PMTELE_F","FINAL",subTotalItem63,"N");
updateFee("MIS0002","PMTELE_F","FINAL",subTotalItem64,"N");
updateFee("ELE0001","PMTELE_F","FINAL",subTotalItem65,"N");
updateFee("FIX0120","PMTELE_F","FINAL",subTotalItem66,"N");
updateFee("FIX0121","PMTELE_F","FINAL",subTotalItem67,"N");
updateFee("ELE0034","PMTELE_F","FINAL",subTotalItem68,"N");
updateFee("ELE0033","PMTELE_F","FINAL",subTotalItem69,"N");
updateFee("ELE0007","PMTELE_F","FINAL",subTotalItem70,"N");
updateFee("ELE0010","PMTELE_F","FINAL",subTotalItem71,"N");
updateFee("ELE0008","PMTELE_F","FINAL",subTotalItem72,"N");
updateFee("ELE0009","PMTELE_F","FINAL",subTotalItem73,"N");
updateFee("FIX0122","PMTELE_F","FINAL",subTotalItem74,"N");
updateFee("ELE0019","PMTELE_F","FINAL",subTotalItem75,"N");
updateFee("FIX0123","PMTELE_F","FINAL",subTotalItem76,"N");
updateFee("FIX0124","PMTELE_F","FINAL",subTotalItem77,"N");
updateFee("ELE0044","PMTELE_F","FINAL",subTotalItem78,"N");
updateFee("ELE0045","PMTELE_F","FINAL",subTotalItem79,"N");
updateFee("ELE0043","PMTELE_F","FINAL",subTotalItem80,"N");
updateFee("ELE0046","PMTELE_F","FINAL",subTotalItem81,"N");
updateFee("ELE0037","PMTELE_F","FINAL",subTotalItem82,"N");
updateFee("ELE0038","PMTELE_F","FINAL",subTotalItem83,"N");
updateFee("ELE0041","PMTELE_F","FINAL",subTotalItem84,"N");
updateFee("ELE0039","PMTELE_F","FINAL",subTotalItem85,"N");
updateFee("ELE0040","PMTELE_F","FINAL",subTotalItem86,"N");
*/


