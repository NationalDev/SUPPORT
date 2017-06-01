/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Payment Receive After
 * Event Description:- The after event for when Citizen Access records payment allocation.
 * MasterScript:- PaymentReceiveAfterV3.0.js
 * Record Type:- PRA;LICENSES!~!~!RENEWAL.js
 *  
 * Updates license record when business license renewal fee is paid. 
 *
 * Greg Soter, FutureNet Group, Inc. 
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//PRA;LICENSES!~!~!RENEWAL.js
//PRA:LICENSES/*/*/RENEWAL
if (balanceDue <= 0 && isTaskActive("Renewal Intake")) {
    closeTask("Renewal Intake","Fees Paid","updated via script",null);
}