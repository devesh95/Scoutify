/** 
	Ranker: Assign an order value to each event in the list based on StartTime
	Output: Original event list with an 'order' key and pair value.
*/
/*jshint sub:true*/
/*jslint plusplus: true */

// Custom sort_by function
var sort_by = function(field, reverse, primer) {

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = [-1, 1][+!!reverse];

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
}

// Sets a default (but random) date for primer comparison
function primerFunction(string) {
	return new Date("1970/01/01 " + string);
}

function full_json_event_ranker(parsed_event_list) {
    "use strict";
    console.log("Unsorted parsed list below:")
    console.log(parsed_event_list)
	// Use object.sort with an scalable parameter and primer
  parsed_event_list.sort(sort_by("start", true, primerFunction))
	console.log("Sorted parsed list below:")
    console.log(parsed_event_list)
	for (var i = 0; i < parsed_event_list.length; i++) {
        parsed_event_list[i]["order"] = i + 1;
	}
	return parsed_event_list;
}