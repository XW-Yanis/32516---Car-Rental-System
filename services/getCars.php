<?php

$server_name = 'localhost';
$username = 'uts';
$password = 'internet';
$db_name = 'a2';

$con = mysqli_connect($server_name, $username, $password, $db_name);


if (!$con) {
  die("Could not connect to DB.");
}

$query = "select * from cars";

$result = mysqli_query($con, $query);

$cars = mysqli_fetch_all($result, MYSQLI_ASSOC);

mysqli_close($con);

$path = dirname(dirname(__FILE__)) . '/json/cars.json';

file_put_contents($path, json_encode($cars));

echo json_encode($cars);
?>