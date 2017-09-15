//*********************************************************************************************************/
//	WTUA;LICENSES!~!~!APPLICATION.js																	       /
//																			Iman Sallam @ City of Detroit  /
//		Deploy with the script code and script title below (all caps)									   /
//																								           /
//					PRA:LICENSES/*/*/APPLICATION														   / 							
//			September 7th, 2017			Revision 2.0
//			September 11th, 2017			Revision 3.0
//			September 15th, 2017			Revision 3.1
//*********************************************************************************************************/

var showDebug = true;
var showMessage = true;


	if (isTaskStatus("License Issuance","Issued") && balanceDue <= 0) {
	        
		
		iCont = null;
		feeArray = new Array();
		feeArray = loadFees(capId);
		if (feeArray.length > 0) {
		    for (iCont in feeArray) {
		            //branch("EMSE:SetContactRelationshipToContactTypeLoop");
		            logDebug("Executing EMSE:SetContactRelationshipToContactTypeLoop");
		            showDebug=3;
		            tFee = feeArray[iCont];
		            aa.print("code: " + tFee["code"] + " " + tFee["amount"] + " " + tFee["status"]);
		            
		    }
		}	
		
		
		
//************************************ REPORT SELECTION **********************************

//function runReport4EmailOrPrint(itemCap,reportName,conObj,rParams,eParams,emailTemplate,module) {
//If email address available for contact type then email the report, otherwise pop up the report on the screen  
  
//*********************************** STATIONARY ENGINEER  
  
	var	LICENSETYPE = getAppSpecific("License Type", capId);
  
  	logDebug("License Type: " + LICENSETYPE);
  	
if (LICENSETYPE = "1st Class Station Eng") {
  	     
  		var rParams = aa.util.newHashMap();
  	     	
  			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"TASK","Licenses Issuance");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			
  			logDebug("Parameters: " + rParams);

    	        
  			runReport4EmailOrPrint(capId,"Stationary",null,rParams,null,null,"Licenses");
 
  			}
  	
else if (LICENSETYPE = "2nd Class Station Eng")  {
	     
		var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"TASK","Licenses Issuance");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			
  			logDebug("Parameters: " + rParams);

				        
			runReport4EmailOrPrint(capId,"Stationary",null,rParams,null,null,"Licenses");

			} 

else if (LICENSETYPE = "3rd Class Station Eng") {
    
	var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
			addParameter(rParams,"TASK","Licenses Issuance");
			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
			
			logDebug("Parameters: " + rParams);


        
		runReport4EmailOrPrint(capId,"Stationary",null,rParams,null,null,"Licenses");

		} 
//
//
//
////*********************************** BOILER 
// 
if (LICENSETYPE = "Boiler Op HP") {
  	
  		
  		var rParams = aa.util.newHashMap();
			
  			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"TASK","Licenses Issuance");

  			logDebug("Parameters: " + rParams);
	    	        
  			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");

  	}
//
else if (LICENSETYPE = "Boiler Op LP") {
  	
		
		var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"TASK","Licenses Issuance");

  			logDebug("Parameters: " + rParams);
		    	        
			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");

	}
else if (LICENSETYPE = "1st Class Refrig Op") {
  	
		
		var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"TASK","Licenses Issuance");

  			logDebug("Parameters: " + rParams);
    	        
			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");

	}
else if (LICENSETYPE = "2nd Class Refrig Op") {
  	
		
			addParameter(rParams,"Record_ID","capId");
			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
			addParameter(rParams,"TASK","Licenses Issuance");

			logDebug("Parameters: " + rParams);

    	        
			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");

	}
else if (LICENSETYPE = "3rd Class Refrig Op") {
  	
		
		var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"TASK","Licenses Issuance");

  			logDebug("Parameters: " + rParams);
    	        
			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");

	}
//*********************************** ALL OTHERS *************************************************************
  	
else{		var rParams = aa.util.newHashMap();

	
		addParameter(rParams,"Record_ID","capId");
		addParameter(rParams,"TASK","Licenses Issuance");
		addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
		addParameter(rParams,"Logo","Xtra4");
		logDebug("Parameters: " + rParams);

   	    	        
  			runReport4EmailOrPrint(capId,"License",null,rParams,null,null,"Licenses");
  			
}


	}
