<?php

$server_name = 'localhost';
$username = 'uts';
$password = 'internet';
$db_name = 'a2';

$jsonData = file_get_contents('php://input');

if ($jsonData === false || !json_decode($jsonData)) {
  echo 'Failed to read jsonData or invalid JSON data';
  exit;
}

$data = json_decode($jsonData, true);

$email = $data['email'];

$con = mysqli_connect($server_name, $username, $password, $db_name);

if (!$con) {
  die("Could not connect to DB.");
}

// check if the user has booked within 3 months
$hasBookedIn90Days = false;

$today = date('Y-m-d');

$query = "select * from renting_history where user_email = '$email'";

$result = mysqli_query($con, $query);

$numsOfBooking = mysqli_num_rows($result);

if ($numsOfBooking != 0) {
  $bookings = mysqli_fetch_all($result);

  foreach ($bookings as $booking) {
    $rentDate = $booking[2];

    $diff = date_diff(date_create($rentDate), date_create($today));
    $daysDifference = $diff->format('%a');

    if ($daysDifference <= 90) {
      $hasBookedIn90Days = true;
      break;
    }
  }
}

echo json_encode(array('booked', $hasBookedIn90Days));
?>