function addASITable(tableName, tableValueArray) // optional capId
{
    //  tableName is the name of the ASI table
    //  tableValueArray is an array of associative array values.  All elements MUST be either a string or asiTableVal object
    var itemCap = capId
    if (arguments.length > 2)
        itemCap = arguments[2]; // use cap ID specified in args
    
    var tssmResult = aa.appSpecificTableScript.getAppSpecificTableModel(itemCap, tableName)
    
    if (!tssmResult.getSuccess()) {
        logDebug("**WARNING: error retrieving app specific table " + tableName + " " + tssmResult.getErrorMessage());
        return false
    }
    
    var tssm = tssmResult.getOutput();
    var tsm = tssm.getAppSpecificTableModel();
    var fld = tsm.getTableField();
    var fld_readonly = tsm.getReadonlyField(); // get Readonly field
    
    for (thisrow in tableValueArray) {
        
        var col = tsm.getColumns()
        var coli = col.iterator();
        while (coli.hasNext()) {
            var colname = coli.next();
            
            if (!tableValueArray[thisrow][colname.getColumnName()]) {
                logDebug("addToASITable: null or undefined value supplied for column " + colname.getColumnName() + ", setting to empty string");
                tableValueArray[thisrow][colname.getColumnName()] = "";
            }
            
            if (typeof(tableValueArray[thisrow][colname.getColumnName()].fieldValue) != "undefined") // we are passed an asiTablVal Obj
            {
                fld.add(tableValueArray[thisrow][colname.getColumnName()].fieldValue);
                fld_readonly.add(tableValueArray[thisrow][colname.getColumnName()].readOnly);
                //fld_readonly.add(null);
            } else // we are passed a string
            {
                fld.add(tableValueArray[thisrow][colname.getColumnName()]);
                fld_readonly.add(null);
            }
        }
        
        tsm.setTableField(fld);
        
        tsm.setReadonlyField(fld_readonly);
        
    }
    
    var addResult = aa.appSpecificTableScript.editAppSpecificTableInfos(tsm, itemCap, currentUserID);
    
    if (!addResult.getSuccess()) {
        logDebug("**WARNING: error adding record to ASI Table:  " + tableName + " " + addResult.getErrorMessage());
        return false
    } else
        logDebug("Successfully added record to ASI Table: " + tableName);
    
}


