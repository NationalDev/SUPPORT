//ASA;PUBLICWORKS!RW!UTILITIES!WORKORDER.js
//Greg Soter, FutureNet Group, Inc.
//Deploy with the script code and script title below (all caps)
//ASA:PUBLICWORKS/RW/UTILITIES/WORKORDER.js

//Repurposed {Building Count} field from Additional Info tab to Length of Work in linear feet
if (getAppSpecific("WORK_LENGTH") > 0) { 
   editBuildingCount(getAppSpecific("WORK_LENGTH"));
}