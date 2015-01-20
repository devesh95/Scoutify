function statusChangeCallback(response) {
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
	facebook = true;
	FB.api('/me?scope=email', function(apiResponse) { 
		user_email = apiResponse['email'];
		var first_name = apiResponse['first_name'];
		var last_name = apiResponse['last_name'];
	});
    getEvents();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    console.log('Logged into Facebook but not into the app.');
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    console.log('Not logged into Facebook.');
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
	var theEnv = location.hostname;
  if (theEnv == "calendarmapper.me") {
    envAppId = "523986691076314";
  } else if (theEnv == "scoutify.me") {
    envAppId = "775398365873272";
  } else {
    envAppId = "523989121076071";
  };
  FB.init({
	  appId      : envAppId,
	  cookie     : true,  // enable cookies to allow the server to access 
						  // the session
	  xfbml      : true,  // parse social plugins on this page
	  version    : 'v2.1' // use version 2.1
	});

	FB.getLoginStatus(function(response) {
	statusChangeCallback(response);
	});

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function getUserInfo() {
     FB.api('/me', function(response) {});
 }


// Dynamic quicksort algorithm with bitwise operators
// Same as in the Google API sorting section
var sort_by = function(field, reverse, primer) {

var key = primer ?
  function(x) {return primer(x[field])} :
  function(x) {return x[field]};

reverse = [-1, 1][+!!reverse];

return function (a, b) {
  return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
}

}

function primerFunction(string) {
return new Date(string);
}

function getEvents()
{
  var fb_events = [];
  var event_num = 0;
  console.log('Welcome!  Fetching your information.... ');
  FB.api(
      "/me/events",
      function (response) {
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
        var facebook_object_list = [];
        var facebook_event_object = {};
        console.log("Today's date: " + current_date);
        for (var i = 0; i < response.data.length; i++) {
          var event_start_date = response["data"][i]["start_time"].substring(0, 10);
          if (String(event_start_date) === current_date) {
            if ((response["data"][i]["end_time"] !== undefined)) {
              var facebook_event_object = {};
              // var facebook_event_object = {"summary" : "", "location" : "", "kind" : "", "id" : "", "start" : {"datetime" : ""}, "end" : {"datetime" : ""}};
              facebook_event_object["name"] = response["data"][i]["name"];
              facebook_event_object["location"] = response["data"][i]["location"];
              facebook_event_object["end"] = response["data"][i]["end_time"].substring(11,16);
              facebook_event_object["start"] = response["data"][i]["start_time"].substring(11,16);
              facebook_event_object["id"] = response["data"][i]["id"];
              facebook_object_list.push(facebook_event_object);
            }
          }
        }
        var rankedFacebookData = [];
        var rankedFacebookData = full_json_event_ranker(facebook_object_list);
        console.log("Assigning orders...");
        var eventDetailsListFB = [];
        var eventDetailsListFB = dictionary_deparser(rankedFacebookData);
        console.log("Done!");
        updatePageWithCalendarData(eventDetailsListFB);
        console.log("Final output:");
        console.log(eventDetailsListFB);
      })}
