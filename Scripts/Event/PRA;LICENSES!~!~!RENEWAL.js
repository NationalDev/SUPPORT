//PRA;LICENSES!~!~!RENEWAL.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//PRA:LICENSES/*/*/RENEWAL
if (balanceDue <= 0 && isTaskActive("Renewal Intake")) {
    closeTask("Renewal Intake","Fees Paid","updated via script",null);
}