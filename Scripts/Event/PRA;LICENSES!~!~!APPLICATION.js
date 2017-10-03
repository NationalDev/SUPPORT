//*********************************************************************************************************
//	PPA;LICENSES!~!~!APPLICATION.js																	   
//																			Iman Sallam @ City of Detroit  
//		Deploy with the script code and script title below (all caps)									   
//																								           
//					PPA:LICENSES/*/*/APPLICATION	
// 							
//			September 29th, 2017			Revision 1.0
//*********************************************************************************************************


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
							
	
										
										
										//  
										////************************************ REPORT SELECTION **********************************
										//
										////function runReport4EmailOrPrint(itemCap,reportName,conObj,rParams,eParams,emailTemplate,module) {
										////If email address available for contact type then email the report, otherwise pop up the report on the screen  
										//  
										////*********************************** STATIONARY ENGINEER  
										  
										altID = "";
										altID = capId.getCustomID();
												LICENSETYPE = "";
												LICENSETYPE = getAppSpecific("License Type",capId) + "";
										  
										  	    logDebug("License Type: " + LICENSETYPE + "  ID = " + altID);
										  	    
										  	  licIDString = null;
										  	
										  	    if (LICENSETYPE == "1st Class Station Eng") {
										  	     
										  		var rParams = aa.util.newHashMap();
										  	     	
										  			addParameter(rParams,"p1value",altID);
										  			addParameter(rParams,"TASK","License Issuance");
										  			addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONAL");
										  			
										  			logDebug("Parameters: " + rParams);
										
										  			runReportAsync("Stationary","Licenses",capId,rParams);    
//										  			runReport4EmailOrPrint(capId,"Stationary",null,rParams,null,null,"Licenses");
										 
										  			}
										  	
										  	else if (LICENSETYPE == "2nd Class Station Eng")  {
											     
												var rParams = aa.util.newHashMap();
									  			addParameter(rParams,"p1value",altID);
									  			addParameter(rParams,"TASK","License Issuance");
									  			addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONAL");
									  			
									  			logDebug("Parameters: " + rParams);
									
									  			runReportAsync("Stationary","Licenses",capId,rParams);    
//													runReport4EmailOrPrint(capId,"Stationary",null,rParams,null,null,"Licenses");
										
													} 
										
										  	else if (LICENSETYPE == "3rd Class Station Eng") {
										    
									  			addParameter(rParams,"p1value",altID);
									  			addParameter(rParams,"TASK","License Issuance");
									  			addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONAL");
									  			
									  			logDebug("Parameters: " + rParams);
									
									 // 			runReportAsync("Stationary","Licenses",capId,rParams);    
										
										
													runReportAsync("Stationary","Licenses",capId,rParams);
//													runReport4EmailOrPrint(capId,"Stationary",null,rParams,null,null,"Licenses");
										
													} 
										 
										////*********************************** BOILER 
										
										  	else if (LICENSETYPE == "Boiler Op HP") {
										  	
										  		
										  		var rParams = aa.util.newHashMap();
													
									  			addParameter(rParams,"p1value",altID);
									  			addParameter(rParams,"TASK","License Issuance");
									  			addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONAL");
									  			
									  			logDebug("Parameters: " + rParams);
									
									  			runReportAsync("Boiler","Licenses",capId,rParams);    
										  //			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");
										
										  			}
										 
										  	else if (LICENSETYPE == "Boiler Op LP") {
										  	
												
										  		var rParams = aa.util.newHashMap();
												
									  			addParameter(rParams,"p1value",altID);
									  			addParameter(rParams,"TASK","License Issuance");
									  			addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONAL");
									  			
									  			logDebug("Parameters: " + rParams);
									
									  			runReportAsync("Boiler","Licenses",capId,rParams);    
										
										  			}
										  	
										  	else if (LICENSETYPE == "1st Class Refrig Op") {
										  	
												
										  		var rParams = aa.util.newHashMap();
												
									  			addParameter(rParams,"p1value",altID);
									  			addParameter(rParams,"TASK","License Issuance");
									  			addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONAL");
									  			
									  			logDebug("Parameters: " + rParams);
									
									  			runReportAsync("Boiler","Licenses",capId,rParams);    
										
										  			}
										
										  	else if (LICENSETYPE == "2nd Class Refrig Op") {
										  	
												
										  		var rParams = aa.util.newHashMap();
												
									  			addParameter(rParams,"p1value",altID);
									  			addParameter(rParams,"TASK","License Issuance");
									  			addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONAL");
									  			
									  			logDebug("Parameters: " + rParams);
									
									  			runReportAsync("Boiler","Licenses",capId,rParams);    
										
										  			}
										  	
										  	else if (LICENSETYPE == "3rd Class Refrig Op") {
										  	
												
										  		var rParams = aa.util.newHashMap();
												
									  			addParameter(rParams,"p1value",altID);
									  			addParameter(rParams,"TASK","License Issuance");
									  			addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONAL");
									  			
									  			logDebug("Parameters: " + rParams);
									
									  			runReportAsync("Boiler","Licenses",capId,rParams);    
										
										  			}
										//*********************************** ALL OTHERS *************************************************************
										  	
										  	else{		
										  		
										  		var rParams = aa.util.newHashMap();
												
									  			addParameter(rParams,"p1value",altID);
									  			addParameter(rParams,"TASK","License Issuance");
									  			addParameter(rParams,"ITEM_NAME","LIC LICENSED PROFESSIONAL");
									  			
									  			logDebug("Parameters: " + rParams);
									
									  			runReportAsync("Boiler","Licenses",capId,rParams);    
												
										  			}
										  	
										 }catch (err) {
												logDebug("A JavaScript Error occured: " + err.message + " In Line " + err.lineNumber);
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