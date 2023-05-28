<?php
session_start();
$car = $_POST['car'];
$rentalDays = 1;

if (!isset($_SESSION['cart'])) {
  $_SESSION['cart'] = array();
}

$carAdded = false;

$cart = json_decode($_SESSION['cart'], true);

foreach ($cart as $item) {
  if ($item['carID'] == $car) {
    $item['rentalDays']++;
    $carAdded = true;
    break;
  }
}

if (!$carAdded) {
  $carInfo = array("carID" => $car, "rentalDays" => $rentalDays);
  array_push($cart, $carInfo);
}

$_SESSION['cart'] = json_encode($cart);

echo json_encode($cart);

?>