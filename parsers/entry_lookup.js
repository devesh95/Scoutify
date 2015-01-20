/** 
	Entry lookup: Returns first main calendar name
*/
/*jshint sub:true*/
/*jslint plusplus: true */
var user_email = "";
function parse_calendar_name(calendarList) {
    "use strict";
	var calendarRequestList = [];
	if (calendarList.kind === "calendar#calendarList") {
        for (var i = 0; i < (calendarList.items.length); i++) {
			if (!((calendarList.items[i].id) === "#contacts@group.v.calendar.google.com" || (calendarList.items[i].id) === "en.usa#holiday@group.v.calendar.google.com")) {
				if((calendarList.items[i].id).indexOf("@gmail.com") > -1) {
					user_email = calendarList.items[i].id;
				}
				calendarRequestList.push(calendarList.items[i].id);
			} else {
				console.log("Contact/holiday calendar popped.");
				break;
			}
		}
		console.log("Calendar IDs: " + calendarRequestList);
	return calendarRequestList;
	}
}