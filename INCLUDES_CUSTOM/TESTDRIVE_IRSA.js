/**
 * This function is used for TestDrive for IRSA
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function TESTDRIVE_IRSA() {
	if (appMatch("Building/Residential/Electrical/NA")  && inspType == "Electrical Final" && inspResult == "Passed") {
		closeTask("Meter Release","Meter Released","Updated by Inspection Result","Note");
	}
	
	if (appMatch("Licenses/Business/Restaurant/Application")  && inspType == "Business License Inspection" && inspResult == "Passed") {
		closeTask("License Issuance","Issued","Updated by Inspection Result","Note");
	}
}