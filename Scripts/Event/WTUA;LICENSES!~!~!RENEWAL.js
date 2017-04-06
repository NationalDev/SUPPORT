//WTUA;PUBLICWORKS!RW_USE!VALET_ANNUAL!RENEWAL.js
//Iman Sallam, City of Detroit
//Deploy with the script code and script title below (all caps)
//WTUA:LICENSES/*/*/RENEWAL
if (wfTask == "License Issuance" && wfStatus == "Renewed") {
    newLic = null;
    newLicId = null;
    newLicIdString = null;
    newLicenseType = appTypeArray[2];
    monthsToInitialExpire = 12;
    newLicId = getParentCapID4Renewal();
    // create the permit record;
    if (newLicId) {
        //newLicIdString = newLicId.getCustomID();
        updateAppStatus("Issued","Originally Issued",newLicId);
        copyAppSpecific(newLicId,"");
        copyASITables(capId,newLicId);
        }
    
//------------------ Update receords with new expiration --------------------------------
    
    
    tmpNewDate = new Date();
    
    if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "Contractor Registration") {

        thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
//           thisMonth = tmpNewDate.getMonth();
//           if (thisMonth > 7) {
//            thisYear += 4;     //thisYear = thisYear + 1;
//        }
            thisYear +=3;
            newExpDate = "08/31/"+thisYear.toString();

        if (newLicId) {
            thisLic = new licenseObject(newLicIdString,newLicId);
            thisLic.setExpiration(dateAdd(newExpDate,0));
            thisLic.setStatus("Active");
            }
    }
//-----------------------------------------
    if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "Apprentice") {

        thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
        thisMonth = tmpNewDate.getMonth();
        if (thisMonth > 7) {
            thisYear += 1;     //thisYear = thisYear + 1;
        }
        	newExpDate = "08/31/"+thisYear.toString();
        	if (newLicId) {
                thisLic = new licenseObject(newLicIdString,newLicId);
                thisLic.setExpiration(dateAdd(newExpDate,0));
                thisLic.setStatus("Active");
                }
    }    
//-------------------------------------------
    if (appTypeArray[1] == "Plumbing" && appTypeArray[2] == "Contractor Registration") {

        thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
//           thisMonth = tmpNewDate.getMonth();
//           if (thisMonth > 7) {
//           thisYear += 4;     //thisYear = thisYear + 1;
//
//        }
            thisYear +=3;
            newExpDate = "04/30/"+thisYear.toString();

        if (newLicId) {
            thisLic = new licenseObject(newLicIdString,newLicId);
            thisLic.setExpiration(dateAdd(newExpDate,0));
            thisLic.setStatus("Active");
            }
    }  
//-----------------------------------------------
    if (appTypeArray[1] == "Boiler" && appTypeArray[2] == "Contractor Registration") {

        thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
//            thisMonth = tmpNewDate.getMonth();
//            if (thisMonth > 7) {
//            thisYear += 4;     //thisYear = thisYear + 1;//
//        }
            thisYear +=3;
            newExpDate = "12/31/"+thisYear.toString();

        if (newLicId) {
            thisLic = new licenseObject(newLicIdString,newLicId);
            thisLic.setExpiration(dateAdd(newExpDate,0));
            thisLic.setStatus("Active");
            }
    }    
//-----------------------------------------------     
    if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "Occupational") {

        thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
           
        monthsToInitialExpire = 12;
           tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
           if (newLicId) {
               thisLic = new licenseObject(newLicIdString,newLicId);
               thisLic.setExpiration(dateAdd(tmpNewDate,0));
               thisLic.setStatus("Active");
               }
    }  
//-------------------------------------------------------------------   
    if (appTypeArray[1] == "Building" && appTypeArray[2] == "ContractorRegistration") {

        thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
//        thisMonth = tmpNewDate.getMonth();
//        if (thisMonth > 7) {
//            thisYear += 1;     //thisYear = thisYear + 1;
//        }
        	newExpDate = "12/31/"+thisYear.toString();
        	if (newLicId) {
                thisLic = new licenseObject(newLicIdString,newLicId);
                thisLic.setExpiration(dateAdd(newExpDate,0));
                thisLic.setStatus("Active");
                }
    }    else if (appTypeArray[1] == "Building" && appTypeArray[2] == "Sign-AwingContractor") {
	    	thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
	//      thisMonth = tmpNewDate.getMonth();
	//      if (thisMonth > 7) {
	//          thisYear += 1;     //thisYear = thisYear + 1;
	//      }
	      	newExpDate = "12/31/"+thisYear.toString();
	      	if (newLicId) {
	              thisLic = new licenseObject(newLicIdString,newLicId);
	              thisLic.setExpiration(dateAdd(newExpDate,0));
	              thisLic.setStatus("Active");
	              }
    }    else if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "Contractor") {
    		thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
    	//      thisMonth = tmpNewDate.getMonth();
    	//      if (thisMonth > 7) {
    	//          thisYear += 1;     //thisYear = thisYear + 1;
    	//      }
    	      	newExpDate = "12/31/"+thisYear.toString();
    	      	if (newLicId) {
    	              thisLic = new licenseObject(newLicIdString,newLicId);
    	              thisLic.setExpiration(dateAdd(newExpDate,0));
    	              thisLic.setStatus("Active");
    	              }
     }	 else if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "ContractorRegistration") {
	    	thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
	    	//      thisMonth = tmpNewDate.getMonth();
	    	//      if (thisMonth > 7) {
	    	//          thisYear += 1;     //thisYear = thisYear + 1;
	    	//      }
	    	      	newExpDate = "12/31/"+thisYear.toString();
	    	      	if (newLicId) {
	    	              thisLic = new licenseObject(newLicIdString,newLicId);
	    	              thisLic.setExpiration(dateAdd(newExpDate,0));
	    	              thisLic.setStatus("Active");
	    	              }
	 }	 else if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "Masters-Journeyman") {
	    	thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
	    	//      thisMonth = tmpNewDate.getMonth();
	    	//      if (thisMonth > 7) {
	    	//          thisYear += 1;     //thisYear = thisYear + 1;
	    	//      }
	    	      	newExpDate = "12/31/"+thisYear.toString();
	    	      	if (newLicId) {
	    	              thisLic = new licenseObject(newLicIdString,newLicId);
	    	              thisLic.setExpiration(dateAdd(newExpDate,0));
	    	              thisLic.setStatus("Active");
	    	              }
	    	      	
	 }	  else if (appTypeArray[1] == "Contractor" && appTypeArray[2] == "Mechanical") {
	    	thisYear = parseInt(tmpNewDate.getYear().toString())+1900;
	    	//      thisMonth = tmpNewDate.getMonth();
	    	//      if (thisMonth > 7) {
	    	//          thisYear += 1;     //thisYear = thisYear + 1;
	    	//      }
	    	      	newExpDate = "07/11/"+thisYear.toString();
	    	      	if (newLicId) {
	    	              thisLic = new licenseObject(newLicIdString,newLicId);
	    	              thisLic.setExpiration(dateAdd(newExpDate,0));
	    	              thisLic.setStatus("Active");
	    	              }
	 else {		 
		 }   
	 } 
    
  
    
}