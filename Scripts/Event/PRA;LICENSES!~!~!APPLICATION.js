//*********************************************************************************************************
//	PRA;LICENSES!~!~!APPLICATION.js																	   
//																			Iman Sallam @ City of Detroit  
//		Deploy with the script code and script title below (all caps)									   
//																								           
//					PRA:LICENSES/*/*/APPLICATION	
// 							
//			September 7th, 2017			Revision 2.0
//			September 11th, 2017			Revision 3.0
//			September 27th, 2017			Revision 3.3
//*********************************************************************************************************

var showDebug = true;
var showMessage = true;

	if (isTaskStatus("License Issuance","Issued") && balanceDue <= 0) {
		
		
			 
			newLicId =null;
			newLicIdString = null;
			monthsToInitialExpire = 12;
		
		
							
				newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
				
			
						
				logDebug(" newLicId = " + newLicId);
	
	
				
				newLicIdString = newLicId.getCustomID();
     
				

		
			        copyAppSpecific(capId);
			        copyAddresses(capId,newLicId);
			        copyASITables(capId,newLicId);
			        copyLicensedProf(capId,newLicId);
			        copyASIFields(capId,newLicId);
			        copyContacts(capId,newLicId);
			        editAppName(capName,newLicId);       
			        updateAppStatus("Active","Originally Issued",newLicId);
			
			        editAppName(getAppSpecific("Doing Business As (DBA) Name"),newLicId);
			    
			        logDebug("Balance Due = " + balanceDue + "Task Active = "  + isTaskActive("License Issuance") + " Status =" + taskStatus("License Issuance")); 
	}		        

			        
