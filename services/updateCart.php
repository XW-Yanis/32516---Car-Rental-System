<?php
session_start();

$jsonData = file_get_contents('php://input');

if ($jsonData === false) {
  echo 'Failed to read jsonData';
  exit;
}

$cart = json_decode($jsonData, true);

$_SESSION['cart'] = $cart;

echo json_encode($_SESSION['cart']);
?>