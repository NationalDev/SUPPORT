// MSA:CODEENFORCEMENT/*/*/*

// showDebug = true;

logDebug("In event script MSA:CODEENFORCEMENT/*/*/*");
logDebug("CalendarID: " + CalendarID);
logDebug("MeetingID: " + MeetingID);

var mtgInfo = aa.meeting.getMeetingByMeetingID(CalendarID, MeetingID).getOutput()
var meetingType = mtgInfo.getMeetingType();
var meetingDate = mtgInfo.getStartDate();
var meetingTime = mtgInfo.getStartTime();
var meetingLocation = mtgInfo.getMeetingLocation();

logDebug("Meeting Type: " + meetingType);
logDebug("Meeting Date: " + meetingDate);
logDebug("Meeting Time: " + meetingTime);
logDebug("Meeting location: " + meetingLocation);

