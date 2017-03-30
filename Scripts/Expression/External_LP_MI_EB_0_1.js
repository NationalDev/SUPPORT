/*------------------------------------------------------------------------------------------------------/
 | SVN $Id: External_LP_MI_EB_0_1.js   2016-07-06   Greg.Soter $
 | Program : External_LP_MI_EB_0_1.js
 |
 | Usage   : Expression Builder Script that will validate a license and populate demographic fields.
 |
 | Client  : N/A
 | Action# : N/A
 |
 | Notes   : Expression builder script to be used on Professional portlet.  Execute on LP::onPopulate
 |           and/or LP::professionalModel:licensenbr for best results.
 |
 |
 |
 /------------------------------------------------------------------------------------------------------*/


var msg = "";
var servProvCode=expression.getValue("$$servProvCode$$").value;
var returnMessage = "";
// get the EMSE biz object
var aa = expression.getScriptRoot();

// License Number that the user entered or selected
var licNum = expression.getValue("LP::professionalModel*licensenbr").value;

// Rest of the license...

var expAddressLine1 = expression.getValue("LP::professionalModel*address1");
var expAddressLine2 = expression.getValue("LP::professionalModel*address2");
var expBusinessName = expression.getValue("LP::professionalModel*businessname");
var expCity = 		expression.getValue("LP::professionalModel*city");
var expPhone1 = expression.getValue("LP::professionalModel*phone1")
var expZip = expression.getValue("LP::professionalModel*zip")

var saxBuilder = aa.proxyInvoker.newInstance("org.jdom.input.SAXBuilder").getOutput();
var document = saxBuilder.build("https://apis.accela.com/v4/search/professionals?licenseNumber=" + licNum + "&fields=status,addressLine1,addressLine2,businessName,city,phone1,zip");
var root = document.getRootElement();

errorNode = root.getChild("Error");
if (errorNode)
{
    expression.addMessage("CSLB information returned an error for license " + licNum + " : " + unescape(errorNode.getText()).replace(/\+/g," "));
}
else
{
    var lpBiz = root.getChild("BusinessInfo");
    var lpStatus = root.getChild("PrimaryStatus");
    var lpClass = root.getChild("Classifications");
    var lpBonds = root.getChild("ContractorBond");
    var lpWC = root.getChild("WorkersComp");
    
    // Primary Status
    // 3 = expired, 10 = good, 11 = inactive, 1 = canceled.   We will ignore all but 10 and return text.
    var stas = lpStatus.getChildren();
    for (i=0 ; i<stas.size(); i++) {
        var sta = stas.get(i);
        
        if (sta.getAttribute("Code").value != "10")
            returnMessage+="License:" + licNum + ", " + unescape(sta.getAttribute("Desc").value).replace(/\+/g," ") + " ";
    }
    
    
    expAddressLine1.value = unescape(lpBiz.getChild("Addr1").getText()).replace(/\+/g," ");
    expAddressLine2.value = unescape(lpBiz.getChild("Addr2").getText()).replace(/\+/g," ");
    expBusinessName.value = unescape(lpBiz.getChild("Name").getText()).replace(/\+/g," ");
    expCity.value = unescape(lpBiz.getChild("City").getText()).replace(/\+/g," ");
    expPhone1.value = unescape(lpBiz.getChild("BusinessPhoneNum").getText()).replace(/\+/g," ");
    expZip.value = unescape(lpBiz.getChild("Zip").getText()).replace(/\+/g," ");
    
    
    expression.setReturn(expAddressLine1);
    expression.setReturn(expAddressLine2);
    expression.setReturn(expBusinessName);
    expression.setReturn(expCity);
    expression.setReturn(expPhone1);
    expression.setReturn(expZip);
    
    
    if (returnMessage.length > 0)
        expression.addMessage("CSLB report status: " + returnMessage);
}
