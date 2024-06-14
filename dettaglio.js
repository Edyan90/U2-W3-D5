const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmYxMTdjMjM5YzAwMTUyZjRiNmYiLCJpYXQiOjE3MTgzNTM2ODEsImV4cCI6MTcxOTU2MzI4MX0.HxbtsHIRZzTywQNmyERSUS_shUPpyog2m1MqD67j8DA";
console.log(id);
const URL = "https://striveschool-api.herokuapp.com/api/product/";
window.addEventListener("DOMContentLoaded", function () {
  fetch(URL + id, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((smartphone) => {
      const container = document.getElementById("detail");
      container.innerHTML = "";

      const col = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const price = document.createElement("p");
      const description = document.createElement("p");
      const modifica = document.createElement("a");

      col.className = "col";
      img.className = "object-fit-cover my-3 w-50";
      price.className = "text-primary fs-3 fw-bold";
      description.className = " fs-5 fw-bold";
      modifica.className = "btn  btn-success fs-5 my-3";

      img.setAttribute("style", "height=200");
      img.src = smartphone.imageUrl;

      h2.innerText = smartphone.brand + " " + smartphone.name;
      price.innerText = smartphone.price + " €";
      description.innerText = smartphone.description;
      modifica.innerText = "Edit";

      modifica.addEventListener("click", handleEditBtnClick);
      col.append(img, h2, price, description, modifica);
      container.append(col);
    })
    .catch((err) => console.log(err));
});

const handleEditBtnClick = () => {
  window.location.assign("./backoffice.html?" + id);
};
