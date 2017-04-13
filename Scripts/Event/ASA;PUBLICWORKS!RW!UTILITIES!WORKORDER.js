/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Submittal
 * MasterScript:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;PUBLICWORKS!RW!UTILITIES!WORKORDER.js
 * 
 * Greg Soter, FutureNet Group, Inc.
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//Repurposed {Building Count} field from Additional Info tab to Length of Work in linear feet
if (getAppSpecific("WORK_LENGTH") > 0) { 
   editBuildingCount(getAppSpecific("WORK_LENGTH"));
}