function addParameter(parameters, key, value) {
    
    if (key != null) {
        if (value == null) {
            value = "";
        }
        parameters.put(key, value);
    }
}
function addToASITable(tableName,tableValues) // optional capId
{
    //  tableName is the name of the ASI table
    //  tableValues is an associative array of values.  All elements must be either a string or asiTableVal object
    itemCap = capId
    if (arguments.length > 2)
        itemCap = arguments[2]; // use cap ID specified in args
    
    var tssmResult = aa.appSpecificTableScript.getAppSpecificTableModel(itemCap,tableName)
    
    if (!tssmResult.getSuccess())
    { logDebug("**WARNING: error retrieving app specific table " + tableName + " " + tssmResult.getErrorMessage()) ; return false }
    
    var tssm = tssmResult.getOutput();
    var tsm = tssm.getAppSpecificTableModel();
    var fld = tsm.getTableField();
    var col = tsm.getColumns();
    var fld_readonly = tsm.getReadonlyField(); //get ReadOnly property
    var coli = col.iterator();
    
    while (coli.hasNext())
    {
        colname = coli.next();
        
        if (!tableValues[colname.getColumnName()]) {
            logDebug("addToASITable: null or undefined value supplied for column " + colname.getColumnName() + ", setting to empty string");
            tableValues[colname.getColumnName()] = "";
        }
        
        if (typeof(tableValues[colname.getColumnName()].fieldValue) != "undefined")
        {
            fld.add(tableValues[colname.getColumnName()].fieldValue);
            fld_readonly.add(tableValues[colname.getColumnName()].readOnly);
        }
        else // we are passed a string
        {
            fld.add(tableValues[colname.getColumnName()]);
            fld_readonly.add(null);
        }
    }
    
    tsm.setTableField(fld);
    tsm.setReadonlyField(fld_readonly); // set readonly field
    
    addResult = aa.appSpecificTableScript.editAppSpecificTableInfos(tsm, itemCap, currentUserID);
    if (!addResult .getSuccess())
    { logDebug("**WARNING: error adding record to ASI Table:  " + tableName + " " + addResult.getErrorMessage()) ; return false }
    else
        logDebug("Successfully added record to ASI Table: " + tableName);
}

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
    }
    else {
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
function associatedLicensedProfessionalWithPublicUser(licnumber, publicUserID)
{
    var mylicense = aa.licenseScript.getRefLicenseProfBySeqNbr(aa.getServiceProviderCode(), licnumber);
    var puser = aa.publicUser.getPublicUserByPUser(publicUserID);
    if(puser.getSuccess())
        aa.licenseScript.associateLpWithPublicUser(puser.getOutput(),mylicense.getOutput());
}

function associatedRefContactWithRefLicProf(capIdStr,refLicProfSeq,servProvCode,auditID)
{
    var contact = getLicenseHolderByLicenseNumber(capIdStr);
    if(contact && contact.getRefContactNumber())
    {
        linkRefContactWithRefLicProf(parseInt(contact.getRefContactNumber()),refLicProfSeq,servProvCode,auditID)
    }
    else
    {
        logMessage("**ERROR:cannot find license holder of license");
    }
}

function changeCapContactTypes(origType, newType)
{
    // Renames all contacts of type origType to contact type of newType and includes Contact Address objects
    //
    var vCapId = capId;
    if (arguments.length == 3)
        vCapId = arguments[2];
    
    var capContactResult = aa.people.getCapContactByCapID(vCapId);
    var renamed = 0;
    if (capContactResult.getSuccess())
    {
        var Contacts = capContactResult.getOutput();
        for (yy in Contacts)
        {
            var contact = Contacts[yy].getCapContactModel();
            
            var people = contact.getPeople();
            var contactType = people.getContactType();
            aa.print("Contact Type " + contactType);
            
            if(contactType==origType)
            {
                
                var contactNbr = people.getContactSeqNumber();
                var editContact = aa.people.getCapContactByPK(vCapId, contactNbr).getOutput();
                editContact.getCapContactModel().setContactType(newType)
                
                aa.print("Set to: " + people.getContactType());
                renamed ++ ;
                
                var updContactResult = aa.people.editCapContact(editContact.getCapContactModel());
                logDebug("contact " + updContactResult);
                logDebug("contact.getSuccess() " + updContactResult.getSuccess());
                logDebug("contact.getOutput() " + updContactResult.getOutput());
                updContactResult.getOutput();
                logDebug("Renamed contact from " + origType + " to " + newType);
            }
        }
    }
    else
    {
        logMessage("**ERROR: Failed to get contacts: " + capContactResult.getErrorMessage());
        return false;
    }
    return renamed;
}


function checkWorkflowTaskAndStatus(capId, workflowTask, taskStatus) {
    var workflowResult = aa.workflow.getTasks(capId);
    if (workflowResult.getSuccess())
        wfObj = workflowResult.getOutput();
    else {
        aa.print("**ERROR: Failed to get workflow object: "+wfObj );
        return false;
    }
    
    for (i in wfObj) {
        fTask = wfObj[i];
        var status = fTask.getDisposition();
        var taskDesc = fTask.getTaskDescription();
        
        if(status != null && taskDesc != null && taskDesc.equals(workflowTask) && status.equals(taskStatus))
            return true;
    }
    
    return false;
}

function cntAssocGarageSales(strnum, strname, city, state, zip, cfname, clname)
{
    
    /***
     
     Searches for Garage-Yard Sale License records
     - Created in the current year
     - Matches address parameters provided
     - Matches the contact first and last name provided
     - Returns the count of records
     
     ***/
    
    // Create a cap model for search
    var searchCapModel = aa.cap.getCapModel().getOutput();
    
    // Set cap model for search. Set search criteria for record type DCA/*/*/*
    var searchCapModelType = searchCapModel.getCapType();
    searchCapModelType.setGroup("Licenses");
    searchCapModelType.setType("Garage-Yard Sale");
    searchCapModelType.setSubType("License");
    searchCapModelType.setCategory("NA");
    searchCapModel.setCapType(searchCapModelType);
    
    searchAddressModel = searchCapModel.getAddressModel();
    searchAddressModel.setStreetName(strname);
    
    gisObject = new com.accela.aa.xml.model.gis.GISObjects;
    qf = new com.accela.aa.util.QueryFormat;
    
    var toDate = aa.date.getCurrentDate();
    var fromDate = aa.date.parseDate("01/01/" + toDate.getYear());
    
    var recordCnt = 0;
    message = "The applicant has reached the Garage-Sale License limit of 3 per calendar year.<br>"
    
    capList = aa.cap.getCapListByCollection(searchCapModel, searchAddressModel, "", fromDate, toDate, qf, gisObject).getOutput();
    for (x in capList)
    {
        resultCap = capList[x];
        resultCapId = resultCap.getCapID();
        altId = resultCapId.getCustomID();
        //aa.print("Record ID: " + altId);
        resultCapIdScript = aa.cap.createCapIDScriptModel(resultCapId.getID1(),resultCapId.getID2(),resultCapId.getID3() );
        contact = aa.cap.getCapPrimaryContact(resultCapIdScript).getOutput();
        
        contactFname = contact.getFirstName();
        contactLname = contact.getLastName();
        
        if(contactFname==cfname && contactLname==clname)
        {
            recordCnt++;
            message = message + recordCnt + ": " + altId + " - " + contactFname + " " + contactLname + " @ " + strnum + " " + strname + "<br>";
        }
    }
    
    return recordCnt;
    
}

function ComplaintDuplicateCheck(){
    iRec = null;
    recordArray = new Array();
    recordArray = capIdsGetByAddr();
    aa.print("Length: " + recordArray.length);
    if (recordArray.length > 0) {
        for(iRec in recordArray) {
            ComplaintDuplicateCheckLoop(recordArray,iRec);
        }
    }
}
function ComplaintDuplicateCheckLoop(recordArray,iRec){
    vApp = null;
    vApp = recordArray[iRec];
    vCap = aa.cap.getCap(vApp).getOutput();
    vAppTypeString = vCap.getCapType().toString();
    vFileDateObj = vCap.getFileDate();
    bAppTypeMatch = false;
    bASIMatch = false;
    if (appMatch(vAppTypeString) && (vApp.equals(capId) == false)) {
        bAppTypeMatch = true;
    }
    
    if (bAppTypeMatch) {
        sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"MM/DD/YYYY");
    }
    
    if (bAppTypeMatch) {
        vFileDate = "" + vFileDateObj.getMonth() + "/" + vFileDateObj.getDayOfMonth() + "/" + vFileDateObj.getYear();
    }
    
    if (bAppTypeMatch && dateDiff(vFileDate, sysDateMMDDYYYY) < 3) {
        updateAppStatus("Potential Duplicate","This is a potential duplicate of Record ID: " + vApp.getCustomID());
        createCapComment("This is a potential duplicate of Record ID: " + vApp.getCustomID());
    }
}
function copyContactAddressToLicProf(contactAddress, licProf)
{
    if(contactAddress&&licProf)
    {
        licProf.setAddress1(contactAddress.getAddressLine1());
        licProf.setAddress2(contactAddress.getAddressLine2());
        licProf.setAddress3(contactAddress.getAddressLine3());
        licProf.setCity(contactAddress.getCity());
        licProf.setState(contactAddress.getState());
        licProf.setZip(contactAddress.getZip());
        licProf.getLicenseModel().setCountryCode(contactAddress.getCountryCode());	 }
}
function copyContactsWithAddress(pFromCapId, pToCapId)
{
    // Copies all contacts from pFromCapId to pToCapId and includes Contact Address objects
    //
    if (pToCapId == null)
        var vToCapId = capId;
    else
        var vToCapId = pToCapId;
    
    var capContactResult = aa.people.getCapContactByCapID(pFromCapId);
    var copied = 0;
    if (capContactResult.getSuccess())
    {
        var Contacts = capContactResult.getOutput();
        for (yy in Contacts)
        {
            var newContact = Contacts[yy].getCapContactModel();
            
            var newPeople = newContact.getPeople();
            // aa.print("Seq " + newPeople.getContactSeqNumber());
            
            var addressList = aa.address.getContactAddressListByCapContact(newContact).getOutput();
            newContact.setCapID(vToCapId);
            aa.people.createCapContact(newContact);
            newerPeople = newContact.getPeople();
            // contact address copying
            if (addressList)
            {
                for (add in addressList)
                {
                    var transactionAddress = false;
                    contactAddressModel = addressList[add].getContactAddressModel();
                    
                    logDebug("contactAddressModel.getEntityType():" + contactAddressModel.getEntityType());
                    
                    if (contactAddressModel.getEntityType() == "CAP_CONTACT")
                    {
                        transactionAddress = true;
                        contactAddressModel.setEntityID(parseInt(newerPeople.getContactSeqNumber()));
                    }
                    // Commit if transaction contact address
                    if(transactionAddress)
                    {
                        var newPK = new com.accela.orm.model.address.ContactAddressPKModel();
                        contactAddressModel.setContactAddressPK(newPK);
                        aa.address.createCapContactAddress(vToCapId, contactAddressModel);
                    }
                    // Commit if reference contact address
                    else
                    {
                        // build model
                        var Xref = aa.address.createXRefContactAddressModel().getOutput();
                        Xref.setContactAddressModel(contactAddressModel);
                        Xref.setAddressID(addressList[add].getAddressID());
                        Xref.setEntityID(parseInt(newerPeople.getContactSeqNumber()));
                        Xref.setEntityType(contactAddressModel.getEntityType());
                        Xref.setCapID(vToCapId);
                        // commit address
                        commitAddress = aa.address.createXRefContactAddress(Xref.getXRefContactAddressModel());
                        if(commitAddress.getSuccess())
                        {
                            commitAddress.getOutput();
                            logDebug("Copied contact address");
                        }
                    }
                }
            }
            // end if
            copied ++ ;
            logDebug("Copied contact from " + pFromCapId.getCustomID() + " to " + vToCapId.getCustomID());
        }
    }
    else
    {
        logMessage("**ERROR: Failed to get contacts: " + capContactResult.getErrorMessage());
        return false;
    }
    return copied;
}


