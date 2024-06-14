const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmYxMTdjMjM5YzAwMTUyZjRiNmYiLCJpYXQiOjE3MTgzNTM2ODEsImV4cCI6MTcxOTU2MzI4MX0.HxbtsHIRZzTywQNmyERSUS_shUPpyog2m1MqD67j8DA";
const URL = "https://striveschool-api.herokuapp.com/api/product/";
const searchForm = document.getElementById("searchForm");
const createbtn = document.getElementById("create");
const resetbtn = document.getElementById("reset");
resetbtn.addEventListener("click", () => {
  console.log(searchForm);
  searchForm.reset(); // non funziona why?
});
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imgURL").value,
    price: parseFloat(document.getElementById("price").value),
  };
  searchForm.reset();
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella creazione del prodotto");
      }
    })
    .then((productObj) => {
      console.log(productObj);
    })
    .catch((err) => console.log(err));
});
