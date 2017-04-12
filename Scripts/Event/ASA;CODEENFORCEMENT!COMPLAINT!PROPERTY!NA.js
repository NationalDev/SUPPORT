/**
 * To calculate and assess fee based on the fixtures or equipment types.
 * 
 * Event Name:- Application Submit After
 * Event Description:- After Event for Application Subbmittal
 * Master Script:- ApplicationSubmitAfterV3.0.js
 * Record Type:- ASA;CODEENFORCEMENT!COMPLAINT!PRPERTY!NA.js
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

/*
ASA;CODEENFORCEMENT!COMPLAINT!PROPERTY!NA
ASA:CODEENFORCEMENT/COMPLAINT/PROPERTY/NA
Upon submission of this specific type of complaint record, create the parent Property record
Until APO is setup and we have a function embedded to lookup Zoning District to determine if property
is Commercial or Residential, we are simply creating the Commercial Parent record for tomorrow's 3/3/16 demo purposes.
Only One PARENT PROPERTY RECORD SHOULD BE CREATED. 
*/
//var newParentRecID = createParent("CodeEnforcement","Inspections","Commercial","Property");
//logDebug("newParentRecID :" +newParentRecID);
 //auto copies APO, Contacts
//var newParentAltID = newParentRecID.getCustomID();
//logDebug("newParentALTID :" +newParentAltID);
//copyAppSpecific(newParentRecID); //Complaint Information subgroup

	

