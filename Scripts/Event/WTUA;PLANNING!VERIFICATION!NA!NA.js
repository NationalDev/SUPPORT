//WTUA:PLANNING/VERIFICATION/NA/NA
//This record type handles 5 separate business processes per the value selected from the 'Verification Type' Custom Field (CF) dropdown list.
//Accela, Inc. 01.14.2016 V1.0 CIH
//PLNVER_W
//Accela, Inc. 01.20.2016 V2.0 CIH 
//PLNVER2_W - workflow is much more intuitive with TWO Intake tasks: Completed and Completed - Ready for Review	
//
if ((wfTask == "Intake" && wfStatus == "Completed - Ready for Review") && ((AInfo["Verification Type"]) == "Auto Dealer")) {
	deactivateTask("MLCC Review");
	//deactivateTask("Neighborhood Petition Verification");
	//deactivateTask("Neighborhood Petition Letter");
	activateTask("Zoning Review");
	activateTask("Business License Review");
	}
//tested good 1/19/2016; 1/20/2016
	
if ((wfTask == "Intake" && wfStatus == "Completed - Ready for Review") && ((AInfo["Verification Type"]) == "Michigan Liquor Control Commission")) {
	deactivateTask("Zoning Review");
	deactivateTask("Business License Review");
	activateTask("MLCC Review");
	}
//tested good 1/19/2016; 1/20/2016		
	
if ((wfTask == "Intake" && wfStatus == "Completed") && ((AInfo["Verification Type"]) == "Neighborhood Petition")) {
	deactivateTask("MLCC Review");
	activateTask("Neighborhood Petition Verification");
	}
//tested good 1/19/2016; 1/20/2016
	
if ((wfTask == "Intake" && wfStatus == "Completed") && ((AInfo["Verification Type"]) == "Zoning Interpretation")) {
	//deactivateTask("MLCC Review");
	deactivateTask("Neighborhood Petition Verification");
	deactivateTask("Neighborhood Petition Letter");
	//deactivateTask("Zoning Review");
	//deactivateTask("Business License Review");
	deactivateTask("Scan Final Letter");
	deactivateTask("Mail Final Letter");
	activateTask("Closed");
	closeTask("Closed","Closed","Zoning Interpretation Completed","Closed by script");
	}	
//tested good 1/19/2016; 1/20/2016	

if ((wfTask == "Intake" && wfStatus == "Completed") && ((AInfo["Verification Type"]) == "Zoning Verification Letter")) {
	//deactivateTask("MLCC Review");
	deactivateTask("Neighborhood Petition Verification");
	deactivateTask("Neighborhood Petition Letter");
	//deactivateTask("Zoning Review");
	//deactivateTask("Business License Review");
	activateTask("Scan Final Letter");
	}
//tested good 1/19/2016; 1/20/2016	

if ((wfTask == "MLCC Review" && wfStatus == "MLCC - Local Opinion Sent to State") && ((AInfo["Verification Type"]) == "Michigan Liquor Control Commission")) {
	//deactivateTask("Neighborhood Petition Verification");
	//deactivateTask("Neighborhood Petition Letter");
	//deactivateTask("Zoning Review");
	//deactivateTask("Business License Review");
	activateTask("Scan Final Letter");
	}
//tested good 1/20/2016		
	
if ((wfTask == "Neighborhood Petition Verification" && wfStatus == "Meets Required Signatures") && ((AInfo["Verification Type"]) == "Neighborhood Petition")) {
	closeTask("Neighborhood Petition Letter","Approved","Print Petition Verification Letter","Closed by script");
	logDebug("Print Petition Verification Letter.rpt");
	//Added while testing 1/20/2016	
	closeTask("Closed","Closed","Petition Verification Letter sent to all Contacts on record","Closed by script");
	}	
//tested good 1/20/2016; retest added closeTask on Closed task; tested good 1/20/2016
	
if ((wfTask == "Neighborhood Petition Verification" && wfStatus == "Petition Expired") && ((AInfo["Verification Type"]) == "Neighborhood Petition")) {
	closeTask("Neighborhood Petition Letter","Denied","Print Petition Denial Letter","Closed by script");
	logDebug("Print Petition Denial Letter.rpt");
	//Added while testing 1/20/2016	
	closeTask("Closed","Closed","Petition Denial Letter sent to all Contacts on record","Closed by script");
	}
//tested good 1/20/2016; retest added closeTask on Closed task; tested good 1/20/2016

if ((wfTask == "Zoning Review" && wfStatus == "Approved for Dealer Class") 
	&& ((AInfo["Verification Type"]) == "Auto Dealer")
	&& !isTaskActive("Business License Review")) {
	//deactivateTask("Neighborhood Petition Verification");
	//deactivateTask("Neighborhood Petition Letter");
	//deactivateTask("Zoning Review");
	//deactivateTask("Business License Review");
	deactivateTask("Scan Final Letter");
	deactivateTask("Mail Final Letter");
	closeTask("Closed","Closed","Approved for Dealer Class","Closed by script");
	}
//tested good 1/20/2016	

if ((wfTask == "Zoning Review" && wfStatus == "Approved no Zoning Ordinance in effect for Dealer Class") 
	&& ((AInfo["Verification Type"]) == "Auto Dealer")
	&& !isTaskActive("Business License Review")) {
	//deactivateTask("Neighborhood Petition Verification");
	//deactivateTask("Neighborhood Petition Letter");
	//deactivateTask("Zoning Review");
	//deactivateTask("Business License Review");
	deactivateTask("Scan Final Letter");
	deactivateTask("Mail Final Letter");
	closeTask("Closed","Closed","Approved no Zoning Ordinance in effect for Dealer Class","Closed by script");
	}
//tested good 1/20/2016	

if ((wfTask == "Business License Review" && wfStatus == "Meets Reqs for Dealer Class") 
	&& ((AInfo["Verification Type"]) == "Auto Dealer")
	&& !isTaskActive("Zoning Review")) {
	//deactivateTask("Neighborhood Petition Verification");
	//deactivateTask("Neighborhood Petition Letter");
	//deactivateTask("Zoning Review");
	//deactivateTask("Business License Review");
	deactivateTask("Scan Final Letter");
	deactivateTask("Mail Final Letter");
	closeTask("Closed","Closed","Meets Reqs for Dealer Class","Closed by script");
	}
//tested good 1/20/2016		

if ((wfTask == "Business License Review" && wfStatus == "No Reqs in jurisdiction for Dealership Class") 
	&& ((AInfo["Verification Type"]) == "Auto Dealer")
	&& !isTaskActive("Zoning Review")) {
	//deactivateTask("Neighborhood Petition Verification");
	//deactivateTask("Neighborhood Petition Letter");
	//deactivateTask("Zoning Review");
	//deactivateTask("Business License Review");
	deactivateTask("Scan Final Letter");
	deactivateTask("Mail Final Letter");
	closeTask("Closed","Closed","No Reqs in jurisdiction for Dealership Class","Closed by script");
	}
//tested good 1/20/2016

//Added while testing 1/20/2016	
if ((wfTask == "Mail Final Letter" && wfStatus == "Sent") && ((AInfo["Verification Type"]) == "Michigan Liquor Control Commission")) {
	closeTask("Closed","Closed","MLCC Final Letter Sent","Closed by script");
	}
//test with retests; tested good 1/20/2016