//      //**************************************************************************************    
			        tmpNewDate = new Date();
    
				    /**
				     * Check Condition for Mechinical!Contractor Registration
				     */
				    if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "Contractor Registration") {
				        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				            thisYear += 3;
				            newExpDate = "08/31/" + thisYear.toString();
				        if (newLicId) {
				            thisLic = new licenseObject(newLicIdString,newLicId);
				            thisLic.setExpiration(dateAdd(newExpDate,0));
				            thisLic.setStatus("Active");
				            }
				    }
				    /**
				     * Check Condition for Electrical!Apprentice
				     */
				    if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "Apprentice") {
				        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				        thisMonth = tmpNewDate.getMonth();
				        	if (thisMonth > 7) {
				            thisYear += 1;     //thisYear = thisYear + 1;
				        }
				        newExpDate = "08/31/" + thisYear.toString();
				        	if (newLicId) {
				        	thisLic = new licenseObject(newLicIdString,newLicId);
				        	thisLic.setExpiration(dateAdd(newExpDate,0));
				        	thisLic.setStatus("Active");
				        }
				    }
				    /**
				     * Check Condition for Plumbing!Contractor Registration
				     */
				    if (appTypeArray[1] == "Plumbing" && appTypeArray[2] == "Contractor Registration") {
				        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				            thisYear += 3;
				            newExpDate = "04/30/" + thisYear.toString();
				            if (newLicId) {
				            thisLic = new licenseObject(newLicIdString,newLicId);
				            thisLic.setExpiration(dateAdd(newExpDate,0));
				            thisLic.setStatus("Active");
				        }
				    }
				    /**
				     * Check condition for Boiler!Contractor Registration
				     */
				    if (appTypeArray[1] == "Boiler" && appTypeArray[2] == "ContractorRegistration") {
				        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				            thisYear += 3;
				            newExpDate = "12/31/" + thisYear.toString();
				            if (newLicId) {
				            thisLic = new licenseObject(newLicIdString,newLicId);
				            thisLic.setExpiration(dateAdd(newExpDate,0));
				            thisLic.setStatus("Active");
				            }
				    }
				    /**
				     * Check Condition for Mechanical!Occupational
				     */ 
				    if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "Occupational") {
				        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				        monthsToInitialExpire = 12;
				        tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
				        	if (newLicId) {
				        	thisLic = new licenseObject(newLicIdString,newLicId);
				        	thisLic.setExpiration(dateAdd(tmpNewDate,0));
				        	thisLic.setStatus("Active");
				        }
				    }
				    /**
				   	 * Check Condition for Mechanical!RefrigJourneyman
				   	 */ 
				    if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "RefrigJourneyman") {
				        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				        monthsToInitialExpire = 12;
				        tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
				        	if (newLicId) {
				        	thisLic = new licenseObject(newLicIdString,newLicId);
				        	thisLic.setExpiration(dateAdd(tmpNewDate,0));
				        	thisLic.setStatus("Active");
				        }
				    }
				      /**
				     * Check Condition Building!ContractorRegistration
				     */ 
				    if (appTypeArray[1] == "Building" && appTypeArray[2] == "ContractorRegistration") {
				        thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				        newExpDate = "12/31/" + thisYear.toString();
				       		if (newLicId) {
				       		thisLic = new licenseObject(newLicIdString,newLicId);
				       		thisLic.setExpiration(dateAdd(newExpDate,0));
				       		thisLic.setStatus("Active");
				       	}
				    
				    } 
				    else if (appTypeArray[1] == "Building" && appTypeArray[2] == "Sign-AwingContractor") {
					    thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
					    newExpDate = "12/31/" + thisYear.toString();
					    	if (newLicId) {
					    	thisLic = new licenseObject(newLicIdString,newLicId);
					    	thisLic.setExpiration(dateAdd(newExpDate,0));
					    	thisLic.setStatus("Active");
					    }
				    } 
				    else if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "Contractor") {
				    	thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				    	newExpDate = "12/31/" + thisYear.toString();
				    		if (newLicId) {
				    		thisLic = new licenseObject(newLicIdString,newLicId);
				    		thisLic.setExpiration(dateAdd(newExpDate,0));
				    		thisLic.setStatus("Active");
				    	}
				     } 
				    else if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "ContractorRegistration") {
				    	 thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				    	 newExpDate = "12/31/" + thisYear.toString();
				    	 	if (newLicId) {
				    		 thisLic = new licenseObject(newLicIdString,newLicId);
				    		 thisLic.setExpiration(dateAdd(newExpDate,0));
				    		 thisLic.setStatus("Active");
				    	 }
					 } 
				    else if (appTypeArray[1] == "Electrical" && appTypeArray[2] == "Masters-Journeyman") {
						 thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
						 newExpDate = "12/31/" + thisYear.toString();
						 	if (newLicId) {
							 thisLic = new licenseObject(newLicIdString,newLicId);
							 thisLic.setExpiration(dateAdd(newExpDate,0));
							 thisLic.setStatus("Active");
						 }	      	
					 } 
				    else if (appTypeArray[1] == "Mechanical" && appTypeArray[2] == "Elevator") {
						 thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
						 newExpDate = "12/31/" + thisYear.toString();
						 	if (newLicId) {
							 thisLic = new licenseObject(newLicIdString,newLicId);
							 thisLic.setExpiration(dateAdd(newExpDate,0));
							 thisLic.setStatus("Active");
						 }	      	
					 } 
    
				    else if (appTypeArray[1] == "Building" && appTypeArray[2] == "WreckingContractor") {
				    	thisYear = parseInt(tmpNewDate.getYear().toString()) + 1900;
				    	newExpDate = "12/31/" + thisYear.toString();
				    		if (newLicId) {
				    		 thisLic = new licenseObject(newLicIdString,newLicId);
				    		 thisLic.setExpiration(dateAdd(newExpDate,0));
				    		 thisLic.setStatus("Active");
		 }	      	
				    } 
				    