function createRefContactsFromCapContactsAndLink(pCapId, contactTypeArray, ignoreAttributeArray, replaceCapContact, overwriteRefContact, refContactExists)
{
    
    // contactTypeArray is either null (all), or an array or contact types to process
    //
    // ignoreAttributeArray is either null (none), or an array of attributes to ignore when creating a REF contact
    //
    // replaceCapContact not implemented yet
    //
    // overwriteRefContact -- if true, will refresh linked ref contact with CAP contact data
    //
    // refContactExists is a function for REF contact comparisons.
    //
    // Version 2.0 Update:   This function will now check for the presence of a standard choice "REF_CONTACT_CREATION_RULES".
    // This setting will determine if the reference contact will be created, as well as the contact type that the reference contact will
    // be created with.  If this setting is configured, the contactTypeArray parameter will be ignored.   The "Default" in this standard
    // choice determines the default action of all contact types.   Other types can be configured separately.
    // Each contact type can be set to "I" (create ref as individual), "O" (create ref as organization),
    // "F" (follow the indiv/org flag on the cap contact), "D" (Do not create a ref contact), and "U" (create ref using transaction contact type).
    
    var standardChoiceForBusinessRules = "REF_CONTACT_CREATION_RULES";
    
    
    var ignoreArray = new Array();
    if (arguments.length > 1) ignoreArray = arguments[1];
    
    var defaultContactFlag = lookup(standardChoiceForBusinessRules,"Default");
    
    var c = aa.people.getCapContactByCapID(pCapId).getOutput()
    var cCopy = aa.people.getCapContactByCapID(pCapId).getOutput()  // must have two working datasets
    
    for (var i in c)
    {
        var ruleForRefContactType = "U"; // default behavior is create the ref contact using transaction contact type
        var con = c[i];
        
        var p = con.getPeople();
        
        var contactFlagForType = lookup(standardChoiceForBusinessRules,p.getContactType());
        
        if (!defaultContactFlag && !contactFlagForType) // standard choice not used for rules, check the array passed
        {
            if (contactTypeArray && !exists(p.getContactType(),contactTypeArray))
                continue;  // not in the contact type list.  Move along.
        }
        
        if (!contactFlagForType && defaultContactFlag) // explicit contact type not used, use the default
        {
            ruleForRefContactType = defaultContactFlag;
        }
        
        if (contactFlagForType) // explicit contact type is indicated
        {
            ruleForRefContactType = contactFlagForType;
        }
        
        if (ruleForRefContactType.equals("D"))
            continue;
        
        var refContactType = "";
        
        switch(ruleForRefContactType)
        {
            case "U":
                refContactType = p.getContactType();
                break;
            case "I":
                refContactType = "Individual";
                break;
            case "O":
                refContactType = "Organization";
                break;
            case "F":
                if (p.getContactTypeFlag() && p.getContactTypeFlag().equals("organization"))
                    refContactType = "Organization";
                else
                    refContactType = "Individual";
                break;
        }
        
        var refContactNum = con.getCapContactModel().getRefContactNumber();
        
        if (refContactNum)  // This is a reference contact.   Let's refresh or overwrite as requested in parms.
        {
            if (overwriteRefContact)
            {
                p.setContactSeqNumber(refContactNum);  // set the ref seq# to refresh
                p.setContactType(refContactType);
                
                var a = p.getAttributes();
                
                if (a)
                {
                    var ai = a.iterator();
                    while (ai.hasNext())
                    {
                        var xx = ai.next();
                        xx.setContactNo(refContactNum);
                    }
                }
                
                var r = aa.people.editPeopleWithAttribute(p,p.getAttributes());
                
                if (!r.getSuccess())
                    logDebug("WARNING: couldn't refresh reference people : " + r.getErrorMessage());
                else
                    logDebug("Successfully refreshed ref contact #" + refContactNum + " with CAP contact data");
            }
            
            if (replaceCapContact)
            {
                // To Be Implemented later.   Is there a use case?
            }
            
        }
        else  // user entered the contact freehand.   Let's create or link to ref contact.
        {
            var ccmSeq = p.getContactSeqNumber();
            
            var existingContact = refContactExists(p);  // Call the custom function to see if the REF contact exists
            
            var p = cCopy[i].getPeople();  // get a fresh version, had to mangle the first for the search
            
            if (existingContact)  // we found a match with our custom function.  Use this one.
            {
                refPeopleId = existingContact;
            }
            else  // did not find a match, let's create one
            {
                
                var a = p.getAttributes();
                
                if (a)
                {
                    //
                    // Clear unwanted attributes
                    var ai = a.iterator();
                    while (ai.hasNext())
                    {
                        var xx = ai.next();
                        if (ignoreAttributeArray && exists(xx.getAttributeName().toUpperCase(),ignoreAttributeArray))
                            ai.remove();
                    }
                }
                
                p.setContactType(refContactType);
                var r = aa.people.createPeopleWithAttribute(p,a);
                
                if (!r.getSuccess())
                {logDebug("WARNING: couldn't create reference people : " + r.getErrorMessage()); continue; }
                
                //
                // createPeople is nice and updates the sequence number to the ref seq
                //
                
                var p = cCopy[i].getPeople();
                var refPeopleId = p.getContactSeqNumber();
                
                logDebug("Successfully created reference contact #" + refPeopleId);
                
                // Need to link to an existing public user.
                
                var getUserResult = aa.publicUser.getPublicUserByEmail(con.getEmail())
                if (getUserResult.getSuccess() && getUserResult.getOutput()) {
                    var userModel = getUserResult.getOutput();
                    logDebug("createRefContactsFromCapContactsAndLink: Found an existing public user: " + userModel.getUserID());
                    
                    if (refPeopleId)	{
                        logDebug("createRefContactsFromCapContactsAndLink: Linking this public user with new reference contact : " + refPeopleId);
                        aa.licenseScript.associateContactWithPublicUser(userModel.getUserSeqNum(), refPeopleId);
                    }
                }
            }
            
            //
            // now that we have the reference Id, we can link back to reference
            //
            
            var ccm = aa.people.getCapContactByPK(pCapId,ccmSeq).getOutput().getCapContactModel();
            
            ccm.setRefContactNumber(refPeopleId);
            r = aa.people.editCapContact(ccm);
            
            if (!r.getSuccess())
            { logDebug("WARNING: error updating cap contact model : " + r.getErrorMessage()); }
            else
            { logDebug("Successfully linked ref contact " + refPeopleId + " to cap contact " + ccmSeq);}
            
            
        }  // end if user hand entered contact
    }  // end for each CAP contact
} // end function

function createRefLicProf(rlpId,rlpType,pContactType)
{
    //Creates/updates a reference licensed prof from a Contact
    //06SSP-00074, modified for 06SSP-00238
    var updating = false;
    var capContResult = aa.people.getCapContactByCapID(capId);
    if (capContResult.getSuccess())
    { conArr = capContResult.getOutput();  }
    else
    {
        logDebug ("**ERROR: getting cap contact: " + capAddResult.getErrorMessage());
        return false;
    }
    
    if (!conArr.length)
    {
        logDebug ("**WARNING: No contact available");
        return false;
    }
    
    
    var newLic = getRefLicenseProf(rlpId)
    
    if (newLic)
    {
        updating = true;
        logDebug("Updating existing Ref Lic Prof : " + rlpId);
    }
    else
        var newLic = aa.licenseScript.createLicenseScriptModel();
    
    //get contact record
    if (pContactType==null)
        var cont = conArr[0]; //if no contact type specified, use first contact
    else
    {
        var contFound = false;
        for (yy in conArr)
        {
            if (pContactType.equals(conArr[yy].getCapContactModel().getPeople().getContactType()))
            {
                cont = conArr[yy];
                contFound = true;
                break;
            }
        }
        if (!contFound)
        {
            logDebug ("**WARNING: No Contact found of type: "+pContactType);
            return false;
        }
    }
    
    peop = cont.getPeople();
    addr = peop.getCompactAddress();
    
    newLic.setContactFirstName(cont.getFirstName());
    //newLic.setContactMiddleName(cont.getMiddleName());  //method not available
    newLic.setContactLastName(cont.getLastName());
    newLic.setBusinessName(peop.getBusinessName());
    newLic.setAddress1(addr.getAddressLine1());
    newLic.setAddress2(addr.getAddressLine2());
    newLic.setAddress3(addr.getAddressLine3());
    newLic.setCity(addr.getCity());
    newLic.setState(addr.getState());
    newLic.setZip(addr.getZip());
    newLic.setPhone1(peop.getPhone1());
    newLic.setPhone2(peop.getPhone2());
    newLic.setEMailAddress(peop.getEmail());
    newLic.setFax(peop.getFax());
    
    newLic.setAgencyCode(aa.getServiceProviderCode());
    newLic.setAuditDate(sysDate);
    newLic.setAuditID(currentUserID);
    newLic.setAuditStatus("A");
    
    if (AInfo["Insurance Co"]) 		newLic.setInsuranceCo(AInfo["Insurance Co"]);
    if (AInfo["Insurance Amount"]) 		newLic.setInsuranceAmount(parseFloat(AInfo["Insurance Amount"]));
    if (AInfo["Insurance Exp Date"]) 	newLic.setInsuranceExpDate(aa.date.parseDate(AInfo["Insurance Exp Date"]));
    if (AInfo["Policy #"]) 			newLic.setPolicy(AInfo["Policy #"]);
    
    if (AInfo["Business License #"]) 	newLic.setBusinessLicense(AInfo["Business License #"]);
    if (AInfo["Business License Exp Date"]) newLic.setBusinessLicExpDate(aa.date.parseDate(AInfo["Business License Exp Date"]));
    
    newLic.setLicenseType(rlpType);
    
    if(addr.getState() != null)
        newLic.setLicState(addr.getState());
    else
        newLic.setLicState("MI"); //default the state if none was provided
    
    newLic.setStateLicense(rlpId);
    
    if (updating)
        myResult = aa.licenseScript.editRefLicenseProf(newLic);
    else
        myResult = aa.licenseScript.createRefLicenseProf(newLic);
    
    if (myResult.getSuccess())
    {
        logDebug("Successfully added/updated License No. " + rlpId + ", Type: " + rlpType);
        logMessage("Successfully added/updated License No. " + rlpId + ", Type: " + rlpType);
        return true;
    }
    else
    {
        logDebug("**ERROR: can't create ref lic prof: " + myResult.getErrorMessage());
        logMessage("**ERROR: can't create ref lic prof: " + myResult.getErrorMessage());
        return false;
    }
}


