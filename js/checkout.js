var hasBookedIn90 = false;
var bondAdded = false;
// render the cart
function render() {
  changeNavbar();
  let insertPosition = document.getElementById('insert-position');
  let grandTotal = document.getElementById('grand-total');
  let emailField = document.getElementById('email');
  emailField.addEventListener('blur', checkBookingHistory);

  let total = 0;
  $.getJSON("json/selectedCars.json", function (data) {
    data.forEach(car => {
      const html = `<div class="rounded p-2 bg-light">
                <div class="media mb-2">
                  <div class="media-body"> <a href="#">${car.brand + ' ' + car.model + ' ' + car.model_year}</a>
                    <div class="small text-muted">Daily Price: $ ${car.daily_price} <span class="mx-2">|</span> Rental Days:
                      ${car.rental_days} 
                      <span class="mx-2">|</span> Subtotal: $ ${car.daily_price * car.rental_days}</div>
                  </div>
                </div>
              </div>`;
      insertPosition.insertAdjacentHTML("afterend", html);
      total += car.daily_price * car.rental_days;
    });
    grandTotal.innerHTML = '$ ' + total;
  });
}

// set the behaviour of the conitnue selection btn 
function backToHome() {
  window.location.href = 'index.php';
}

// set the behaviour of the booking btn
function bookingBtnOnClick(event) {
  event.preventDefault();
  if (validateForm() && validateEmail()) {
    document.querySelector('.needs-validation').submit();
  }
}
// change the active state of the navigation bar
function changeNavbar() {
  let links = document.querySelectorAll('.container.d-flex.justify-content-evenly > a');
  let path = window.location.pathname.slice(4);
  links.forEach(function (link) {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
}

// Validate the form. False will be returned if there is any empty fields (or field with default value like email)
function validateForm() {
  let elements = document.querySelectorAll(".needs-validation input");
  let valid = true;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].value.trim() === "" || elements[i].value === elements[i].getAttribute("palceholder")) {
      elements[i].classList.add("is-invalid");
      valid = false;
    } else {
      elements[i].classList.remove("is-invalid");
    }
  }
  return valid;
}

// Check if email is valid
// The email should contain one or more letters, numbers, dots, dashes, underscores, percent, plus and minus,
// followed by a @, and then one or more small characters, numbers, dot and minus, followed by a dot,
// and then 2 or more small characters.
function validateEmail() {
  let email = document.getElementById('email');
  let emailValue = email.value.trim();
  let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  if (pattern.test(emailValue)) {
    email.classList.remove("is-invalid");
    return true;
  } else {
    email.classList.add("is-invalid");
    return false;
  }
}

// check if current email relates to any booking records in the last 90 days
function checkBookingHistory() {
  let email = this.value;

  fetch('services/checkBookingHistory.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
    .then(response => response.json())
    .then(data => {
      hasBookedIn90 = data[1];
      if (!hasBookedIn90) {
        alert('Dear Customer, \n\n$ 200 will be added to your order as bond' +
          ' since you have not booked any cars in the past 90 days.');
        if (!bondAdded) {
          let insertPosition = document.getElementById('insert-position');
          let html = `<div class="rounded p-2 bg-light">
          <div class="media mb-2">
          <div class="media-body"> <a href="#">Bond</a>
          <div class="small text-muted">Subtotal: $ 200</div>
          </div>
          </div>
          </div>`;
          let grandTotal = document.getElementById('grand-total');
          insertPosition.insertAdjacentHTML("afterend", html);
          grandTotal.innerHTML = '$ ' + (parseInt(grandTotal.textContent.slice(2)) + 200);
          bondAdded = true;
        }
      }
      document.querySelector('input[name="hasBookedIn90"]').value = hasBookedIn90;
    })
    .catch(error => {
      console.error('An error occurred while checking booking history:', error);
    });
}
