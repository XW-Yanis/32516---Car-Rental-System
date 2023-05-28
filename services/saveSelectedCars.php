<?php
session_start();

$jsonData = file_get_contents('php://input');
$cars = json_decode($jsonData, true);

if ($cars !== null) {
  $path = dirname(dirname(__FILE__)) . '/json/selectedCars.json';
  file_put_contents($path, json_encode($cars));
  echo json_encode($cars);
} else {
  $response = array('message' => 'Error');
  echo json_encode($response);
}
?>