/*
 *  editEstimatedJobValue - original script in INCLUDES_ACCELA_FUNCTIONS overriddem
 *  line 30 typo fixed by G. Soter - Futurenet Group 06/24/2016 **case 16ACC-125635**
 */
function editEstimatedJobValue(jobValue) // option CapId
{
    var itemCap = capId;
    if (arguments.length > 1) {
        itemCap = arguments[1]; // use cap ID specified in args
    }
    var bValScriptObjResult = aa.cap.getBValuatn4AddtInfo(itemCap);
    var cdScriptObjResult = aa.cap.getCapDetail(itemCap);
    if (!bValScriptObjResult.getSuccess()) {
        logDebug("**ERROR: No cap detail script object : " + bValScriptObjResult.getErrorMessage());
        return false;
    }
    var bValScriptObj = bValScriptObjResult.getOutput();
    if (!bValScriptObj) {
        logDebug("**ERROR: No valuation detail script object");
        return false;
    }
    if (!cdScriptObjResult.getSuccess()) {
        logDebug("**ERROR: No cap detail script object : " + cdScriptObjResult.getErrorMessage());
        return false;
    }
    var cdScriptObj = cdScriptObjResult.getOutput();
    if (!cdScriptObj) {
        logDebug("**ERROR: No cap detail script object");
        return false;
    }
    bValScriptObj.setEstimatedValue(parseFloat(jobValue));
    var vedtResults = aa.cap.editAddtInfo(cdScriptObj, bValScriptObj);
    if (!vedtResults.getSuccess()) {
        logDebug("**Error updating the job value in additional information" + vedtResults.getErrorMessage());
    }
    if (vedtResults !== null && vedtResults.getSuccess() === true) {
        logDebug("Updated the estimated job value to " + jobValue);
    }
}

function generateReport(aaReportName, parameters, rModule) {
    
    var reportName = aaReportName;
    
    report = aa.reportManager.getReportInfoModelByName(reportName);
    report = report.getOutput();
    
    report.setModule(rModule);
    report.setCapId(capId);
    
    report.setReportParamaeters(parameters);
    
    var permit = aa.reportManager.hasPermission(reportName, currentUserID);
    
    if (permit.getOutput().booleanValue()) {
        
        var reportResult = aa.reportManager.getReportResult(report);
        
        if (reportResult) {
            reportResult = reportResult.getOutput();
            var reportFile = aa.reportManager.storeReportToDisk(reportResult);
            logMessage("Report Result: " + reportResult);
            reportFile = reportFile.getOutput();
            return reportFile;
        } else {
            logMessage("Unable to run report: " + reportName + " For Admin "+ systemUserObj);
            return false;
        }
    } else {
        logMessage("Unable to run report: " + reportName + " For Admin "+ systemUserObj);
        return false;
    }
}
function getACADeepLinkParam4Notification(params, acaUrl, pAppType, pAppTypeAlias, module) {
    
    //Pass in a hashtable and it will add the additional parameters in the table.
    
    addParameter(params, "$$acaDeepLinkUrl$$", getDeepLinkUrl(acaUrl, pAppType, module));
    addParameter(params, "$$acaDeepLinkAppTypeAlias$$", pAppTypeAlias);
    
    return params;
}
function getAcaDocDownloadParam4Notification(params, acaUrl, docModel) {
    
    //Pass in the hashtable and it will add the additional parameters to the table.
    
    addParameter(params, "$$acaDocDownloadUrl$$", getACADocumentDownloadUrl(acaUrl, docModel));
    
    return params;
}
function getACADocumentDownloadUrl(acaUrl, documentModel) {
    
    //Returns the ACA URL for supplied document model
    
    var acaUrlResult = aa.document.getACADocumentUrl(acaUrl, documentModel);
    
    if(acaUrlResult.getSuccess()) {
        acaDocUrl = acaUrlResult.getOutput();
        return acaDocUrl;
    } else {
        logDebug("Error retrieving ACA Document URL: " + acaUrlResult.getErrorType())
        return false;
    }
}
function getACARecordParam4Notification(params, acaUrl) {
    
    //Pass in a hashtable and it will add the additional parameters to the table.
    addParameter(params, "$$acaRecordUrl$$", getACARecordURL(acaUrl));
    
    
    return params;
}
function getACARecordURL(acaUrl) {
    
    var acaRecordUrl = "";
    var id1 = capId.ID1;
    var id2 = capId.ID2;
    var id3 = capId.ID3;
    
    acaRecordUrl = acaUrl + "/urlrouting.ashx?type=1000";
    acaRecordUrl += "&Module= " + cap.getCapModel().getModuleName();
    acaRecordUrl += "&capID1= " + id1 + " &capID2= " + id2 + " &capID3= " + id3;
    acaRecordUrl += "&agencyCode= " + aa.getServiceProviderCode();
    
    return acaRecordUrl;
}
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

function getConatctAddreeByID(contactID, vAddressType)
{
    var conArr = new Array();
    var capContResult = aa.people.getCapContactByContactID(contactID);
    
    if (capContResult.getSuccess())
    {
        conArr = capContResult.getOutput();
        for(contact in conArr)
        {
            cont = conArr[contact];
            
            return getContactAddressByContact(cont.getCapContactModel(),vAddressType);
        }
    }
}

