/**
 * To calculate and assess permit fee based on the fixtures or equipment types.
 * 
 * Event Name:- Workflow Task Update After
 * Event Description:- The after event for when a user updates a workflow task.
 * MasterScript:- WorkflowTaskUpdateAfterV3.0.js
 * Record Type:- WTUA;BUSINESSLICENSE!AMUSEMENT!~!APPLICATION.js
 *  
 * Issues the business license by doing the following:- Create the license record,
 * expiration date and status.
 * Ensures that all record contacts are based on reference contacts.
 * 
 * Standard Choice:- 1. LIC Issue Business License	2. LIC Establish Links to Reference Contacts
 *
 * When status is "Application Accepted", asses the fee. 
 * 
 * 08/02/2016 Tonee Johnson, FutureNet Group, Inc.
 * 
 * Updated by:- 08/15/2016 Charles Redmond, FutureNet Group, Inc.
 *  
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

//	showDebug = true;
if (wfStatus == "Application Accepted") {
	if (appMatch("BusinessLicense/Amusement/DistributorDealer/*")) {
		if (AInfo["License Type"] == "Coin Op Game Dist"){
			updateFee("COINOPGAME", "BUSLICAMUSE_F", "FINAL", 1, "N");
		} else if (AInfo["License Type"] == "Coin Op Mech Music Dist") {
			updateFee("COINOPMECHMD", "BUSLICAMUSE_F", "FINAL", 1, "N");
		} else if (AInfo["License Type"] == "Location Permit Coin-Op Games") {
			updateFee("LOCATPERMIT", "BUSLICAMUSE_F", "FINAL", 1, "N");	  
		} else if (AInfo["License Type"] == "Coin Op Motion Pic Dev Dist") {
			updateFee("COINOPMDIST", "BUSLICAMUSE_F", "FINAL", 1, "N");	  
		} else if (AInfo["License Type"] == "Billiard Table Dist") {
			updateFee("BILLIARDDIST", "BUSLICAMUSE_F", "FINAL", 1, "N");	  
		}
	} else if (appMatch("BusinessLicense/Amusement/Equipment/*")) {
		if (AInfo["License Type"] == "Billiard Table") {
			updateFee("BILLIARDTBL", "BUSLICAMUSE_F", "FINAL", 1, "N");
		} else if (AInfo["License Type"] == "Vending Machines") {
			if (AInfo["License Sub Type"] == "Vend Mach Bulk Pk Dup") {
				updateFee("VENDBULKDUP", "BUSLICAMUSE_F", "FINAL", 1, "N");
			} else if (AInfo["License Sub Type"] == "Vend Mach Commissary") {
				updateFee("VENDMCOMM", "BUSLICAMUSE_F", "FINAL", 1, "N");
			} else if (AInfo["License Sub Type"] == "Vend Mach Penny Port Dup") {
				updateFee("VENDMPENDUP", "BUSLICAMUSE_F", "FINAL", 1, "N");
			} else if (AInfo["License Sub Type"] == "Vend Mach Penny Port Tags") {
				updateFee("VENDMPEN", "BUSLICAMUSE_F", "FINAL", 1, "N");
			}
		} else if (AInfo["License Type"] == "Coin Operated Game") {
			
		} else if (AInfo["License Type"] == "Coin Operated Mechanical Music") {
			updateFee("COINOPMECHM", "BUSLICAMUSE_F", "FINAL", 1, "N");	  
		}
	} else if (appMatch("BusinessLicense/Amusement/Facility/*")) {
		 if (AInfo["License Type"] == "Circus") {
			if (AInfo["License Sub Type"] == "Circus Indoor") {
				updateFee("CIRCUSINDOOR", "BUSLICAMUSE_F", "FINAL", 1, "N");
			} else if (AInfo["License Sub Type"] == "Circus Outdoor") {
				updateFee("CIRCUSOUTDR", "BUSLICAMUSE_F", "FINAL", 1, "N");
			}
		  } else if (AInfo["License Type"] == "Golf Course") {
			  updateFee("GOLFRANGE", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Firearms Target Practice") {
			  updateFee("FIREARMS", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Instructional Services") {
			  updateFee("INSTRUCTSERV", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Trampoline") {
			  updateFee("TRAMPOLINE", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Rebound Tumbling Center") {
			  updateFee("REBOUNDTUMB", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Rink Skating Roller") {
			  updateFee("SKATINGRINK", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Billiard Room") {
			  updateFee("BILLIARDRM", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Track, Bicycle, GoCart") {
			  updateFee("TRACK", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Baseball Bat Net") {
			  updateFee("BASEBALLNET", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Bowling Alley") {
			  updateFee("BOWLALLEY", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Amusement Park") {
			  updateFee("AMUSE PARK", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Arcade") {
			  updateFee("ARCADE", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  } else if (AInfo["License Type"] == "Archery Gallery School") {
			  updateFee("ARCHGALLERY", "BUSLICAMUSE_F", "FINAL", 1, "N");
		  }
	}
}