function isValidLARA(licType,licNum) {
    var xml = getMichLicProfXML(licType,licNum);
    var errorCode = aa.util.getValueFromXML("ErrorCode",xml);
    if (errorCode == '0') {
        //ToDo:Write assessment conditions
        //<?xml version="1.0" encoding="UTF-8"?><GovXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.accela.com/schema/AccelaOpenSystemInterfaceXML"><GetLicensedProfessionalsResponse><System><XMLVersion>720</XMLVersion><ServiceProviderCode>LARA</ServiceProviderCode><Username>ACAREPORTS</Username><MaxRows>10</MaxRows><StartRow>1</StartRow><EndRow>1</EndRow><TotalRows>1</TotalRows><ApplicationState>28443724407124743779526536290270628189366712141926779022104374229351665704809434451821014726637815330572486512222454690067587569</ApplicationState><Error><ErrorCode>0</ErrorCode></Error><LanguageID>en-US</LanguageID></System><Contacts><Contact isPrimary="false"><Keys><Key>20001110158</Key><Key>license</Key></Keys><PersonAndOrganization xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"><thePerson><Person xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"><familyName>WALRATH</familyName><givenName>HIRAM</givenName><middleNames><String>C</String></middleNames><roles><ActorRole><role>userdefined</role></ActorRole></roles><addresses><PostalAddress><addressLines><String>3640 RUE FORET APT#163</String><String>FLINT, MI</String></addressLines><town>FLINT</town><TownId><Keys><Key>FLINT</Key></Keys><IdentifierDisplay>FLINT</IdentifierDisplay></TownId><region>MI</region><postalCode>48532</postalCode><RegionIdentifier><Keys><Key>MI</Key></Keys><IdentifierDisplay>MI</IdentifierDisplay></RegionIdentifier></PostalAddress><TelecomAddress><telephoneNumbers/><facsimileNumbers/><electronicMailAddresses/></TelecomAddress></addresses></Person></thePerson><theOrganization><Organization xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"><name>WALRATH, HIRAM C</name></Organization></theOrganization></PersonAndOrganization><Licenses xmlns="http://www.iai-international.org/ifcXML/ifc2x/IFC2X_FINAL"><License><licenseType>Electrical Master</licenseType><LicenseTypeId><Keys><Key>Electrical Master</Key></Keys><IdentifierDisplay>Electrical Master</IdentifierDisplay></LicenseTypeId><licenseNumber>6200004</licenseNumber><issuedDate>1983-01-01</issuedDate><expirationDate>1996-12-31</expirationDate></License></Licenses></Contact></Contacts></GetLicensedProfessionalsResponse></GovXML>
        var expirationDateString = aa.util.getValueFromXML("expirationDate",xml);
        var expirationDate = aa.util.parseDate(expirationDateString);
        return (expirationDate.after(aa.util.now()));
    }
    else {
        var errorMessage = aa.util.getValueFromXML("ErrorMessage",xml);
        logDebug("Error:" + errorCode + " - " + errorMessage);
        return null;
    }
    
    
}