function getContactAddressByContact(contactModel,vAddressType)
{
    var xrefContactAddressBusiness = aa.proxyInvoker.newInstance("com.accela.aa.aamain.address.XRefContactAddressBusiness").getOutput();
    var contactAddressArray = xrefContactAddressBusiness.getContactAddressListByCapContact(contactModel);
    for(i=0;i<contactAddressArray.size();i++)
    {
        var contactAddress = contactAddressArray.get(i);
        if(vAddressType.equals(contactAddress.getAddressType()))
        {
            return contactAddress;
        }
    }
}
function getContactParams4Notification(params,pContact) {
    // Pass in a hashtable and it will add the additional parameters to the table.
    // Pass in contact to retrieve information from
    
    thisContact = pContact;
    conType = "contact";
    
    addParameter(params, "$$" + conType + "LastName$$", thisContact["lastName"]);
    addParameter(params, "$$" + conType + "FirstName$$", thisContact["firstName"]);
    addParameter(params, "$$" + conType + "MiddleName$$", thisContact["middleName"]);
    addParameter(params, "$$" + conType + "BusinesName$$", thisContact["businessName"]);
    addParameter(params, "$$" + conType + "ContactSeqNumber$$", thisContact["contactSeqNumber"]);
    addParameter(params, "$$" + conType + "$$", thisContact["contactType"]);
    addParameter(params, "$$" + conType + "Relation$$", thisContact["relation"]);
    addParameter(params, "$$" + conType + "Phone1$$", thisContact["phone1"]);
    addParameter(params, "$$" + conType + "Phone2$$", thisContact["phone2"]);
    addParameter(params, "$$" + conType + "Email$$", thisContact["email"]);
    addParameter(params, "$$" + conType + "AddressLine1$$", thisContact["addressLine1"]);
    addParameter(params, "$$" + conType + "AddressLine2$$", thisContact["addressLine2"]);
    addParameter(params, "$$" + conType + "City$$", thisContact["city"]);
    addParameter(params, "$$" + conType + "State$$", thisContact["state"]);
    addParameter(params, "$$" + conType + "Zip$$", thisContact["zip"]);
    addParameter(params, "$$" + conType + "Fax$$", thisContact["fax"]);
    addParameter(params, "$$" + conType + "Notes$$", thisContact["notes"]);
    addParameter(params, "$$" + conType + "Country$$", thisContact["country"]);
    addParameter(params, "$$" + conType + "FullName$$", thisContact["fullName"]);
    
    return params;
}

function getDeepLinkUrl(acaUrl, appType, module) {
    
    var acaDeepLinkUrl = "";
    
    acaDeepLinkUrl = acaUrl + "/Cap/CapApplyDisclaimer.aspx?CAPType=";
    acaDeepLinkUrl += appType;
    acaDeepLinkUrl += "&Module= " + module;;
    
    return acaDeepLinkUrl;
}
function getLatestScheduledDate() {
    var inspResultObj = aa.inspection.getInspections(capId);
    if (inspResultObj.getSuccess()) {
        inspList = inspResultObj.getOutput();
        var array = new Array();
        var j = 0;
        for (i in inspList) {
            if (inspList[i].getInspectionStatus().equals("Scheduled")) {
                array[j++] = aa.util.parseDate(inspList[i].getInspection().getScheduledDate());
            }
        }
        
        var latestScheduledDate = array[0];
        for (k = 0; k < array.length; k++) {
            temp = array[k];
            logDebug("----------array.k---------->" + array[k]);
            if (temp.after(latestScheduledDate)) {
                latestScheduledDate = temp;
            }
        }
        return latestScheduledDate;
    }
    return false;
}


