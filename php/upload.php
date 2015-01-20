<?php
require 'class.iCalReader.php';
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
       // echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
		$ical = new ICal($target_file);
		$time = time();
		$todaystart = strtotime('today UTC');
		$todayend = strtotime('tomorrow UTC');
		$events = $ical->eventsFromRange($todaystart, $todayend);
		$counter = 0;
		foreach ($events as $event) {
			$ics_events[$counter] = [];
			array_push($ics_events[$counter], $counter + 1);
		    array_push($ics_events[$counter],$event['SUMMARY']);
		    array_push($ics_events[$counter],$event['LOCATION']);
		    //echo "DTSTART: ".$event['DTSTART'].$ical->iCalDateToUnixTimestamp($event['DTSTART'])."<br/>";
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
header("Location: index.html");
?>

<script type="text/javascript">
	var ics_events_js= <?php echo json_encode( $ics_events ) ?>;
	console.log(ics_events_js);
	updatePageWithCalendarData(ics_events_js);
</script>

