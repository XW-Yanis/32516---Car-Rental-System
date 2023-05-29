<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>Hertz-UTS</title>
  <?php include 'header.php' ?>
  <link rel="stylesheet" href="css/confirmPage.css">
  <script src="js/confirmPage.js"></script>
</head>

<body>
  <h1>Car is reserved. <br><br>Enjoy driving!</h1>
  <?php include 'footer.php' ?>
</body>


</html>

<?php
session_start();
$server_name = 'localhost';
$username = 'uts';
$password = 'internet';
$db_name = 'a2';

$con = mysqli_connect($server_name, $username, $password, $db_name);

if (!$con) {
  die("Could not connect to DB.");
}

// update JSON file & database

$path = dirname(__FILE__) . '/json/cars.json';
$path_content = file_get_contents($path);
$cars_in_json = json_decode($path_content, true);

$cars_in_session = json_decode($_SESSION['cart'], true);

foreach ($cars_in_session as $car) {
  $carID = $car['carID'];
  foreach ($cars_in_json as &$c) {
    if ($c['id'] == $carID) {
      $c['car_availability'] = 0;
      break;
    }
  }
  $query = "update cars set car_availability = 0 where id = '$carID'";
  mysqli_query($con, $query);
}


$updatedJsonData = json_encode(array_values($cars_in_json));
file_put_contents($path, $updatedJsonData);

// Insert booking record into database
/* 
array(8) {
  ["hasBookedIn90"]=>
  string(5) "false"
  ["firstname"]=>
  string(5) "Xiang"
  ["lastname"]=>
  string(4) "Weng"
  ["address"]=>
  string(58) "75 Albion Street, 莎莉山 新南威尔士州澳大利亚"
  ["email"]=>
  string(29) "Xiang.Weng@student.uts.edu.au"
  ["city"]=>
  string(11) "Surry Hills"
  ["state"]=>
  string(3) "NSW"
  ["postcode"]=>
  string(4) "2010"
}
*/
$email = $_POST['email'];
$bond = ($_POST['hasBookedIn90']) ? 0 : 200;
$date = date('Y-m-d');

$query = "insert into renting_history (user_email, rent_date, bond_amount) values ('$email', '$date', '$bond')";
mysqli_query($con, $query);

mysqli_close($con);

unset($_SESSION['cart']);
?>

<script>
  $(function () {
    init();
  })
</script>