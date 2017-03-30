/*
 * To calculate and assess permit fee based on the drop down value.
 * Event Name: ApplicationSpecificInfoUpdateAfter
 * Event Description: Citizen Access - The after event for converting a partial record ID to a real record ID.
 * Master Script: ApplicationSpecificInfoUpdateAfter
 *
 * Record Type: CodeEnforcement/Inspections/Property/Presale (Property Presale Inspection)
 * 09/09/2016 Abhishek Jain, FutureNet Group, Inc.  
 */ 

// Custom Field Group - 	 
// Custom Field Sub Group - PRE_GENERAL	
// Custom Field Name - Number of Family Units	 
// Fee Code - ENFPRE_F




if(AInfo["Number of Family Units"] == "1")
{
	updateFee("PRE0001", "ENFPRE_F", "FINAL", 1, "N");
}
else if(AInfo["Number of Family Units"] == "2")
{
	updateFee("PRE0002", "ENFPRE_F", "FINAL", 1, "N");
}