function getLicenseHolderByLicenseNumber(capIdStr)
{
    var capContactResult = aa.people.getCapContactByCapID(capIdStr);
    if (capContactResult.getSuccess())
    {
        var Contacts = capContactResult.getOutput();
        for (yy in Contacts)
        {
            var contact = Contacts[yy].getCapContactModel();
            var contactType = contact.getContactType();
            if(contactType.toUpperCase().equals("LICENSE HOLDER") && contact.getRefContactNumber())
            {
                return contact;
            }
        }
    }
}
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
function getPrimaryAddressLineParam4Notification(params) {
    
    //Pass in a hashtable and it will add the additional parameters to the table.
    
    var addressLine = "";
    
    adResult = aa.address.getPrimaryAddressByCapID(capId, "Y");
    
    if (adResult.getSuccess()) {
        ad = adResult.getOutput().getAddressModel();
        
        addParameter(params, "$$addressLine$$", ad.getDisplayAddress());
    }
    
    return params;
}
function getPrimaryOwnerParams4Notification(params) {
    
    //Pass in a hashtable and it will add the additional parameters to the table
    
    capOwnerResult = aa.owner.getOwnerByCapId(capId);
    
    if (capOwnerResult.getSuccess()) {
        owner = capOwnerResult.getOutput();
        
        for (own in owner) {
            thisOwner = owner[own];
            if (thisOwner.getPrimaryOwner() == "Y") {
                addParameter(params, "$$ownerFullName$$", thisOwner.getOwnerFullName());
                addParameter(params, "$$ownerPhone$$", thisOwner.getPhone());
                break;
            }
        }
    }
    
    return params;
}
function getRecordParams4Notification(params) {
    
    //Pass in a hashtable and it will add the additional parameters to the table
    
    addParameter(params, "$$altID$$", capIDString);
    addParameter(params, "$$capName$$", capName);
    addParameter(params, "$$capStatus$$", capStatus);
    addParameter(params, "$$fileDate$$", fileDate);
    addParameter(params, "$$wordDesc$$", workDescGet(capId));
    addParameter(params, "$$balanceDue$$", "$" + parseFloat(balanceDue).toFixed(2));
    addParameter(params, "$$capTypeAlias$$", aa.cap.getCap(capId).getOutput().getCapType().getAlias());
    
    //	if(wfComment != null) {
    //		addParameter(params, "$$wfComment$$", wfComment);
    //	}
    return params;
}
function getWorkflowParams4Notification(params) {
    
    //Pass in a hashtable and it will add the additional parameters to the table
    
    //Testing Purpose Begins
    var wfTask = aa.env.getValue("WorkflowTask");				// Workflow Task Triggered event
    var wfStatus = aa.env.getValue("WorkflowStatus");			// Status of workflow that triggered event
    var wfDate = aa.env.getValue("WorkflowStatusDate");			// date of status of workflow that triggered event
    var wfDateMMDDYYYY = wfDate.substr(5,2) + "/" + wfDate.substr(8,2) + "/" + wfDate.substr(0,4);	// date of status of workflow that triggered event in format MM/DD/YYYY
    var wfProcessID = aa.env.getValue("ProcessID");				// Process ID of workflow
    var wfStep ; var wfComment ; var wfNote ; var wfDue ; var wfHours;			// Initialize
    var wfProcess ; 							// Initialize
    // Go get other task details
    var wfObj = aa.workflow.getTasks(capId).getOutput();
    for (i in wfObj)
    {
        fTask = wfObj[i];
        if (fTask.getTaskDescription().equals(wfTask) && (fTask.getProcessID() == wfProcessID))
        {
            wfStep = fTask.getStepNumber();
            wfProcess = fTask.getProcessCode();
            wfComment = fTask.getDispositionComment();
            wfNote = fTask.getDispositionNote();
            wfDue = fTask.getDueDate();
            wfHours = fTask.getHoursSpent();
            wfTaskObj = fTask
        }
    }
    logDebug("wfTask = " + wfTask);
    logDebug("wfTaskObj = " + wfTask.getClass());
    logDebug("wfStatus = " + wfStatus);
    logDebug("wfDate = " + wfDate);
    logDebug("wfDateMMDDYYYY = " + wfDateMMDDYYYY);
    logDebug("wfStep = " + wfStep);
    logDebug("wfComment = " + wfComment);
    logDebug("wfProcess = " + wfProcess);
    logDebug("wfNote = " + wfNote);
    
    /* Added for version 1.7 */
    var wfStaffUserID = aa.env.getValue("StaffUserID");
    var wfTimeOT = aa.env.getValue("Overtime");
    logDebug("wfStaffUserID = " + wfStaffUserID);
    logDebug("wfHours = " + wfHours);
    
    //Testing purpose ends
    
    addParameter(params, "$$wfTask$$", wfTask);
    addParameter(params, "$$wfStatus$$", wfStatus);
    addParameter(params, "$$wfDate$$", wfDate);
    addParameter(params, "$$wfComment$$", wfComment);
    addParameter(params, "$$wfStaffUserID$$", wfStaffUserID);
    addParameter(params, "$$wfHours$$", "$" + wfHours);
    
    return params;
}
function GlobalFlags(){
    LICENSESTATE = "MI";
}

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
function LicProfLookup(){
    logDebug("Using LICENSESTATE = " + LICENSESTATE + " from EMSE:GlobalFlags");
    //Issue State;
    LICENSETYPE = "";
    //License Type to be populated;
    licCapId = null;
    isNewLic = false;
    licIDString = null;
    licObj = null;
    licCap = null;
    LicProfLookup_getLicenses();
    //Get License CAP;
    if (licCapId !=null) {
        LicProfLookup_getLicenseType();
        stateLicense = getAppSpecific("State License Number",licCapId);
    }
    
    licObj = licenseProfObject(stateLicense ,LICENSETYPE);
    //Get LicArray;
    if (!licObj.valid && lookup("LICENSED PROFESSIONAL TYPE",LICENSETYPE) != null) {
        LicProfLookup_CreateLP();
        licObj = licenseProfObject(stateLicense ,LICENSETYPE );
    }
    
    if (licObj.valid) {
        LicProfLookup_UpdateLP();
    } else {
        logDebug("LP Not found to update");
    }
}
function LicProfLookup_CreateLP(){
    var vNewLic = aa.licenseScript.createLicenseScriptModel();
    vNewLic.setAgencyCode(aa.getServiceProviderCode());
    vNewLic.setAuditDate(sysDate);
    vNewLic.setAuditID(currentUserID);
    vNewLic.setAuditStatus("A");
    vNewLic.setLicenseType(LICENSETYPE);
    vNewLic.setLicState(LICENSESTATE);
    vNewLic.setStateLicense(stateLicense);
    aa.licenseScript.createRefLicenseProf(vNewLic);
    var tmpLicObj = licenseProfObject(stateLicense,LICENSETYPE);
    if (tmpLicObj.valid) {
        isNewLic = true;
    }
    
    if (tmpLicObj.valid &&licIDString) {
        associatedRefContactWithRefLicProf(licCapId,licObj.refLicModel.getLicSeqNbr(), aa.getServiceProviderCode(),currentUserID);
    }
    
    var mycap = aa.cap.getCap(capId).getOutput();
    if (tmpLicObj.valid && mycap.getCapModel().getCreatedByACA() == 'Y') {
        associatedLicensedProfessionalWithPublicUser(licObj.refLicModel.getLicSeqNbr(), mycap.getCapModel().getCreatedBy().toString());
    }
}
function LicProfLookup_UpdateLP(){
    LicProfLookup_UpdateLP_BaseFields(licObj,LICENSESTATE,licCap,licCapId,licCapTypeArr);
    LicProfLookup_UpdateLP_ApplicationStatus(licObj,licCapStatus);
    if (licObj.updateRecord()) {
        logDebug("LP Updated Successfully");
    } else {
        logDebug("LP Update Failed");
    }
}
function LicProfLookup_UpdateLP_ApplicationStatus(licObj,licCapStatus){
    licObj.refLicModel.setBusinessName2(licCapStatus);
    logDebug("Lic Cap Status: " + licCapStatus);
}
function LicProfLookup_UpdateLP_BaseFields(licObj,LICENSESTATE,licCap,licCapId,licCapTypeArr){
    licObj.refLicModel.setState(LICENSESTATE);
    licObj.refLicModel.setLicenseBoard(LICENSETYPE);
    licObj.refLicModel.setLicenseIssueDate(licCap.getFileDate());
    var expObj = null;
    var expDt = null;
    var expObjRes = aa.expiration.getLicensesByCapID(licCapId);
    if(expObjRes.getSuccess()) var expObj = expObjRes.getOutput();
    if (expObj != null) {
        expDt = aa.date.parseDate(expObj.getExpDateString());
    }
    
    if (expDt != null) {
        licObj.refLicModel.setBusinessLicExpDate(expDt);
        //Expiration Date;
    }
    
    if (licCapTypeArr[1] == "Business") {
        licObj.refLicModel.setLicenseBoard(getAppSpecific("Business Type",licCapId));
    } else {
        licObj.refLicModel.setLicenseBoard(LICENSETYPE);
    }
    
    if (licObj.updateFromRecordContactByType(licCapId,"",true,true)) {
        logDebug("LP Updated from Primary Contact");
    } else {
        logDebug("LP Failed to Update from Primary Contact trying License Holder");
        if(licObj.updateFromRecordContactByType(licCapId,"License Holder",true,true)) logDebug("Updated from License Holder");
        else logDebug("Couldn't Update Contact Info");
    }
    
    if (getAppSpecific("Doing Business As (DBA) Name",licCapId)) {
        licObj.refLicModel.setBusinessName(getAppSpecific("Doing Business As (DBA) Name",licCapId) );
    }
    
    if (getAppSpecific("State License Expiration Date",licCapId)) {
        var expDate = getAppSpecific("State License Expiration Date",licCapId);
        licObj.refLicModel.setLicenseExpirationDate(aa.date.parseDate(expDate));
    }
    
    licObj.refLicModel.setBusinessLicense(licCap.getCapModel().getAltID());
    logDebug("BaseFields setBusinessLicense =" +  licCap.getCapModel().getAltID());
}
function linkRefContactWithRefLicProf(refContactSeq,refLicProfSeq,servProvCode,auditID)
{
    
    if(refContactSeq&&refLicProfSeq&&servProvCode&&auditID)
    {
        var xRefContactEntity = aa.people.getXRefContactEntityModel().getOutput();
        xRefContactEntity.setServiceProviderCode(servProvCode);
        xRefContactEntity.setContactSeqNumber(refContactSeq);
        xRefContactEntity.setEntityType("PROFESSIONAL");
        xRefContactEntity.setEntityID1(refLicProfSeq);
        var auditModel = xRefContactEntity.getAuditModel();
        auditModel.setAuditDate(new Date());
        auditModel.setAuditID(auditID);
        auditModel.setAuditStatus("A")
        xRefContactEntity.setAuditModel(auditModel);
        var xRefContactEntityBusiness = aa.proxyInvoker.newInstance("com.accela.aa.aamain.people.XRefContactEntityBusiness").getOutput();
        var existedModel = xRefContactEntityBusiness.getXRefContactEntityByUIX(xRefContactEntity);
        if(existedModel.getContactSeqNumber())
        {
            //aa.print("The professional license have already linked to contact.");
            logMessage("License professional link to reference contact successfully.");
        }
        else
        {
            var XRefContactEntityCreatedResult = xRefContactEntityBusiness.createXRefContactEntity(xRefContactEntity);
            if (XRefContactEntityCreatedResult)
            {
                //aa.print("License professional link to reference contact successfully.");
                logMessage("License professional link to reference contact successfully.");
            }
            else
            {
                //aa.print("**ERROR:License professional failed to link to reference contact.  Reason: " +  XRefContactEntityCreatedResult.getErrorMessage());
                logMessage("**ERROR:License professional failed to link to reference contact.  Reason: " +  XRefContactEntityCreatedResult.getErrorMessage());
            }
        }
    }
    else
    {
        //aa.print("**ERROR:Some Parameters are empty");
        logMessage("**ERROR:Some Parameters are empty");
    }
    
}

