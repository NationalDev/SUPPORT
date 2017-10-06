// MAA:CodeEnforcement/Inspections/DangerousBuildings/Complaint

logDebug("CalendarID: " + CalendarID);
logDebug("MeetingID: " + MeetingID);

var mtgInfo = aa.meeting.getMeetingByMeetingID(CalendarID ,MeetingID );
var meetingDate = mtgInfo.output.getStartDate();
logDebug("The Meeting date is:" + meetingDate);

