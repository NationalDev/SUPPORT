/*----------------------------------------------------------------------------------------------------/
| New function getAppName
| Function used to update License record with AppName of Application record
| Function called by WTUA;BUSINESSLICENSE!~!~!APPLICATION
| Created by Accela 01/16/2015; added to DETROIT Includes Custom 2/16/2016
/----------------------------------------------------------------------------------------------------*/
/* Populates the License record with the Application Name of the Application record
*  returns Application Name
*
*/
function getAppName() // option CapId
{
var itemCap = capId
if (arguments.length > 0)
itemCap = arguments[0]; // use cap ID specified in args

var cdScriptObjResult = aa.cap.getCap(itemCap);
if (!cdScriptObjResult.getSuccess())
{ aa.print("**ERROR: No cap detail script object : " + cdScriptObjResult.getErrorMessage()); return false; }

var cdScriptObj = cdScriptObjResult.getOutput();

if (!cdScriptObj)
{ aa.print("**ERROR: No cap detail script object"); return false; }



var sReturn = cdScriptObj.getCapModel().getSpecialText();

if (sReturn != null)
return sReturn;
else
return "";
}
