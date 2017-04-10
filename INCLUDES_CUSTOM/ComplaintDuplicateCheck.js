/**
 * This function is used to check the Duplicate Records in the system.
 * @returns
 * 
 * Formatted By:- Chaitanya Tanna, City of Detroit
 */

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