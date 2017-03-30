//WTUB;LICENSES!~!~!~.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//WTUB:LICENSES/*/*/*

if (wfTask == "License Issuance" && wfStatus == "Issued" && balanceDue > 0) {
    showMessage = true;
    cancel = true;
    comment("Cannot issue this license with a balance greater than zero");
}