/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update Before
 * Event Description:- The before event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateBeforeV3.0.js
 * Record Type:- WTUB;LICENSES!*!*!*.js
 *
 * Greg Soter, Futurenet Group, Inc.
 *    
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
if (wfTask == "License Issuance" && wfStatus == "Issued" && balanceDue > 0) {
    showMessage = true;
    cancel = true;
    comment("Cannot issue this license with a balance greater than zero");
}