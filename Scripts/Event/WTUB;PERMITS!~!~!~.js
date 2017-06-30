/**
 * To verify all fees have been paid before issuance of the permit
 * 
 * Event Name:- Workflow Task Update Before
 * Event Description:- The before event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateBeforeV3.0.js
 * Record Type:- WTUB;PERMITS!*!*!*.js
 *
 * 08/11/2016 Greg Soter, Futurenet Group, Inc.
 *    
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */
if (wfTask == "Permit Issuance" && wfStatus == "Issued" && balanceDue > 0) {
    showMessage = true; 
    comment("Cannot issue this permit with a balance greater than zero");
    cancel = true;
}