function printEnv() {
    //Log All Environmental Variables as  globals
    var params = aa.env.getParamValues();
    var keys =  params.keys();
    var key = null;
    while(keys.hasMoreElements())
    {
        key = keys.nextElement();
        eval("var " + key + " = aa.env.getValue(\"" + key + "\");");
        aa.print(key + " = " + aa.env.getValue(key));
    }
}
function reversePayment() { logDebug("hello") }
function runReportTest(aaReportName)
{
    x = "test param"
    currentUserID = "ADMIN";
    setCode = "X";
    var bReport = false;
    var reportName=aaReportName;
    report = aa.reportManager.getReportModelByName(reportName);
    report = report.getOutput();
    var permit = aa.reportManager.hasPermission(reportName,currentUserID);
    if (permit.getOutput().booleanValue())
    {
        var parameters = aa.util.newHashMap();
        parameters.put("BatchNumber", setCode);
        //report.setReportParameters(parameters);
        var msg = aa.reportManager.runReport(parameters,report);
        aa.env.setValue("ScriptReturnCode", "0");
        aa.env.setValue("ScriptReturnMessage", msg.getOutput());
    }
}
function sendExternalReviewNotification() {
    
    //Provide the ACA URL - This should be set in INCLUDES_CUSTOM_GLOBAL
    var acaURL = "acasupp3.accela.com/detroit";
    
    //Provide the Agency Reply Email - This should be set in INCLUDE_CUSTOM_GLOBALS
    //	var agencyReplyEmail = "accelasupport@futurenetgroup.com";
    
    //Provide the To Email and CC Email - This should be set in INCLUDE_CUSTOM_GLOBALS
    var toEmail = "chaitanyat@futurenetgroup.com";
    var ccEmail = "gregs2@futurenetgroup.com";
    
    //Provide the Notification Template to use
    var notificationTemplate = "NOTIFICATION TEMPLATE";
    
    var eParams = aa.util.newHashtable();
    
    addParameter(eParams, "$$altID$$", cap.getCapType().getAlias());
    
    getRecordParams4Notification(eParams);
    
    getACARecordParam4Notification(eParams, acaURL);
    
    getWorkflowParams4Notification(eParams);
    
    getPrimaryAddressLineParam4Notification(eParams);
    
    sendNotification("", toEmail, ccEmail, notificationTemplate, eParams, null);
    
}
function sendNotification(emailFrom, emailTo, emailCC, templateName, params, reportFile) {
    
    //send notification
    var id1 = capId.ID1;
    var id2 = capId.ID2;
    var id3 = capId.ID3;
    
    var capIDScriptModel = aa.cap.createCapIDScriptModel(id1, id2, id3);
    
    var result = null;
    result = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, templateName, params, capIDScriptModel, reportFile);
    
    if (result.getSuccess()) {
        logDebug("Sent email Successfully!");
        return true;
    } else {
        logDebug("Failed to send mail. - " + result.getErrorType());
        return false;
    }
}
function ServiceRequestCloseCase(){
    if (capStatus == "Complete-Fixed") {
        updateAppStatus("Closed-Fixed");
    }
    
    if (capStatus == "Complete-Duplicate") {
        updateAppStatus("Closed-Duplicate");
    }
    
    if (capStatus == "Complete-Referred") {
        updateAppStatus("Closed-Referred");
    }
    
    if (capStatus == "Complete-No Violation") {
        updateAppStatus("Closed-No Violation");
    }
}
function ServiceRequestDuplicateCheck(){
    if (matches(currentUserID,"ADMIN")) {
        showDebug = 3;
        showMessage= true;
    }
    
    iRec = null;
    recordArray = new Array();
    recordArray = capIdsGetByAddr();
    aa.print("Length: " + recordArray.length);
    if (recordArray.length > 0) {
        for(iRec in recordArray){
            ServiceRequestDuplicateCheckLoop(recordArray[iRec]);
        }
    }
}
function ServiceRequestDuplicateCheckLoop(vApp){
    vApp = null;
    vApp = recordArray[iRec];
    vCap = aa.cap.getCap(vApp).getOutput();
    vAppTypeString = vCap.getCapType().toString();
    vFileDateObj = vCap.getFileDate();
    bAppTypeMatch = false;
    bASIMatch = false;
    if (appMatch(vAppTypeString) && (vApp.equals(capId) == false)) {
        bAppTypeMatch = true;
    }
    
    if (bAppTypeMatch) {
        sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"MM/DD/YYYY");
    }
    
    if (bAppTypeMatch) {
        vFileDate = "" + vFileDateObj.getMonth() + "/" + vFileDateObj.getDayOfMonth() + "/" + vFileDateObj.getYear();
    }
    
    if (bAppTypeMatch && dateDiff(vFileDate, sysDateMMDDYYYY) < 3) {
        updateAppStatus("Potential Duplicate","This is a potential duplicate of Record ID: " + vApp.getCustomID());
        createCapComment("This is a potential duplicate of Record ID: " + vApp.getCustomID());
    }
}
function SetContactRelationshipToContactType(){
    if (matches(currentUserID,"ADMIN")) {
        showDebug = false;
        showMessage= false;
    }
    
    iCont = null;
    contactArray = new Array();
    contactArray = getContactArray();
    if (contactArray.length > 0) {
        for (iCont in contactArray){
            SetContactRelationshipToContactTypeLoop(contactArray,iCont);
        }
    }
}
function SetContactRelationshipToContactTypeLoop(contactArray,iCont){
    showDebug=3;
    tContact = contactArray[iCont];
    aa.print("ContactName: " + tContact["firstName"] + " " + tContact["lastName"] + " " + tContact["contactType"]);
    contactSetRelation(tContact["contactSeqNumber"], tContact["contactType"]);
}
function taskCloseAllAdjustBranchtaskExcept(e, t) {
    var n = new Array;
    var r = false;
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++)
            n.push(arguments[i])
            } else
                r = true;
    var s = aa.workflow.getTasks(capId);
    if (s.getSuccess())
        var o = s.getOutput();
    else {
        logMessage("**ERROR: Failed to get workflow object: " + s.getErrorMessage());
        return false
    }
    var u;
    var a;
    var f;
    var l = aa.date.getCurrentDate();
    var c = " ";
    var h;
    for (i in o) {
        u = o[i];
        h = u.getTaskDescription();
        a = u.getStepNumber();
        if (r) {
            aa.workflow.handleDisposition(capId, a, e, l, c, t, systemUserObj, "B");
            logMessage("Closing Workflow Task " + h + " with status " + e);
            logDebug("Closing Workflow Task " + h + " with status " + e)
        } else {
            if (!exists(h, n)) {
                aa.workflow.handleDisposition(capId, a, e, l, c, t, systemUserObj, "B");
                logMessage("Closing Workflow Task " + h + " with status " + e);
                logDebug("Closing Workflow Task " + h + " with status " + e)
            }
        }
    }
}


