
<?php
	require 'class.iCalReader.php';
	$success_message = "";
	if ($_SERVER["REQUEST_METHOD"] == "POST"){
				//echo "test";
		$target_dir = "uploads/";
		$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
		$uploadOk = 1;
		$FileType = pathinfo($target_file,PATHINFO_EXTENSION);
		$startTimeString = "startTime";
		$endTimeString = "endTime";
		$ics_events = [];
		/* Check file size
		if ($_FILES["fileToUpload"]["size"] > 500000) {
		    echo "Sorry, your file is too large.";
		    $uploadOk = 0;
		}*/
		// Allow certain file formats
		if($FileType != 'ics') {
		    echo "Sorry, only ics files are allowed.";
		    $uploadOk = 0;
		}
		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
		    echo "Sorry, your file was not uploaded.";
		// if everything is ok, try to upload file
		} 
		else {
		    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
		        $success_message = "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded successfully.";
				$ical = new ICal($target_file);
				$time = time();
				$date = new DateTime(null);
				$todaystart = strtotime('today midnight');
				$todayend = strtotime('tomorrow midnight');
				$events = $ical->eventsFromRange($todaystart, $todayend);
				$counter = 0;
				foreach ($events as $event) {
					$ics_events[$counter] = [];
					array_push($ics_events[$counter], $counter + 1);
				    array_push($ics_events[$counter],$event['SUMMARY']);
				    array_push($ics_events[$counter],$event['LOCATION']);
				    $startTime = $ical->iCalDateToUnixTimestamp($event['DTSTART']);
				    $startTimeString = date('H:i', $startTime);
				    array_push($ics_events[$counter],$startTimeString);
				    $endTime =  $ical->iCalDateToUnixTimestamp($event['DTEND']);
				    $endTimeString = date('H:i', $endTime);
				    array_push($ics_events[$counter],$endTimeString);
				    $counter ++;
				}
		    } else {
		        echo "Sorry, there was an error uploading your file.";
		    }
		}
	}
?>
<html>
	<head>
		<title>Calendar Mapper</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'/>
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<!--[if lte IE 8]><script src="css/ie/html5shiv.js"></script><![endif]-->
		<script src="js/jquery.min.js"></script>
		<script src="js/jquery.cookie.js"></script>
		<script src="js/skel.min.js"></script>
		<script src="js/init.js"></script>
    	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
		<noscript>
			<link rel="stylesheet" href="css/skel.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-wide.css" />
		</noscript>
		<script src="js/map.js" type="text/javascript"></script>
		
		<!--[if lte IE 8]><link rel="stylesheet" href="css/ie/v8.css" /><![endif]-->
	</head>
	<body>

		<!-- Header -->
			<div id="header">
				<h1 id="appTitle">Hello World!<br /> This is Calendar Mapper</h1>
				<br />
				<h2 id = upload_indicator> 
					<?php echo $success_message;?>
				</h2>
				<p>A quick and innovative solution for all your day to day planning issues. <br />We take your Google Calendar and visually display on a map <br /> when and where you need to be throughout your day.</p>
			</div>

		<!-- Main -->
			<div id="main">
				<div id="initial">
				<header class="major container small">
					<h2>Calendar Mapper is the solution
					<br />
					to all of your calendar problems 
					<br />
					- and it looks amazing.</h2>
				</header>

				<div class="box alt container">
					<section class="feature left">
						<a href="#" class="image icon fa-signal"><img src="images/google.png" alt="" /></a>
						<div class="content">
							<h3>The First Step</h3>
							<p>Sign in to your Google account! Setting up a Google account is free, quick and highly recommended. Don't worry, we don't store any of your account information: it's all directed through Google's authentication protocols.</p>
						</div>
					</section>
					<section class="feature right">
						<a href="#" class="image icon fa-code"><img src="images/calendar.png" alt="" /></a>
						<div class="content">
							<h3>The Second Thing</h3>
							<p>Don't worry about the rest. We've got it covered. We'll get your Google Calendar, intelligently pull out your events (yes, without reading or storing them) and then show exactly where you need to be, want to go or planned to exist. <br />This is the magic of code. </p>
						</div>
					</section>
					<section class="feature left">
						<a href="#" class="image icon fa-mobile"><img src="images/mobile.png" alt="" /></a>
						<div class="content">
							<h3>...And that's it!</h3>
							<p>Get started using our service immediately - it just works! Don't worry about which device you're using to log in with - we can handle it all. Here's to an easier life.</p>
						</div>
					</section>
				</div>

				<footer class="major container small">
					<h3>Start using Calendar Mapper!</h3>
					<p>Sign in with your Google account</p>
					<p onclick="toggle_visibility();"></p>
					<span id="signinButton">
					  <span
						class="g-signin"
						data-callback="signinCallback"
						data-clientid="84849743151-9hcdgmrt421ffiarpn9v77jcrcnp4kn9.apps.googleusercontent.com"
						data-cookiepolicy="single_host_origin"
						data-requestvisibleactions="http://schema.org/AddAction"
						data-scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/calendar">
					  </span>
					</span>
					<div id="uploadTag" style="margin-top: 30px">
						<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" enctype="multipart/form-data">
							<p align ="center"> Choose a calendar file (*.ics) to upload: </p>
							<p align ="center"><input type="file" name="fileToUpload" id="fileToUpload"></p>
							<p align ="center"><input type="submit" value="Upload calendar" name="submit"></p>
						</form>
					</div>
				</footer>
				</div>
				<div id="noevents">
					<h1 id="">No events!</h1>
				</div>
				<div id="mapper">
					<div id="mapper-section-head">
						<h1 id="mapper-section-head-title"><span id="day"></span></h1>
					</div>
					<div class="main-con">
						<div class="slider">
							<div class="color"> <span class="trans"> </span></div>
						</div>
						<!--end slider-->
						<!--start home-page-con-->			  					     
						<div class="home-page-con">
							<div class="wrap">
								<div class="top-grids">
									<div class="top-grid">
										<div class="top-grid-info">
											<h2> 12 AM - 8AM</h2>
											<div class="clear"> </div>
										</div>
										<ul id="today">
											<div id="c1">
												<!-- Empty by default -->
											</div>
										</ul>
									</div>
									<div class="top-grid">
										<div class="top-grid-info">
											<h2> 8 AM - 4PM</h2>
											<div class="clear"> </div>
										</div>
										<ul id="today">
											<div id="c2">
												<!-- Empty by default -->
											</div>
						  				</ul>
									</div>
									<div class="top-grid">
										<div class="top-grid-info">
											<h2> 4 PM - 12PM</h2>
											<div class="clear"> </div>
										</div>
										<ul id="today">
											<div id="c3">
											<!-- Empty by default -->
											</div>
  										</ul>
									</div>
									<div class="clear"> </div>
								</div>
								<div class="heading">
									<h2 id="maptitle">Upcoming calendar events |</h2>
									<a id="optimize" onclick="toggleOptimize()">Optimize Route</a>
									<div class="clear"> </div>
								</div>		
								<!--end home-page-con-->
							</div>
						</div>
						<!--End-gallery-->
					</div>
				</div>
				<div id="mainmapper">
					<div id="directions-panel">
						<!-- my cool panel goes here -->
					</div>
					<div id="map-canvas">
						<!-- map goes here? -->
					</div>
				</div>
				<div id="revokeButtonTag" style="margin-top: 30px">
						<a href="index.html" id="revokeButton" class="revokeButton">Sign in with another account</a>
				</div>
				<div id="loading" class="modal"></div>
			</div>

		<!-- Footer -->
			<div id="footer">
				<div class="container small">
					<ul id="copyright" class="copyright">
						<li>&copy; 2015 Calendar Mapper. &nbsp; All rights reserved.</li><br><li>Developers: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/devesh95">Devesh Dayal</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/jacobkahn">Jacob Kahn</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/yutingyue514">Summer Yue</a></li>
					</ul>
				</div>
			</div>