////From Here ************************ Licensed Professional **************************************



	var LICENSESTATE="MI";
  
  //->branch("EMSE:LicProfLookup");
		logDebug("Using LICENSESTATE = " + LICENSESTATE + " from EMSE:GlobalFlags");
      //Issue State;
		LICENSETYPE = "";
      //License Type to be populated;
		licCapId = null;
		isNewLic = false;
		licIDString = null;
		licObj = null;
		licCap = null;
  
  
  //->branch("EMSE:LicProfLookup:getLicenses");
      var searchCap = capId;
      var tmpId = capId;
      var prjArr = null;
      if (appMatch("*/*/*/License")) {
          var childArr = getChildren("*/*/*/Application");
          if(childArr != null) searchCap = childArr[0];
          }
  
      capId = tmpId;
      var vRelationType = "R";
      if(appMatch("*/*/*/Renewal")) vRelationType="Renewal";
      var prjArrRes = aa.cap.getProjectByChildCapID(searchCap,vRelationType,null);
      if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
      if (prjArr != null) {
          for(prj in prjArr) if(appMatch("*/*/*/License",prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
          }
  
      if (licCapId == null && appMatch("*/*/*/License")) {
          licCapId = capId;
//          //In the event license has no application;
          }
  
      if (licCapId == null && appMatch("*/*/*/Renewal")) {
          licCapId = capId;
          //In the event license has no application;
          }
      logDebug("100:licCapId=" + licCapId);
      if (licCapId != null) {
          licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
          }
      //Get License CAP;
      logDebug("105:licCapId=" + licCapId);
      
  
  
  //----->branch("EMSE:LicProfLookup:getLicenseType");
          if (licCapId !=null) {
              licIDString = licCapId.getCustomID();
              }
  
          if (licCapId !=null) {
              licCap = aa.cap.getCap(licCapId).getOutput();
              licCapType = licCap.getCapType().toString();
              licCapTypeArr = licCapType.split("/");
              licCapStatus = licCap.getCapStatus();
              }
  
          if (licCapId !=null) {
              LICENSETYPE = getAppSpecific("License Type",capId) + "";
              aa.print("LIC License Type is " + LICENSETYPE);
              }
          cityLicense = licCapId.getCustomID();
         // stateLicense = getAppSpecific("State License Number",licCapId);
         aa.print("Detroit License Number is " + cityLicense);
         
  
      	licObj = licenseProfObject(newLicId,LICENSETYPE);
      //Get LicArray;
      		logDebug("128:cityLicense=" + licIDString);
      		logDebug("129:LICENSETYPE=" + LICENSETYPE);
      		if (!licObj.valid && lookup("LIC LICENSED PROFESSIONALS",LICENSETYPE) != null) {
  
  
  //----->branch("EMSE:LicProfLookup:CreateLP");
          logDebug("Executing EMSE:LicProfLookup:CreateLP");
        var vNewLic = aa.licenseScript.createLicenseScriptModel();
          	vNewLic.setAgencyCode(aa.getServiceProviderCode());
          	vNewLic.setAuditDate(sysDate);
          	vNewLic.setAuditID(currentUserID);
          	vNewLic.setAuditStatus("A");
          	vNewLic.setLicenseType(LICENSETYPE);
          	vNewLic.setLicState(LICENSESTATE);
          	vNewLic.setStateLicense(cityLicense);
         
          aa.licenseScript.createRefLicenseProf(vNewLic);
      }   
          var tmpLicObj = licenseProfObject(cityLicense,LICENSETYPE);
         
          logDebug("148:Successfully created temp LP? " + tmpLicObj.valid);
          
        	          
          if (tmpLicObj.valid) {
              isNewLic = true;
          		}
 
    
    		var mycap = aa.cap.getCap(licCapId).getOutput();
    		
    		if (tmpLicObj.valid && mycap.getCapModel().getCreatedByACA() == 'Y') {
    		associateLpWithPublicUser(licObj.refLicModel.getLicSeqNbr(), mycap.getCapModel().getCreatedBy().toString());
    			}

 
    		licObj = licenseProfObject(cityLicense,LICENSETYPE );
 
    		logDebug("161:Successfully created LP? " + licObj.valid);
    
    		
    		if (licObj.valid) {
  	
  	
//----->branch("EMSE:LicProfLookup:UpdateLP");
  
    			logDebug("Executing EMSE:LicProfLookup:UpdateLP");

//----->branch("EMSE:LicProfLookup:UpdateLP:BaseFields");
    			logDebug("Executing EMSE:LicProfLookup:UpdateLP:BaseFields");

		        licObj.refLicModel.setState(LICENSESTATE);
		        licObj.refLicModel.setLicenseBoard(LICENSETYPE);
		        licObj.refLicModel.setLicenseIssueDate(licCap.getFileDate());
		        var expObj = null;
		        var expDt = null;
		        var expObjRes = aa.expiration.getLicensesByCapID(newLicId);
		        if (expObjRes.getSuccess()) var expObj = expObjRes.getOutput();
		        if (expObj != null) {
		            expDt = aa.date.parseDate(expObj.getExpDateString());
		        }
		
		        if (expDt != null) {
		            licObj.refLicModel.setBusinessLicExpDate(expDt);//Expiration Date
		        }


		        else {
		        	licObj.refLicModel.setLicenseBoard(LICENSETYPE);
		        }

		        if (licObj.updateFromRecordContactByType(newLicId,"Applicant",true,true)) {
            
		        	logDebug("LP Updated from Primary Contact");
		        }
		        else {
		        	logDebug("LP Failed to Update from Primary Contact trying License Holder");
		        	if(licObj.updateFromRecordContactByType(newLicId,"License Holder",true,true)) logDebug("Updated from License Holder");
		        	else logDebug("Couldn't Update Contact Info");
		        }

		        if (getAppSpecific("Doing Business As (DBA) Name")) {
		        	licObj.refLicModel.setBusinessName(getAppSpecific("Doing Business As (DBA) Name") );
		        }
  
    		}

//************************************************************************************
    		
    		try {
				
    			var showDebug = true;
    			var showMessage = true;

    				
    			////************************************ FEES SELECTION **********************************
    				
    					
    													iCont = null;
    													feeArray = new Array();
    													feeArray = loadFees(capId);
    													if (feeArray.length > 0) {
    													    for (iCont in feeArray) {
    										            
    										            logDebug("Found Assessed Fees = " + iCont);
    										            showDebug=true;
    										            tFee = feeArray[iCont];
    										            aa.print("Fee code: " + tFee["code"] + " " + tFee["amount"] + " " + tFee["status"]);
    														            
    														    }
    														}	
    										
    								
    						
    				//************************************ REPORT SELECTION **********************************

    				//function runReport4EmailOrPrint(itemCap,reportName,conObj,rParams,eParams,emailTemplate,module) {
    				//If email address available for contact type then email the report, otherwise pop up the report on the screen  
    				  
    				//*********************************** STATIONARY ENGINEER  
    				  
    					
    										
    										var capIdString = capId.getCustomID();
    										var	LICENSETYPE = getAppSpecific("License Type", capId);
    										var fullLicenseType=lookup("LIC LICENSED PROFESSIONALS",LICENSETYPE);
    										var myReport;
    											
    										
    										
    										var myTaskStatus =taskStatus("License Issuance");
    										
    											logDebug("License Type: " + LICENSETYPE);
    											aa.print("License Type: " + LICENSETYPE);
    											
    											var rParams = aa.util.newHashMap();
    																													

    											addParameter(rParams,"RECORD_ID",capId);
    											addParameter(rParams,"TASK","License Issuance");
    											addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONALS");
    											
    											aa.print("Parameters: " + rParams );
    													
    									if ((LICENSETYPE == "1st Class Station Eng") || (LICENSETYPE == "2nd Class Station Eng") || (LICENSETYPE == "3rd Class Station Eng")) {
    										 
    										myReport="Stationary";
    										
    										}

    									else  {

    										myReport="Boiler";		
    										
    										}							
    									
    				//  function generateReport(itemCap, reportName, module, parameters) //returns the report file which can be attached to an email.					
    									
    									
//    									generateReport(capId, myReport, "Licenses", rParams);
    														
//    									runReport4EmailOrPrint(capId,myReport,null,rParams,null,null,"Licenses");
    									
//    									function runReportAsync(reportName,module,itemCap,reportParameters)
    									
    									runReportAsync(myReport,"Licenses",capIdString,rParams)
    								
    		logDebug("License Type: " + LICENSETYPE + "Record: " + capIdString " Parameters: " + rParams + "  Report to Print = " + myReport + " Task Status = " + myTaskStatus);
    									
    							
    									
    									
    					}catch (err) {
    						logDebug("A JavaScript Error occured: " + err.message);
    					}
    					// end user code
    					aa.env.setValue("ScriptReturnCode", "1"); 	aa.env.setValue("ScriptReturnMessage", debug)
    					
    					
    					
    					
    					
 function runReportAsync(reportName,module,itemCap,reportParameters) {
    						var scriptName = "RUNREPORTASYNC";

    						var envParameters = aa.util.newHashMap();
    						envParameters.put("ReportName",reportName);
    						envParameters.put("ReportParameters",reportParameters);
    						envParameters.put("Module",module);
    						envParameters.put("CustomCapId",capIDString);
    						envParameters.put("ReportUser",currentUserID);
    						envParameters.put("ServProvCode",servProvCode);
    						envParameters.put("ErrorEmailTo","saxthelm@accela.com");
    						envParameters.put("DebugEmailTo","saxthelm@accela.com");

    						aa.runAsyncScript(scriptName, envParameters);
    					}    					
    					