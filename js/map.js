/*jshint sub:true*/
/*jslint plusplus: true */

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map, geocoder;
var list_of_markers = [];
var directionsDisplay;
var optimize = false;

function placeMarker(singleEvent, callback) {
    "use strict";
    var my_address = singleEvent[2];
    var my_rank = String.fromCharCode(singleEvent[0] + 64);
    if (my_rank !== undefined) {
        geocoder.geocode({ 'address': my_address },
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + my_rank + '|00CC00|000000'
                    });
                    var infowindow = new google.maps.InfoWindow({ maxWidth: 320 })
					var info = singleEvent[1];
                    info += '<strong> from ' + singleEvent[3] + ' to ' + singleEvent[4] + '</strong>';
                    info += ' at ' + singleEvent[2];
                    if (!infowindow) {
                        infowindow = new google.maps.InfoWindow({content: info});
                    } else {
                        infowindow.setContent(info);
                    }
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });
                    callback(marker);
                } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    console.log("OVER QUERY LIMIT - you clicked too fast.");
                    window.location.reload();
                } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                    var event_id = singleEvent[5];
                    confirm("Your event: \""+singleEvent[1]+ "\" has a location that isn't accurate enough. Please fill in a complete address.\nCurrent location: \""+my_address+"\""+"\n\nMake sure you refresh the page once you've edited your event! \U+2603");
					toggleCheckBox(event_id);
					buildMap(calendarData);
				}
				else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            }
        );
    }
}

function makeInfoWindowEvent(map, infowindow, marker) {
    "use strict";
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

function toggleOptimize() {
    "use strict";
    optimize = !optimize;
    if (optimize) {
        document.getElementById("optimize").innerHTML = "Stick to schedule";
    } else {
        document.getElementById("optimize").innerHTML = "Optimize Route";
    }
    buildMap(calendarData);
}

function calcRoute(inputmarkers, events) {
    "use strict";
	var selectedMode = document.getElementById('mode').value;
    console.log("Calculating " + inputmarkers.length + " routes...");
    var wpts = [];
    for (var i = 1; i < inputmarkers.length - 1; i++) {
        wpts.push({location: inputmarkers[i].getPosition(), stopover: true});
    }
    var start = inputmarkers[0].getPosition(), end = inputmarkers[inputmarkers.length - 1].getPosition();
    var request = {
        origin: start,
        destination: end,
        waypoints: wpts,
        optimizeWaypoints: optimize,
        travelMode: google.maps.TravelMode[selectedMode]
    };
    directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
			var tripLegs = response.routes[0].legs;
			document.getElementById("warnings").style.display = "none";
			var dynamictag = "";
			for(var i=0; i < tripLegs.length; i++) {
				if(events.length >= 2) {
					var legDuration = tripLegs[i].duration.value;
					var timeBetweenEvents = (toSeconds(events[i+1][3]) - toSeconds(events[i][4]));
					if(legDuration > timeBetweenEvents) {
						document.getElementById("warnings").style.display = "block";
						dynamictag += "<h3><strong id=\"alert\">WARNING: </strong> Based on current traffic data, your event \""+events[i][1]+"\" can't be reached in time after \""+events[i+1][1]+"\" -- Traffic data by Google</h3>"
						document.getElementById("warnings").innerHTML = dynamictag;
					}
				}
			}			
            console.log("Directions engine OK!");
            addDirections(parseHTML(response));
            console.log("---------------------");
            directionsDisplay.setDirections(response);
            document.getElementById("loading").style.display = "none";
        } else {
            console.log("Directions engine ERROR: " + status);
        }
    });
}

function createMarkerList(m, events) {
    "use strict";
    list_of_markers.push(m);
    if (list_of_markers[events.length - 1] !== undefined) {
        console.log('Async load complete.');
		hereComeTheMarkers(list_of_markers, map.getZoom());
        calcRoute(list_of_markers, events);
    }
}

function buildMap(input) 
{
	if(input == undefined || directionsDisplay == undefined) {
		setTimeout(function () {}, 100);
	}
	if(list_of_markers.length > 0) {
		for(i=0; i<list_of_markers.length;i++){
			list_of_markers[i].setMap(null);
		}
		list_of_markers = new Array();
	}
	document.getElementById("email").setAttribute("value","Send Email");
	document.getElementById("email").setAttribute("onclick","sendTheMail()");
	if(directionsDisplay != undefined) {
		directionsDisplay.setMap(null);
		directionsDisplay.setPanel(null);
		directionsDisplay = null;
	}
	console.log("Building map...");
	var list_of_list = new Array();
	for(i=0; i<input.length; i++){
		if(document.getElementById(input[i][5]).checked) {
			list_of_list.push(input[i]);	
		}
	}
	var marker_list = [];
	directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	var mapOptions = 
	{
		zoom: 2,
		center: new google.maps.LatLng(39.952338, -75.193139)
	}
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	google.maps.event.trigger(map, 'resize');
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('directions-panel'));
	geocoder = new google.maps.Geocoder();
	console.log("Geocoder powering up...");
	document.getElementById("loading").style.display = "block";
	var i = 0;
	console.log(list_of_list);
	interval = setInterval(function() {
		placeMarker(list_of_list[i], function(marker) {
			createMarkerList(marker, list_of_list);
		});
		i++;
		if(i > list_of_list.length - 1) {clearInterval(interval)}
	}, 100);
	
	/**
	TODO: Traffic layer - create a tab for viewing additional data?
	var trafficLayer = new google.maps.TrafficLayer();
  	trafficLayer.setMap(map);
	*/
}