/** 
	Generates a 2D Array of events for further processing.
	Tested and functional.
*/
/*jslint plusplus: true */
function dictionary_deparser(sorted_event_dictionary) {
    "use strict";
	var temp_dict_convert = [], maps_compatible_event_list = [];
	for (var i = 0; i < sorted_event_dictionary.length; i++) {
		temp_dict_convert = [sorted_event_dictionary[i]["order"], sorted_event_dictionary[i]["name"], sorted_event_dictionary[i]["location"], sorted_event_dictionary[i]["start"], sorted_event_dictionary[i]["end"], sorted_event_dictionary[i]["id"]];
		maps_compatible_event_list.push(temp_dict_convert);
		temp_dict_convert = [];
	}
	return maps_compatible_event_list;
}