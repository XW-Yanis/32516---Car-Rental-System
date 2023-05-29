<?php
$server_name = 'localhost';
$username = 'uts';
$password = 'internet';
$db_name = 'a2';

$con = mysqli_connect($server_name, $username, $password, $db_name);

if (!$con) {
  die("Could not connect to DB.");
}

// update JSON file & database

$path = dirname(dirname(__FILE__)) . '/json/cars.json';
$path_content = file_get_contents($path);
$cars_in_json = json_decode($path_content, true);

$cars_in_session = $_SESSION['cart'];


foreach ($cars_in_session as $car) {
  $carID = $car['carID'];
  if (isset($cars_in_json[$carID])) {
    $cars_in_json[$carID]['car_availability'] = false;
  }
  $query = "update cars set car_availability = 0 where id = '$carID'";
}

mysqli_close($con);

$updatedJsonData = json_encode(array_values($cars_in_json));
file_put_contents($path, $updatedJsonData);

// Insert booking record into database


?>