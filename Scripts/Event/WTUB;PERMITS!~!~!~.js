/*
 * To verify all fees have been paid before issuance
 * Event Name: WorkflowTaskUpdateBefore
 * Event Description: The before event for issuing a permit
 * Master Script: WorkflowTaskUpdateBeforeV3.0
 *
 * Record Type: Permits/~/~/~ (All Permits)
 * 08/11/2016 Greg Soter, FutureNet Group, Inc.
 *
 */

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && balanceDue > 0) {
    showMessage = true;
    
    comment("Cannot issue this permit with a balance greater than zero");
    
    cancel = true;
}
