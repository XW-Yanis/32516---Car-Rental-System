<?php
session_start();

$car = $_POST['car'];
$rentalDays = 1;

if (!isset($_SESSION['cart'])) {
  $_SESSION['cart'] = array();
}

$carAdded = false;

$cart = $_SESSION['cart'];

if (!empty($cart)) {
  if (gettype($cart) != 'array') {
    $cart = json_decode($cart, true);
  }

  foreach ($cart as &$item) {
    if ($item['carID'] == $car) {
      $item['rentalDays']++;
      $carAdded = true;
      break;
    }
  }
}

if (!$carAdded) {
  $carInfo = array("carID" => $car, "rentalDays" => $rentalDays);
  array_push($cart, $carInfo);
}

$_SESSION['cart'] = json_encode($cart);

echo $_SESSION['cart'];

?>