function taskCloseAllExcept(pStatus,pComment)
{
    // Closes all tasks in CAP with specified status and comment
    // Optional task names to exclude
    // 06SSP-00152
    //
    var taskArray = new Array();
    var closeAll = false;
    if (arguments.length > 2) //Check for task names to exclude
    {
        for (var i=2; i<arguments.length; i++)
            taskArray.push(arguments[i]);
    }
    else
        closeAll = true;
    
    var workflowResult = aa.workflow.getTasks(capId);
    if (workflowResult.getSuccess())
        var wfObj = workflowResult.getOutput();
    else
    {
        logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage());
        return false;
    }
    
    var fTask;
    var stepnumber;
    var processID;
    var dispositionDate = aa.date.getCurrentDate();
    var wfnote = " ";
    var wftask;
    
    for (i in wfObj)
    {
        fTask = wfObj[i];
        wftask = fTask.getTaskDescription();
        stepnumber = fTask.getStepNumber();
        //processID = fTask.getProcessID();
        if (closeAll)
        {
            aa.workflow.handleDisposition(capId,stepnumber,pStatus,dispositionDate,wfnote,pComment,systemUserObj,"Y");
            logMessage("Closing Workflow Task " + wftask + " with status " + pStatus);
            logDebug("Closing Workflow Task " + wftask + " with status " + pStatus);
        }
        else
        {
            if (!exists(wftask,taskArray))
            {
                aa.workflow.handleDisposition(capId,stepnumber,pStatus,dispositionDate,wfnote,pComment,systemUserObj,"Y");
                logMessage("Closing Workflow Task " + wftask + " with status " + pStatus);
                logDebug("Closing Workflow Task " + wftask + " with status " + pStatus);
            }
        }
    }
}
function TESTDRIVE_ASA(){
    if (appMatch("Building/Residential/Electrical/NA")) {
        closeTask("Application Submittal","Accepted - Plan Review Req","Updated for Test Drive","");
    }
    
    if (appMatch("Building/Residential/Electrical/NA")) {
        closeTask("Plan Review","Approved","Updated for Test Drive","");
    }
}
function TESTDRIVE_IRSA(){
    if (appMatch("Building/Residential/Electrical/NA")  && inspType == "Electrical Final" && inspResult == "Passed") {
        closeTask("Meter Release","Meter Released","Updated by Inspection Result","Note");
    }
    
    if (appMatch("Licenses/Business/Restaurant/Application")  && inspType == "Business License Inspection" && inspResult == "Passed") {
        closeTask("License Issuance","Issued","Updated by Inspection Result","Note");
    }
}
function TESTDRIVE_ISA(){
    showDebug = true;
    showMessage= true;
    if (appMatch("Enforcement/Incident/Abatement/Graffiti")  && inspType == "Initial Investigation") {
        scheduleInspectDate("Initial Investigation",dateAdd(null,1,true),"TESTDRIVE");
    }
}
function TESTDRIVE_WTUA(){
    if (appMatch("Building/Residential/Electrical/NA")  && wfTask.equals("Permit Issuance") && wfStatus.equals("Issued")) {
        scheduleInspection("Electrical Final",0,"TESTDRIVE");
    }
    
    if (appMatch("Licenses/Business/Retail/Application")  && wfTask.equals("Licensing Review") && wfStatus.equals("Approved for Issuance")) {
        scheduleInspection("Business License Inspection",0,"TESTDRIVE");
    }
}
function updateFeeAmount(fcode, fsched, fperiod, famt, finvoice, pDuplicate, pFeeSeq) {
    // Updates an assessed fee with a new Amt.  If not found, adds it; else if invoiced fee found, adds another with adjusted amt.
    // optional param pDuplicate -if "N", won't add another if invoiced fee exists (SR5085)
    // Script will return fee sequence number if new fee is added otherwise it will return null (SR5112)
    // Optional param pSeqNumber, Will attempt to update the specified Fee Sequence Number or Add new (SR5112)
    // 12/22/2008 - DQ - Correct Invoice loop to accumulate instead of reset each iteration
    
    // If optional argument is blank, use default logic (i.e. allow duplicate fee if invoiced fee is found)
    if (pDuplicate == null || pDuplicate.length == 0)
        pDuplicate = "Y";
    else
        pDuplicate = pDuplicate.toUpperCase();
    
    var invFeeFound = false;
    //CIH 1/27/2016
    //var adjustedQty = fqty;
    var adjustedAmt = famt; //pass famt instead of fqty in this function
    //
    var feeSeq = null;
    feeUpdated = false;
    
    if (pFeeSeq == null)
        getFeeResult = aa.finance.getFeeItemByFeeCode(capId, fcode, fperiod);
    else
        getFeeResult = aa.finance.getFeeItemByPK(capId, pFeeSeq);
    //true ^ vFeeItemObj = aa.finance.getFeeItemByPK(vFeeCap, vFeeSeq);
    
    if (getFeeResult.getSuccess()) {
        if (pFeeSeq == null) {
            //var feeList = getFeeResult.getOutput();
            //CIH 1/27/2016
            var feeItem = getFeeResult.getOutput(); //.getF4FeeItem(); //was feeList.getF4FeeItem()
            //true ^ vFeeItemObj = aa.finance.getFeeItemByPK(vFeeCap, vFeeSeq).getOutput().getF4FeeItem();
        }
        else {
            //var feeList = new Array();
            //feeList[0] = getFeeResult.getOutput();
            //CIH 1/27/2016
            var feeItem = new Array();
            feeItem[0] = getFeeResult.getOutput(); //.getF4FeeItem(); //was feeList.getF4FeeItem();
            //
        }
        // CIH 1/27/2016 INVOICED
        for (feeNum in feeItem) {
            //true ^ vFeeItemObj = aa.finance.getFeeItemByPK(vFeeCap, vFeeSeq).getOutput().getF4FeeItem();
            if (feeItem[feeNum].getFeeitemStatus().equals("INVOICED")) {
                if (pDuplicate == "Y") {
                    logDebug("Invoiced fee " + fcode + " found, subtracting invoiced amount from update qty.");
                    //CIH replaced adjustedQty formula with adjustedAmt formula
                    //adjustedQty = adjustedQty - feeList[feeNum].getFeeUnit();
                    adjustedAmt = adjustedAmt - feeItem[feeNum].getFee(); //famt = adjustedAmt - feeAmount
                    invFeeFound = true;
                } else {
                    invFeeFound = true;
                    logDebug("Invoiced fee " + fcode + " found.  Not updating this fee. Not assessing new fee " + fcode);
                }
            }
            
            if (feeItem[feeNum].getFeeitemStatus().equals("NEW")) {
                //adjustedQty = adjustedQty - feeList[feeNum].getFeeUnit();
                adjustedAmt = adjustedAmt - feeItem[feeNum].getFee(); //famt = adjustedAmt - feeAmount
            }
        }
        // CIH 1/27/2016 NEW
        for (feeNum in feeItem)
            //true ^ vFeeItemObj = aa.finance.getFeeItemByPK(vFeeCap, vFeeSeq).getOutput().getF4FeeItem();
            if (feeItem[feeNum].getFeeitemStatus().equals("NEW") && !feeUpdated) // update this fee item
            {
                var feeSeq = feeItem[feeNum].getFeeSeqNbr();
                //var editResult = aa.finance.editFeeItemUnit(capId, adjustedQty + feeList[feeNum].getFeeUnit(), feeSeq);
                var editResult = aa.finance.editFeeItem(capId, adjustedAmt + feeItem[feeNum].getFee(), feeSeq);
                feeUpdated = true;
                if (editResult.getSuccess()) {
                    logDebug("Updated Amount on Existing Fee Item: " + fcode + " to Amount: " + famt);
                    if (finvoice == "Y") {
                        feeSeqList.push(feeSeq);
                        paymentPeriodList.push(fperiod);
                    }
                } else {
                    logDebug("**ERROR: updating amount on fee item (" + fcode + "): " + editResult.getErrorMessage());
                    break
                }
            }
    } else {
        logDebug("**ERROR: getting fee items (" + fcode + "): " + getFeeResult.getErrorMessage())
    }
    
    // Add fee if no fee has been updated OR invoiced fee already exists and duplicates are allowed
    if (!feeUpdated && adjustedAmt != 0 && (!invFeeFound || invFeeFound && pDuplicate == "Y"))
        feeSeq = addFee(fcode, fsched, fperiod, adjustedAmt, finvoice);
    else
        feeSeq = null;
    updateFeeItemInvoiceFlag(feeSeq, finvoice);
    return feeSeq;
}
