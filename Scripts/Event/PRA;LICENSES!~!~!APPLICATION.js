try{
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
		var myReport;
			
			logDebug("License Type: " + LICENSETYPE);
			aa.print("License Type: " + LICENSETYPE);
  	
if (LICENSETYPE == "1st Class Station Eng") {
  	     
  		var rParams = aa.util.newHashMap();
  	     	
  			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"TASK","Licenses Issuance");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"License Type","VALUE_");
  			

   			runReport4EmailOrPrint(capId,"Stationary",null,rParams,null,null,"Licenses");
   			
   			myReport="Stationary";
   			logDebug("Parameters: " + rParams + "Report = " + myReport);
  			}
  	
else if (LICENSETYPE == "2nd Class Station Eng")  {
	     
		var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"TASK","Licenses Issuance");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"License Type","VALUE_");
  	
  			runReport4EmailOrPrint(capId,"Stationary",null,rParams,null,null,"Licenses");
  			
   			myReport="Stationary";
   			logDebug("Parameters: " + rParams + "Report = " + myReport);
			} 

else if (LICENSETYPE == "3rd Class Station Eng") {
    
	var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
			addParameter(rParams,"TASK","Licenses Issuance");
			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
			addParameter(rParams,"License Type","VALUE_");
			
			runReport4EmailOrPrint(capId,"Stationary",null,rParams,null,null,"Licenses");
			
   			myReport="Stationary";
   			logDebug("Parameters: " + rParams + "Report = " + myReport);

		} 

//
////*********************************** BOILER 
// 
else if (LICENSETYPE == "Boiler Op HP") {
  	
  		
  		var rParams = aa.util.newHashMap();
			
  			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"TASK","Licenses Issuance");
  			addParameter(rParams,"License Type","VALUE_");
  			  			   	        
  			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");
  			
   			myReport="Boiler";
   			logDebug("Parameters: " + rParams + "Report = " + myReport);

  	}

else if (LICENSETYPE == "Boiler Op LP") {
  	
		
		var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"TASK","Licenses Issuance");
  			addParameter(rParams,"License Type","VALUE_");
  			
  			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");
  			
  			myReport="Boiler";
   			logDebug("Parameters: " + rParams + "Report = " + myReport);

	}
 
else if (LICENSETYPE == "1st Class Refrig Op") {
  	
		
		var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"TASK","Licenses Issuance");
  			addParameter(rParams,"License Type","VALUE_");
  			
			logDebug("Parameters: " + rParams + "Report = " + myReport);
			aa.print("Parameters: " + rParams + "Report = " + myReport);   	        
			
			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");
			
			myReport="Boiler";
   			logDebug("Parameters: " + rParams + "Report = " + myReport);

	}
 
else  if (LICENSETYPE == "2nd Class Refrig Op") {
  	
		
			addParameter(rParams,"Record_ID","capId");
			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
			addParameter(rParams,"TASK","Licenses Issuance");
			addParameter(rParams,"License Type","VALUE_");
			
			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");
			
			myReport="Boiler";
   			logDebug("Parameters: " + rParams + "Report = " + myReport);

	}
 
else if (LICENSETYPE == "3rd Class Refrig Op") {
  	
		
		var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
  			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
  			addParameter(rParams,"TASK","Licenses Issuance");
  			addParameter(rParams,"License Type","VALUE_");
     	        
			runReport4EmailOrPrint(capId,"Boiler",null,rParams,null,null,"Licenses");
			
			myReport="Boiler";
   			logDebug("Parameters: " + rParams + "Report = " + myReport);

	}
//*********************************** ALL OTHERS *************************************************************
  	
else {		
		var rParams = aa.util.newHashMap();
			addParameter(rParams,"Record_ID","capId");
			addParameter(rParams,"TASK","Licenses Issuance");
			addParameter(rParams,"ITEM NAME","LIC LICENSED PROFESSIONAL");
			addParameter(rParams,"License Type","VALUE_");
  	    	        
		runReport4EmailOrPrint(capId,"License",null,rParams,null,null,"Licenses");
		
		myReport="License";
		logDebug("Parameters: " + rParams + "Report = " + myReport);
  			
}

		myReport="Boiler";
		logDebug("Parameters: " + rParams + "Report =" + myReport);
	}
	



}catch (err) {
	logDebug("A JavaScript Error occured: " + err.message + " In Line " + err.lineNumber + stop);
	}
// end user code
aa.env.setValue("ScriptReturnCode", "1"); 	aa.env.setValue("ScriptReturnMessage", debug);

		