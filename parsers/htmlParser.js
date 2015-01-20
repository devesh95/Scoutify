
// Parses route objects into email-compadible HTML strings
function parseHTML(input) {
	var starting_string = "<ul class=\'directions\' style=\'font-family: Futura; font-size: 0.5em; line-height: 15px; color: #178ddc\'><li class=\'routes\'>"
	var ending_string = "</li></ul>"
	var init_key = Object.keys(input);
	var legs_list = input.routes[0].legs;
	var output = "";
	for (var i = 0; i < legs_list.length; i++) {
		var start_address = legs_list[i].start_address;
		var leg_duration = legs_list[i].duration["text"];
		var temp_steps = legs_list[i]["steps"];
		output += "<h1 class=\'legs\'>" + start_address + "<span class=\'duration\' style=\'float: right; margin-right: 5%; color: #999\'>" + leg_duration + "</span></h1><ul style=\'font-size: 0.9em; color: #999\'>";
		for (var j = 0; j < temp_steps.length; j++) {
			// var step_duration = temp_steps[j]["duration"]["text"];
			var step_instructions = temp_steps[j]["instructions"];
			output += "<li class=\'steps\'><h2>"+ step_instructions +"</h2></li>";
		}
		output += "</ul>";
	}
	return (starting_string + output + ending_string);
}