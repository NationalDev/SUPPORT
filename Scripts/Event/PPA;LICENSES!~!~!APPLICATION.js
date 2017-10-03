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
																										

								addParameter(rParams,"RECORD_ID",capIdString);
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
						
						
//						generateReport(capId, myReport, "Licenses", rParams);
											
						runReport4EmailOrPrint(capId,myReport,null,rParams,null,null,"Licenses");
						
//						function runReportAsync(reportName,module,itemCap,reportParameters)
						
//						runReportAsync(myReport,"Licenses",capIdString,rParams)
					
						logDebug("License Type: " + LICENSETYPE + " Parameters: " + rParams + "  Report to Print = " + myReport + " Task Status = " + myTaskStatus);
						
						
						
						
						
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