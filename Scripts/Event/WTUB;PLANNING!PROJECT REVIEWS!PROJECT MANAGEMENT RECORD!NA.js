//WTUB;PLANNING!PROJECT REVIEWS!PROJECT MANAGEMENT RECORD!NA.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//WTUB:PLANNING/PROJECT REVIEWS/PROJECT MANAGEMENT RECORD/NA

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