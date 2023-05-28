<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>Check Out</title>
  <?php include 'header.php'; ?>
  <link rel="stylesheet" href="css/checkout.css">
  <script src="js/checkout.js"></script>
</head>

<body>


  <div class="cart-box-main">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-lg-6 mb-3">
          <div class="checkout-address">
            <div class="title-left">
              <h3>Billing Address</h3>
            </div>

            <form class="needs-validation" novalidate action="index.php"
              onsubmit="return validateForm() && validateEmail()" method="post">
              <textarea id="items-detail-text" name="items-detail" style="display:none"></textarea>
              <textarea id="grand-total-text" name="grand-total" style="display:none"></textarea>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName">First name *</label>
                  <input type="text" class="form-control" id="firstName" name="firstname" placeholder="" value=""
                    required>
                  <div class="invalid-feedback"> Valid first name is required. </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName">Last name *</label>
                  <input type="text" class="form-control" id="lastName" name="lastname" placeholder="" value=""
                    required>
                  <div class="invalid-feedback"> Valid last name is required. </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="address">Address *</label>
                <input type="text" class="form-control" name="address" id="address" placeholder="" required>
                <div class="invalid-feedback"> Please enter your shipping address. </div>
              </div>
              <div class="mb-3">
                <label for="email">Email Address *</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="example@emailhost.com"
                  required>
                <div class="invalid-feedback"> Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="city">City *</label>
                  <input type="text" class="form-control" name="city" id="city" placeholder="" required>
                  <div class="invalid-feedback"> Please enter a valid country. </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="state">State *</label>
                  <input type="text" class="form-control" name="state" id="state" placeholder="" required>
                  <div class="invalid-feedback"> Please enter a valid state. </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="postcode">Post Code *</label>
                  <input type="text" class="form-control" name="postcode" id="postcode" placeholder="" required>
                  <div class="invalid-feedback"> Please enter a valid postcode. </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="payment">Payment Type *</label>
                  <select id="payment" class="wide w-100">
                    <option value="visa">Visa</option>
                    <option value="visa">MasterCard</option>
                  </select>
                </div>
              </div>
          </div>
          </form>
        </div>
        <div class="col-sm-6 col-lg-6 mb-3">
          <div class="col-md-12 col-lg-12">
            <div class="odr-box">
              <div id="insert-position" class="title-left">
                <h3>Cart</h3>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-12">
            <div class="order-box">
              <div class="title-left">
                <h3>Your Booking</h3>
              </div>
              <div class="d-flex gr-total">
                <h5>Grand Total</h5>
                <div id="grand-total" class="ml-auto h5"></div>
              </div>
              <hr>
            </div>
          </div>
          <div class="col-12 d-flex shopping-box">
            <a id="backToHome" class="ml-auto btn hvr-hover" onclick="backToHome()">Continue Selection</a>
            <a id="checkoutBtn" class="ml-auto btn hvr-hover" type="submit"
              onclick='bookingBtnOnClick(event)'>Booking</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <?php include 'footer.php'; ?>
</body>
<script>
  $(function () {
    render();
  })
</script>

</html>