<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>Shopping Cart</title>
  <?php include 'header.php'; ?>
  <link rel="stylesheet" href="css/cart.css">
  <script src="js/cart.js"></script>
</head>

<body>
  <div class="cart-box-main">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="table-main table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th class="text-center">Thumbnail</th>
                  <th class="text-center">Vehicle</th>
                  <th class="text-center">Price Per Day</th>
                  <th class="text-center">Rental Days</th>
                  <th class="text-center">Subtotal</th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <!-- This is where the items are going to be injected -->
              <tbody id="insert-position"></tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Empty Cart Btn -->
      <div id="empty-cart-container" class="row my-5">

        <div class="col-lg-6 col-sm-6">
          <div id="empty-cart">
            <input value="Empty Cart" type="submit" onclick="emptyCart()">
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="row my-5">
        <div class="col-lg-8 col-sm-12"></div>
        <div class="col-lg-4 col-sm-12">
          <div class="order-box">
            <h3>Order Summary</h3>
            <hr>
            <div class="d-flex gr-total">
              <h5>Grand Total</h5>
              <div class="ml-auto h5" id="grand-total">$ 0</div>
            </div>
            <hr>
          </div>
        </div>
        <div class="col-12 d-flex shopping-box">
          <a id='checkout' onclick="validateCart()">Checkout</a>
        </div>
      </div>
    </div>
  </div>

  <?php include 'footer.php'; ?>
  <script>
    $(function () {
      render();
    })
  </script>
</body>

</html>