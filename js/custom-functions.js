/*jshint sub:true*/
/*jslint plusplus: true */

var calendarData = [];
var gmail = false;
var facebook = false;

function populateTime() {
    "use strict";
	if ($("#choosedate").datepicker("getDate") == null) {
		var now = new Date();
    }
    else {
        var now = $("#choosedate").datepicker("getDate");
    }
	var dayW = now.getDay(), dayS = "";
	if (dayW === 0) {
        dayS = "Sunday";
    } else if (dayW === 1) {
        dayS = "Monday";
    } else if (dayW === 2) {
        dayS = "Tuesday";
    } else if (dayW === 3) {
        dayS = "Wednesday";
    } else if (dayW === 4) {
        dayS = "Thursday";
    } else if (dayW === 5) {
        dayS = "Friday";
    } else if (dayW === 6) {
        dayS = "Saturday";
    } else {
        dayS = "";
    }
	document.getElementById("day").innerHTML = dayS;
}

function toggleCheckBox(id) {
    "use strict";
	console.log("Toggling event tag: #" + id);
	var toggle = document.getElementById(id).checked;
	document.getElementById(id).checked = !toggle;
	buildMap(calendarData);
}

function toggle_mainmapper(data) {
    "use strict";
	populateTime();
	window.scroll(0, 700);
	$("#initial").fadeOut("slow", function () {
		$("#mapper").fadeIn("slow", function () {});
		$("#revokeButtonTag").fadeIn("slow", function () {});
	});
	document.getElementById("map-canvas").style.height = "350px";
	document.getElementById("directions-panel").style.height = "350px";
	document.getElementById("mainmapper").style.minHeight = "450px";
	document.getElementById("travelmode").style.display = "block";
	buildMap(data);
}

function toSeconds(time) {
	var output = 0;
	output += ((parseInt(time.substring(5, 3)) * 60) + (parseInt(time.substring(0,2)) * 3600));
	return(output);
}

function toggle_noevents() {
    "use strict";
	window.scroll(0, 700);
	$("#initial").fadeOut("slow", function() {
		$("#noevents").fadeIn("slow", function () {});
		$("#revokeButtonTag").fadeIn("slow", function() {});
	});
}

function handleData(events) {
    "use strict";
	console.log("Incoming OAuth Token:");
	console.log(events);
	var parsedData = parse_full_JSON_object(events);
	console.log("Parsing data...");
	var rankedData = full_json_event_ranker(parsedData);
	console.log("Assigning orders...");
	var eventDetailsList = dictionary_deparser(rankedData);
	console.log("Done!");
	console.log("Final output:");
	console.log(eventDetailsList);
	updatePageWithCalendarData(eventDetailsList);
}

function updatePageWithCalendarData(data) {
    "use strict";
	for (var i = 0; i < data.length; i++) {
		calendarData[i] = data[i];
	}
	populateTags(calendarData);
	if (calendarData.length > 0) {
		toggle_mainmapper(calendarData);
	} else {
        console.log("No events!");
		toggle_noevents();
	}
}

//var eventnumber = 1;
function populateTags(details) {
	//eventnumber = 1;
    "use strict";
	var c1tag="";
    var c2tag="";
    var c3tag="";
	for (var i = 0; i < details.length; i++) {
		var time = details[i][3], name = details[i][1], check = parseInt(time.substring(0, 2)), tagname = details[i][5];
		if (check < 8) {
			var misc = " AM";
			c1tag = c1tag + "<li style=\"cursor: pointer\" onclick=\"toggleCheckBox(\'" + tagname + "\')\"><input type=\"checkbox\" id=\"" + tagname + "\" style=\"float: left\" checked=\"checked\"><a>" + name + "</a><span id=\"timeStamp\">" + time + misc + "</span></li>";
		} else if ((check >= 8) && (check < 16)) {
			if(check < 12) 
				var misc = " AM";
			else
				var misc = " PM";
			c2tag = c2tag + "<li style=\"cursor: pointer\" onclick=\"toggleCheckBox(\'" + tagname + "\')\"><input type=\"checkbox\" id=\"" + tagname + "\" style=\"float: left\" checked=\"checked\"><a>" + name + "</a><span id=\"timeStamp\">" + time + misc + "</span></li>";
		} else if(check >= 16) {
			var misc = " PM";
			c3tag = c3tag + "<li style=\"cursor: pointer\" onclick=\"toggleCheckBox(\'" + tagname + "\')\"><input type=\"checkbox\" id=\"" + tagname + "\" style=\"float: left\" checked=\"checked\"><a>" + name + "</a><span id=\"timeStamp\">" + time + misc + "</span></li>";
		}
		//eventnumber += 1;
	}
	document.getElementById("c1").innerHTML = c1tag;
	document.getElementById("c2").innerHTML = c2tag;
	document.getElementById("c3").innerHTML = c3tag;
}

