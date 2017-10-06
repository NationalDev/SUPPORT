// MSA:CodeEnforcement/Inspections/DangerousBuildings/Complaint

showDebug = 3;

logDebug("CalendarID: " + CalendarID);
logDebug("MeetingID: " + MeetingID);

var mtgInfo = aa.meeting.getMeetingByMeetingID(CalendarID, MeetingID).getOutput()
var meetingType = mtgInfo.getMeetingType();
var meetingDate = mtgInfo.getStartDate();
logDebug("Meeting Type: " + meetingType);
logDebug("Meeting Date: " + meetingDate);

