
// Retrieve data from DB by calling getCars.php, which will save the data to cars.json.
// The php script will echo the data as well, so that the success callback can be executed.
// But the render function will generate content based on the cars.json file.
function getCars() {
  $.ajax({
    url: 'services/getCars.php',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      render();
    }
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

// Gennerate cards based on the contents in cars.json file, and if the file is not found, retrieve the cars from server
// and store them into cars.json
function render() {
  changeNavbar();
  fetch('json/cars.json')
    .then(response => response.json())
    .then(data => {
      let insertposition = document.getElementById('latest-products');

      for (const car of data) {
        let html = `
            <div class="col-md-4" id="${car.id}">
              <div class="card mx-auto" style="width: 18rem;">
                <img src="${car.img_src}" class="card-img-top" alt="${car.brand + ' ' + car.model}">
                <div class="card-body">
                  <h5 class="card-title">${car.brand + ' ' + car.category + ' ' + car.model_year}</h5>
                  <p class="card-text">${car.car_description}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Mileage(km): ${car.mileage}</li>
                  <li class="list-group-item">Fuel Type: ${car.fuel_type}</li>
                  <li class="list-group-item">Seats: ${car.seats}</li>
                  <li class="list-group-item">Price per day: ${'$' + car.daily_price}</li>
                  <li class="list-group-item">Status: ${parseInt(car.car_availability) !== 0 ? 'In stock' : 'Out of stock'}</li>
                </ul>
                <div class="card-body">
                  <a onclick="addBtnOnClick(event, ${car.id}, ${car.car_availability})" href="#" class="card-link" id="addBtn">Add to cart</a>
                </div>
              </div>
            </div>
          `;

        insertposition.insertAdjacentHTML("afterend", html);
      }
    })
    .catch(error => {
      console.error(error)
      getCars();
    });
}

// Add to cart function
function addBtnOnClick(event, carID, car_availability) {
  event.preventDefault();
  if (car_availability == false) {
    alert("Sorry, the car is not available now. Please try other cars.");
    return;
  }

  fetch(`services/addToCart.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `car=${carID}`
  })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        alert('Adding was successful!');
        sessionStorage.setItem('cart', JSON.stringify(data));
      }
    })
    .catch(error => console.error(error));
}
