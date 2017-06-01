/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Payment Receive After
 * Event Description:- The after event for when Citizen Access records payment allocation.
 * MasterScript:- PaymentReceiveAfterV3.0.js
 * Record Type:- PRA;BUSINESSLICENSE!LODGING!HOTEL!APPLICATION.js
 *  
 * Updates license record when business license renewal fee is paid. 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//PRA:BUSINESSLICENSE/LODGING/HOTEL/APPLICATION
//PRA;BUSINESSLICENSE!LODGING!HOTEL!APPLICATION
//When Payment is made in full; update the Fees task = Fee Payment Received on the Application record BUSA
if ((balanceDue == 0) && !isTaskActive("Application Intake")) {
	closeTask("Fees","Fee Payment Received","Updated via Script","Updated via Script");
	activateTask("Clearance Review Cycle");
}