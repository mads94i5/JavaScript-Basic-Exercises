const URL = "http://localhost:8080/api/cars"

// Find a single car

document.getElementById("btn-get-car").onclick = getCar

function getCar(event) {
    const carId = document.getElementById("text-for-id").value
    if (!carId) {
        document.getElementById("c-error").innerText = "Enter an id"
    } else {
        fetch(URL+"/"+carId)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status + " - No such car found.")
            }
            return res.json()})
        .then(car => makeCarTable(car))
        .catch((error) => {
            document.getElementById("c-error").innerText = error
        })
    }
}

function makeCarTable(car) {
    const tableRow = `
    <tr>
        <td>${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.pricePrDay}</td>
    </tr>
    `
    document.getElementById("table-body-car").innerHTML = tableRow
}

// Show all cars

document.getElementById("btn-get-all").onclick = getAllCars

function getAllCars(event) {
    fetch(URL)
    .then(res => {
        if (!res.ok) {
            return Promise.reject(res.status + " - No cars found.")
        }
        return res.json()})
    .then(cars => makeAllCarsTable(cars))
    .catch((error) => {
        document.getElementById("cs-error").innerText = error
    })
}

function makeAllCarsTable(cars) {
    const tableRows = cars.map(car => `
    <tr>
        <td>${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.pricePrDay}</td>
    </tr>
    `)
    const tableRowsString = tableRows.join("")
    // Don't do this method
    document.getElementById("table-body-cars").innerHTML = tableRowsString
}

// Edit car *unfinished/not working*

document.getElementById("submit-edit").onclick = submitEdit

function submitEdit(event) {
    const carId = document.getElementById("edit-id").value
    const brand = document.getElementById("edit-brand").value
    const model = document.getElementById("edit-model").value
    const year = document.getElementById("edit-year").value
    const price = document.getElementById("edit-price").value
    const color = document.getElementById("edit-color").value

    if (!carId) {
        document.getElementById("edit-result").innerText = "Enter an id"
    } else if (!brand || !model || !year || !price || !color) {
        document.getElementById("edit-result").innerText = "Please fill in all fields"
    } else {
        fetch(URL+"/"+carId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                brand,
                model,
                year,
                price,
                color
            })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status + " - Failed to update car.")
            }
            return res.json()
        })
        .then(car => {
            document.getElementById("edit-result").innerText = "Car updated successfully"
            document.getElementById("edit-brand").value = ""
            document.getElementById("edit-model").value = ""
            document.getElementById("edit-year").value = ""
            document.getElementById("edit-price").value = ""
            document.getElementById("edit-color").value = ""
        })
        .catch((error) => {
            document.getElementById("edit-result").innerText = error
        })
    }
}

// Add car *unfinished/not working*

document.getElementById("add-car").onclick = addCar;

function addCar() {
  const brand = document.getElementById("input-brand").value;
  const model = document.getElementById("input-model").value;
  const year = document.getElementById("input-year").value;
  const pricePrDay = document.getElementById("input-price").value;
  const color = document.getElementById("input-color").value;

  if (!brand || !model || !year || !price || !color) {
    document.getElementById("add-result").innerText = "Please fill out all fields";
    return;
  }

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      brand,
      model,
      year,
      pricePrDay,
      color
    })
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject("Failed to add car");
    }
    return res.json();
  })
  .then(data => {
    document.getElementById("add-result").innerText = "Car added successfully";
    document.getElementById("input-brand").value = "";
    document.getElementById("input-model").value = "";
    document.getElementById("input-year").value = "";
    document.getElementById("input-price").value = "";
    document.getElementById("input-color").value = "";
  })
  .catch((error) => {
    document.getElementById("add-result").innerText = error;
  })
}