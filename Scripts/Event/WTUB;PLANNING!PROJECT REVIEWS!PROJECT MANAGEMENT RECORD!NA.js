/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update Before
 * Event Description:- The before event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateBeforeV3.0.js
 * Record Type:- WTUB;LICENSES!PLANNING!PROJECT REVIEWS!PROJECT MANAGEMENT RECORD.js
 *
 * Greg Soter, Futurenet Group, Inc.
 *    
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
if (wfTask == "Issuance" && wfStatus == "Permit Issued" && balanceDue > 0) {
    showMessage = true;
    cancel = true;
    comment("Cannot issue this permit with a balance greater than zero");
}
if (wfTask == "L and P Buildings Counter" && wfStatus == "Fees Collected" && balanceDue > 0) {
    showMessage = true;
    cancel = true;
    comment("Cannot set this status with a balance greater than zero");
}