<!--

One ring to rule them all.

-->
	<script src="js/custom-functions.js" type="text/javascript"></script>
	<script type="text/javascript">
				var ready = "<?php echo $uploadOk?>";
				if (ready == 1) {
			    	window.onload = function() {
					var ics_events_js= <?php echo json_encode( $ics_events ) ?>;
					console.log(ics_events_js);
					updatePageWithCalendarData(ics_events_js);
					}
				}
	</script>
	
	<!-- Essential OAuth initialization script -->
	<script type="text/javascript">
	  (function() {
	   var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	   po.src = 'https://apis.google.com/js/client:plusone.js';
	   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	 })();
	</script>
		
	<!-- Parser: function; extract calendar name -->
	<script src="parsers/entry_lookup.js" type="text/javascript"></script>
		
	<!-- Parser: function; extracting times and locations -->
	<script src="parsers/full_json_parsing.js" type="text/javascript"></script>
		
	<!-- Parser: function; ranking events -->
	<script src="parsers/full_json_ranker.js" type="text/javascript"></script>
		
	<!-- Parser: function; compiling and exporting -->
	<script src="parsers/dictionary_deparser.js" type="text/javascript"></script>
		
	<!-- CUSTOM DOCUMENT FUNCTIONS - DO NOT EDIT/CHANGE/LOOK AT -->
	<script src="js/custom-functions.js" type="text/javascript"></script>
		
	<!-- OAuth: Token authentication and data delivery -->
	<script type="text/javascript" language="JavaScript">
		function signinCallback(authResult) {
			if (authResult['status']['signed_in']) {
				console.log('User signed in...processing data.');
			    gapi.auth.getToken();
				var calendarName = gapi.client.request({path:"calendar/v3/users/me/calendarList", method: "GET", callback: function (calendarList) {    
					// Even smarter HTTP GET request!
					var parsed_calendar_list = parse_calendar_name(calendarList);
					var cumulative_event_list = [];
					var batchRequest = gapi.client.newBatch();
					for (var i = 0; i < parsed_calendar_list.length; i++) {
						var calRequest = gapi.client.request({
						  'path': 'calendar/v3/calendars/' +parsed_calendar_list[i] + '/events',
						  'params': {'maxResults': '2500'}
						});
						batchRequest.add(calRequest);
					}
					batchRequest.then(function (result) {
						var calendar_hashlist = Object.keys(result["result"]);
						var aggregate_event_list = [];
						for (var i = 0; i < calendar_hashlist.length; i++) {
							var temp_hash = calendar_hashlist[i];
							var temp_event_list = result["result"][temp_hash]["result"]["items"];
							aggregate_event_list = aggregate_event_list.concat(temp_event_list);
						}
						// Repackage for old parsers
						var aggregate_event_hash = {};
						aggregate_event_hash["items"] = aggregate_event_list;
						handleData(aggregate_event_hash);
					})
					}
				})
				} else {
					console.log("Uh oh, something's wrong... " + authResult['error']);
				}
		}
	</script>	
		
	<!-- OAuth: Disconnect user and revoke token -->
	<script src="js/revoke.js" type="text/javascript"></script>
	<script src="js/flip.min.js" type="text/javascript"></script>
	</body>
</html>