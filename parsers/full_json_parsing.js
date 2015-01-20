/** 
	MAIN JSON TOKEN PARSER 
	Output: Name, StartTime, EndTime, Location
*/
/*jshint sub:true*/
/*jslint plusplus: true */
function parse_full_JSON_object(events) {
    "use strict";
	var parsed_event_dict_list = [];
	if ($("#choosedate").datepicker("getDate") == null) {
		console.log("No custom specified date. Using default.");
		var date_now = new Date();
    }
    else {
        var date_now = $("#choosedate").datepicker("getDate");
		console.log("Using custom date: " + date_now);
    }
	var current_month = date_now.getMonth() + 1;
	if (current_month < 10) {
		current_month = "0" + current_month;
	}
	var current_day = date_now.getDate();
	if (current_day < 10) {
		current_day = "0" + current_day;
	}
	var current_year = date_now.getFullYear();
	var current_date = current_year + "-" + current_month + "-" + current_day;
	console.log("Today's date: " + current_date);
	for (var i = 0; i < events.items.length; i++) {
		if (events["items"][i]["kind"] === "calendar#event") {
			var event_number = i + 1;
			var event_start_date = events["items"][i]["start"]["dateTime"].substring(0, 10);
			if (event_start_date === current_date) {
				console.log("Event #" + event_number + " in this calendar is today. Extracting event data...");
				var event_name = events["items"][i]["summary"];
				var event_location = events["items"][i]["location"];
				var start_time = events["items"][i]["start"]["dateTime"].substring(11, 16);
				var end_time = events["items"][i]["end"]["dateTime"].substring(11, 16);
				var event_id = events["items"][i]["id"];
				var event_details = {};
				event_details["name"] = event_name;
				event_details["start"] = start_time;
				event_details["end"] = end_time;
				event_details["location"] = event_location;
				event_details["id"] = event_id;
				parsed_event_dict_list.push(event_details);
			}
		}
	}
	console.log(parsed_event_dict_list);
	return parsed_event_dict_list;
}