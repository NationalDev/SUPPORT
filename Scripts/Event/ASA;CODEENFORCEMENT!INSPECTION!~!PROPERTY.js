/**
 * To calculate and assess fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Subbmittal
 * Master Script:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;CODEENFORCEMENT!INSPECTION!~PROPERTY.js
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

/*
ASA;CODEENFORCEMENT!INSPECTION!~!PROPERTY
ASA:CODEENFORCEMENT/INSPECTION/./PROPERTY   //	0/1/2/3
upon submission of parent Property record, create the child Property Inspection record
*/
//var pRecord = capId;
//var appName = getAppSpecific(AInfo["Location"],pRecord);
//if (appMatch(appTypeArray[2] == "Commercial")) {
//	cRecord = createChild("CodeEnforcement","Inspections","Commercial","NA",appName); //auto copies APO, Contacts from pRec, appName (location)
//	copyAppSpecific(pRecord);
//	}
//if (appMatch(appTypeArray[2] == "Residential")) {
//	cRecord = createChild("CodeEnforcement","Inspections","Residential","NA",appName); //auto copies APO, Contacts from pRec, appName (location)
//	copyAppSpecific(pRecord);
//	}