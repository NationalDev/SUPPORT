/**
 * This function is used in ASI for copying.
 * @param capId
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

function ASICopyExceptions(capId) {
    var itemCap = capId;
    if (arguments.length == 1) itemCap = arguments[0]; // use cap ID specified in args
    
    var capResult = aa.cap.getCap(itemCap)
    
    if (!capResult.getSuccess()) {
        logDebug("**WARNING: error getting cap : " + capResult.getErrorMessage());
        return false;
    }
    var currAppTypeString = "";
    if (appTypeString != "" && appTypeString != null) {
        currAppTypeString = appTypeString;
    } else {
        cap = aa.cap.getCap(itemCap).getOutput();
        appTypeResult = cap.getCapType();
        currAppTypeString = appTypeResult.toString();
    }
    if (currAppTypeString.length < 1) {
        logDebug("**WARNING: appTypeString environmental variable not found.");
        return false;
    }
    
    return lookup("EMSE:ASI Copy Exceptions",currAppTypeString);
  
}