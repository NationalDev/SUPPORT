// MSA:CodeEnforcement/Inspections/DangerousBuildings/Complaint

showDebug = 3;

logDebug("CalendarID: " + CalendarID);
logDebug("MeetingID: " + MeetingID);

var mtgInfo = aa.meeting.getMeetingByMeetingID(CalendarID ,MeetingID );
var meetingDate = mtgInfo.output.getStartDate();
logDebug("The Meeting date is:" + meetingDate);

