//PRA:BUSINESSLICENSE/LODGING/HOTEL/APPLICATION
//PRA;BUSINESSLICENSE!LODGING!HOTEL!APPLICATION
//When Payment is made in full; update the Fees task = Fee Payment Received on the Application record BUSA
if ((balanceDue == 0) && !isTaskActive("Application Intake")) {
	closeTask("Fees","Fee Payment Received","Updated via Script","Updated via Script");
	activateTask("Clearance Review Cycle");
	}