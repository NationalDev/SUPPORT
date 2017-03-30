/*
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * Event Name: ApplicationSpecificInfoUpdateAfter
 * Event Description: Citizen Access - The after event for converting a partial record ID to a real record ID.
 * Master Script: ApplicationSpecificInfoUpdateAfter
 *
 * Record Type: CodeEnforcement/Inspections/Commercial/Property (Property Maintenance Inspection)
 * 09/01/2016 Abhishek Jain, FutureNet Group, Inc.  
 */ 

// Custom Field Group - ENFANN_CF	 
// Custom Field Sub Group - ANN_GENERAL, PMB_GENERAL	
// Custom Field Name - Fee Class , Square Ft , Type of Use , Stories	 
// Fee Code - ENFANN_F
// Fee Item Code - ANN005



if(AInfo["Property Type"] == "Commercial")
{
var SquareFeet = parseInt (AInfo["Commercial Square Ft"]);
var Building = parseInt (AInfo["No. Addl Bldgs"]);
var Fees1 = 0;    // For Sq. Ft - Calculation 1
var Fees2 = 0;    // For Sq. Ft - Calculation 2
var Fees3 = 0;    // For Sq. Ft - Calculation 3
var Fees4 = 0;    // For Sq. Ft - Calculation 4
var ReminderFeet = 0;
var Factor = 0;

if ((AInfo["Fee Class"] == "Church") || (AInfo["Fee Class"] == "Self-Service Laundry") || ( AInfo["Fee Class"] == "Dance Hall") || 
( AInfo["Fee Class"] == "Cabaret") || ( AInfo["Fee Class"] == "Commercial Rec. Bldg") || ( AInfo["Fee Class"] == "Theatre") || 
( AInfo["Fee Class"] == "Public Assembly") || ( AInfo["Fee Class"] == "Institutional Building") || ( AInfo["Fee Class"] == "Hospital") || 
( AInfo["Fee Class"] == "Convalescent Home") || ( AInfo["Fee Class"] == "School") || ( AInfo["Fee Class"] == "College") || 
( AInfo["Fee Class"] == "Dance Studio") || ( AInfo["Fee Class"] == "Factory") || ( AInfo["Fee Class"] == "Commercial") ||
( AInfo["Fee Class"] == "Office Building"))      // Sq. Ft - Calculation 1
{
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 5000 ){
	Fees1 = 208;
	}
	else if ( SquareFeet > 5000 && SquareFeet <= 10000 ){
        Fees1 = 245;
	} 
	else if ( SquareFeet > 10000 && SquareFeet <= 25000 ){
        Fees1 = 312;
	} else if ( SquareFeet > 25000 && SquareFeet <= 50000 ){
        Fees1 = 342;
	} else if ( SquareFeet > 50000 && SquareFeet <= 75000 ){
		Fees1 = 372;
	} else if ( SquareFeet > 75000 && SquareFeet <= 100000 ){
		Fees1 = 402;
	} else{
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 50000);
	Fees1 = 402 + ( Factor * 100);
	}
 }
 else if ((AInfo["Fee Class"] == "Group Buildings"))      // For additional Building
 {
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 5000 ){
	Fees1 = 208;
	}
	else if ( SquareFeet > 5000 && SquareFeet <= 10000 ){
        Fees1 = 245;
	} 
	else if ( SquareFeet > 10000 && SquareFeet <= 25000 ){
        Fees1 = 312;
	} else if ( SquareFeet > 25000 && SquareFeet <= 50000 ){
        Fees1 = 342;
	} else if ( SquareFeet > 50000 && SquareFeet <= 75000 ){
		Fees1 = 372;
	} else if ( SquareFeet > 75000 && SquareFeet <= 100000 ){
		Fees1 = 402;
	} else{
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 50000);
	Fees1 = 402 + ( Factor * 100);
	}
	Fees1 = Fees1 + ( 134 * Building );
 }
  else if ((AInfo["Fee Class"] == "Parking Lot"))      // For Sq. Ft - Calculation 2
 {
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 10000 ){
	Fees2 = 185;
	}
	else if ( SquareFeet > 10000 && SquareFeet <= 50000 ){
        Fees2 = 210;
	} else if ( SquareFeet > 50000 && SquareFeet <= 100000 ){
		Fees2 = 240;
	} else {
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 100000);
	Fees2 = 240 + ( Factor * 30);
	
	}
 }
 else if ((AInfo["Fee Class"] == "Stripmall"))     // For Sq. Ft - Calculation 3
 {
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 5000 ){
	Fees3 = 171;
	}
	else if ( SquareFeet > 5000 && SquareFeet <= 10000 ){
        Fees3 = 245;
	} 
	else if ( SquareFeet > 10000 && SquareFeet <= 25000 ){
        Fees3 = 312;
	} else if ( SquareFeet > 25000 && SquareFeet <= 50000 ){
        Fees3 = 342;
	} else if ( SquareFeet > 50000 && SquareFeet <= 75000 ){
		Fees3 = 372;
	} else if ( SquareFeet > 75000 && SquareFeet <= 100000 ){
		Fees3 = 402;
	} else{
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 50000);
	Fees3 = 402 + ( Factor * 100);
	}
 }
  else if ((AInfo["Fee Class"] == "Junk Yard") || (AInfo["Fee Class"] == "Scrap Yard") || (AInfo["Fee Class"] == "Open Storage Yard"))     // For Sq. Ft - Calculation 4
 {
	ReminderFeet = 0;
	Factor = 0;
	if( SquareFeet <= 5000 ){
	Fees4 = 185;
	}
	else if ( SquareFeet > 5000 && SquareFeet <= 10000 ){
        Fees4 = 200;
	} 
	else if ( SquareFeet > 10000 && SquareFeet <= 50000 ){
        Fees4 = 240;
	} else if ( SquareFeet > 50000 && SquareFeet <= 100000 ){
        Fees4 = 320;
	} else {
	ReminderFeet = SquareFeet - 100000;
	Factor = Math.ceil(ReminderFeet / 40000);
	Fees4 = 320 + ( Factor * 32);
	}
 }
 
 
 if ( AInfo["Fee Class"] == "Church")
		updateFee("ANN005", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Self-Service Laundry") 
		updateFee("ANN006", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Dance Hall") 
		updateFee("ANN007", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Cabaret") 
		updateFee("ANN008", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Commercial Rec. Bldg") 
		updateFee("ANN009", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Theatre") 
		updateFee("ANN010", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Public Assembly") 
		updateFee("ANN011", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Institutional Building") 
		updateFee("ANN012", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Hospital") 
		updateFee("ANN013", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Convalescent Home") 
		updateFee("ANN014", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "School") 
		updateFee("ANN015", "ENFANN_F", "FINAL", Fees1, "N"); 
	else if ( AInfo["Fee Class"] == "College") 
		updateFee("ANN016", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Dance Studio") 
		updateFee("ANN017", "ENFANN_F", "FINAL", Fees1, "N"); 
	else if ( AInfo["Fee Class"] == "Factory") 
		updateFee("ANN018", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Commercial") 
		updateFee("ANN019", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Office Building") 
		updateFee("ANN020", "ENFANN_F", "FINAL", Fees1, "N");
    else if ( AInfo["Fee Class"] == "Group Buildings") 
		updateFee("ANN021", "ENFANN_F", "FINAL", Fees1, "N");
	else if ( AInfo["Fee Class"] == "Parking Lot") 
		updateFee("ANN022", "ENFANN_F", "FINAL", Fees2, "N");
	else if ( AInfo["Fee Class"] == "Stripmall") 
		updateFee("ANN023", "ENFANN_F", "FINAL", Fees3, "N");
	else if ( AInfo["Fee Class"] == "Junk Yard") 
		updateFee("ANN029", "ENFANN_F", "FINAL", Fees4, "N");
	else if ( AInfo["Fee Class"] == "Scrap Yard") 
		updateFee("ANN030", "ENFANN_F", "FINAL", Fees4, "N");
	else if ( AInfo["Fee Class"] == "Open Storage Yard") 
		updateFee("ANN031", "ENFANN_F", "FINAL", Fees4, "N");
}
		
else if(AInfo["Property Type"] == "Residential")
{
	var RSquareFeet = parseInt (AInfo["Residential Square Ft"]);
	var Stories = parseInt (AInfo["Residential Stories"]);
	var SleepingUnits = parseInt (AInfo["No. of Sleeping Units"]);
	var TotalUnits = parseInt (AInfo["Total Units"]);
	var UnitsRented = parseInt (AInfo["Units Rented"]);
	
	var ReminderFeet = 0;
    var Factor = 0;
	var Fees5 = 0;    
    var Fees6 = 0;   
	var Fees7 = 0;    
    var Fees8 = 0;   
	var Fees9 = 0;    
    var Fees10 = 0;   
	if ( AInfo["Type of Use"] == "Condominium" || AInfo["Type of Use"] == "Cooperative")
	{
		if ( Stories <= 2)
		Fees5 = 185;
		else
		Fees5 = ((Stories - 2) * 40 ) + 185;
	}
	else if ( AInfo["Type of Use"] == "Townhouse" || AInfo["Type of Use"] == "Terrace" || AInfo["Type of Use"] == "Shelters" ||
	AInfo["Type of Use"] == "Loft" || AInfo["Type of Use"] == "Hotel" || AInfo["Type of Use"] == "Motel" || AInfo["Type of Use"] == "Rooming House" 
	|| AInfo["Type of Use"] == "Apartment" || AInfo["Type of Use"] == "Adult Foster Care" || AInfo["Type of Use"] == "Community Center"
	|| AInfo["Type of Use"] == "Pre-Release Adjustment Center" )
	{
		ReminderFeet = 0;
	    Factor = 0;
		if ( RSquareFeet <= 5000)
		{
		Fees6 = 310;
		}
		else
		{
		ReminderFeet = RSquareFeet - 5000;
	    Factor = Math.ceil(ReminderFeet / 5000);
	    Fees6 = 310 + ( Factor * 80);
		}
	}
	else if ( AInfo["Type of Use"] == "Room and Board")
	{
		if ( TotalUnits == 1)
		Fees7 = 150;
		else
		Fees7 = ((TotalUnits - 1) * 80 ) + 150;
	}
	else if ( AInfo["Type of Use"] == "Single Family Dwelling")
	{
		if ( AInfo["Owner Occupied"] == "No" || AInfo["Owner Occupied"] == "no")
		Fees8 = 150;	
		else
		Fees8 = 0;
	}
	else if ( AInfo["Type of Use"] == "Two Family Dwelling")
	{
	    if ( AInfo["Owner Occupied"] == "No" || AInfo["Owner Occupied"] == "no")
		Fees9 = 230;	
		else
		Fees9 = 150;
		
	}
	else if ( AInfo["Type of Use"] == "Three Family Dwelling")
	{
	    if ( AInfo["Owner Occupied"] == "No" || AInfo["Owner Occupied"] == "no")
		{
		    ReminderFeet = 0;
	        Factor = 0;
		    if ( RSquareFeet <= 5000)
		    {
		     Fees10 = 310;
		    }
		    else
		    {
		     ReminderFeet = RSquareFeet - 5000;
	         Factor = Math.ceil(ReminderFeet / 5000);
	         Fees10 = 310 + ( Factor * 80);
		    }
		}
		else
		{
			if ( UnitsRented == 2)
			 {
			  Fees10 = 230;
			 }
			 else if ( UnitsRented == 1)
			 {
			   Fees10 = 150;
			 }
		}
		
		
	}
	
	if ( AInfo["Type of Use"] == "Condominium" || AInfo["Type of Use"] == "Cooperative") 
		updateFee("ANN034", "ENFANN_F", "FINAL", Fees5, "N");
	else if ( AInfo["Type of Use"] == "Townhouse" || AInfo["Type of Use"] == "Terrace") 
		updateFee("ANN040", "ENFANN_F", "FINAL", Fees6, "N");
	else if ( AInfo["Type of Use"] == "Shelters") 
		updateFee("ANN043", "ENFANN_F", "FINAL", Fees6, "N");
	else if ( AInfo["Type of Use"] == "Loft") 
		updateFee("ANN044", "ENFANN_F", "FINAL", Fees6, "N");
	else if ( AInfo["Type of Use"] == "Hotel" || AInfo["Type of Use"] == "Motel" || AInfo["Type of Use"] == "Rooming House" || 
	AInfo["Type of Use"] == "Apartment" || AInfo["Type of Use"] == "Adult Foster Care" || 
	AInfo["Type of Use"] == "Community Center" || AInfo["Type of Use"] == "Pre-Release Adjustment Center" ) 
		updateFee("ANN035", "ENFANN_F", "FINAL", Fees6, "N");
	else if ( AInfo["Type of Use"] == "Room and Board") 
		updateFee("ANN038", "ENFANN_F", "FINAL", Fees7, "N");
	else if ( AInfo["Type of Use"] == "Single Family Dwelling")
	    updateFee("ANN045", "ENFANN_F", "FINAL", Fees8, "N");
	else if ( AInfo["Type of Use"] == "Two Family Dwelling")
	    updateFee("ANN046", "ENFANN_F", "FINAL", Fees9, "N");
	else if ( AInfo["Type of Use"] == "Three Family Dwelling")
	    updateFee("ANN054", "ENFANN_F", "FINAL", Fees10, "N");   
}