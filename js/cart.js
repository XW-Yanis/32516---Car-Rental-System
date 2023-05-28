var isEmptyCart = true;

// save selected cars into seletedCars.json, so that the info can be rendered in checkout page easily
function saveSelectedCar() {
  let carsInSessionStorage = getCars();
  let cars = [];
  getJSONCars(function (carsInJSON) {
    carsInSessionStorage.forEach(car => {
      if (car.rentalDays == 0) return;
      let carID = car.carID;
      let targetCar = carsInJSON[carID];
      targetCar.rental_days = car.rentalDays;
      cars.push(targetCar);
    })
    fetch(`services/saveSelectedCars.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cars)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('An error occurred while saving selected cars:', error);
      });
  });
}

// Retreiev cars in sessionStorage as a JSON object
function getCars() {
  const cart = sessionStorage.getItem('cart');
  if (cart === null) {
    return [];
  }
  return JSON.parse(cart);
}

// Load the cars in json file, and pass it to callback function
function getJSONCars(callback) {
  let carsObj = {};
  $.getJSON("json/cars.json", function (data) {
    data.forEach(function (car) {
      carsObj[car.id] = car;
    });
    callback(carsObj);
  });
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

// display the cars
function render() {
  changeNavbar();

  let cars = getCars();
  if (cars.length > 0) {
    isEmptyCart = false;
  }

  let insertPosition = document.getElementById('insert-position');

  if (cars === null) {
    return;
  }

  getJSONCars(function (jsonCars) {
    cars.forEach(function (c) {
      let ID = c.carID;
      let targetCar = jsonCars[ID];
      let html =
        `<tr id="${targetCar.id}">
          <td class="thumbnail-img text-center">
            <img class="img-fluid" src="${targetCar.img_src}" alt="${targetCar.brand + targetCar.model}" />
          </td>
          <td class="name-pr text-center">
            ${targetCar.brand + ' ' + targetCar.model + ' ' + targetCar.model_year} 
          </td>
          <td class="price-pr text-center">
            <p>$ ${targetCar.daily_price}</p>
          </td>
          <td class="quantity-box  text-center"><input class="quantity" value="${c.rentalDays}" type="number" size="4" min="1" max="20" step="1"
            class="c-input-text qty text"></td>
          <td class="total-pr text-center">
            <p>$ ${targetCar.daily_price * c.rentalDays}</p>
          </td>
          <td class="remove-pr text-center">
            <a href="#">
              <i class="fas fa-times"></i>
            </a>
          </td>
        </tr>`;
      insertPosition.insertAdjacentHTML('afterbegin', html);
    });
    setListener();
    getTotal();
  });
}

// set listeners for days' input and remove buttons
function setListener() {
  let daysInputs = document.querySelectorAll('input');
  daysInputs.forEach(daysInput => {
    daysInput.addEventListener('input', handleDaysChange);
  });

  let removeBtns = document.querySelectorAll('.remove-pr a');
  removeBtns.forEach(removeBtn => {
    removeBtn.addEventListener('click', removeFromCart);
  });
}

// Handle the change of days
function handleDaysChange() {
  let days = this.value;

  let dailyPrice = this.closest('tr').querySelector('.price-pr p').textContent.slice(2);
  let subTotal = this.closest('tr').querySelector('.total-pr p');
  subTotal.textContent = '$ ' + days * dailyPrice;

  if (parseInt(days) === 0) {
    alert("This car will not be reserved because the rental day is 0.");
  }

  let carID = this.closest('tr').id;

  let cars = JSON.parse(sessionStorage.getItem('cart'));

  if (cars) {
    let carsObj = cars.reduce((acc, item) => {
      acc[item.carID] = item;
      return acc;
    }, {});
    if (carsObj[carID]) {
      carsObj[carID].rentalDays = parseInt(days);
    }

    cars = Object.values(carsObj);
  }
  sessionStorage.setItem('cart', JSON.stringify(cars));
  getTotal();
  syncToSession();
}

// calculate grand total
function getTotal() {
  let grandTotal = document.getElementById('grand-total');
  let totalHolders = document.querySelectorAll('.total-pr p');
  let total = 0;

  if (totalHolders.length > 0) {
    totalHolders.forEach(holder => {
      total += parseInt(holder.textContent.slice(2));
    });
  }
  grandTotal.innerHTML = '$ ' + total;
}

// Remove the car from the cart
function removeFromCart(event) {
  event.preventDefault();
  let carID = event.target.closest('tr').id;
  let cars = getCars();
  if (cars) {
    cars = cars.filter(car => car.carID !== carID);
    sessionStorage.setItem('cart', JSON.stringify(cars));
  }
  event.target.closest('tr').remove();
  getTotal();
  syncToSession();
}

// Empty the cart
function emptyCart() {
  let rows = document.querySelectorAll('tbody tr');
  let cart = [];
  sessionStorage.setItem('cart', JSON.stringify(cart));
  rows.forEach(row => {
    row.remove();
  });
  getTotal();
  syncToSession();
}

// update the changes to the session
function syncToSession() {
  let cart = getCars();
  fetch(`services/updateCart.php`, {
    method: "POST",
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify(cart)
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error occurred while synchronizing cart:', error);
    });
}

// validate cart
function validateCart() {
  let valid = true;

  if (isEmptyCart === true) {
    alert("No car has been reserved.");
    window.location.href = "index.php";
    return;
  }

  let inputs = document.querySelectorAll(".quantity");
  for (let i = 0; i < inputs.length; i++) {
    let value = inputs[i].value;
    if (!isInt(value) || value < 0) {
      alert("Invalid value");
      valid = false;
      break;
    }
  }

  if (valid) {
    saveSelectedCar();
    window.location.href = "checkout.php";
  }
}

// check if num is an integer
function isInt(num) {
  return /^-?\d+$/.test(num);
}
