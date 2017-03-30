function getMichLicProfXML(licNum) {
    // Test Parameter
    //var licNumTest = licNum;
    if (CurrentUserID == "ADMIN") {
        showDebug = true;
        showMessage = true;
    }
    try {
        aa.util.parseInt(licNum);
        
    }
    catch (err) {
        
        aa.print(err.message);
        return null;
    }
    if (licNum >= 1000000 && licNum <= 9999999) {
        var apiUrl = "http://127.0.0.1:3080/wireless/GovXMLServlet?"
        var xmlAuth = <GovXML xmlns="http://www.accela.com/schema/AccelaOpenSystemInterfaceXML"><AuthenticateUser><System><XMLVersion>GovXML-7.0.0</XMLVersion><ServiceProviderCode>LARA</ServiceProviderCode></System><Username>ACAREPORTS</Username><Password>acareports</Password></AuthenticateUser></GovXML>
        parms = "xmlin=" + xmlAuth.toString();
        result = aa.util.httpPost(apiUrl,parms);
        var appState = aa.util.getValueFromXML("ApplicationState",result.getOutput());
        
        var xmlLP = '<GovXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.accela.com/schema/AccelaOpenSystemInterfaceXML"><GetLicensedProfessionals><System><XMLVersion>720</XMLVersion><ServiceProviderCode>LARA</ServiceProviderCode><Username>ACAREPORTS</Username><MaxRows>10</MaxRows><StartRow>1</StartRow><EndRow>0</EndRow><TotalRows>0</TotalRows><ApplicationState>' + appState + '</ApplicationState><LanguageID>en-US</LanguageID></System><Person><roles xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"><ActorRole><role>userdefined</role></ActorRole></roles><addresses xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"><PostalAddress><addressLines/><postalCode/><town/><region/></PostalAddress><TelecomAddress><telephoneNumbers><String/><String/></telephoneNumbers><facsimileNumbers><String/></facsimileNumbers><electronicMailAddresses><String/></electronicMailAddresses></TelecomAddress></addresses><fullName xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"/></Person><License><licenseType></licenseType><LicenseTypeId><Keys><Key></Key></Keys></LicenseTypeId><licenseNumber>' + licNum + '</licenseNumber><issuedDate/><expirationDate/></License></GetLicensedProfessionals></GovXML>';
        var lpParms = "xmlin=" + xmlLP;

        var rootNode = aa.util.httpPost(apiUrl,lpParms).getOutput();
        
        r = new XML(rootNode.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>",""));
        
        comment(r);
        return r;
        
    }
    else {
        logDebug(licNum + " must be 7 digits in length.");
        return null;
    }
}