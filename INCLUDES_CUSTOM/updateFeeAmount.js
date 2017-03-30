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