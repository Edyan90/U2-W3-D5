const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmYxMTdjMjM5YzAwMTUyZjRiNmYiLCJpYXQiOjE3MTgzNTM2ODEsImV4cCI6MTcxOTU2MzI4MX0.HxbtsHIRZzTywQNmyERSUS_shUPpyog2m1MqD67j8DA";

const id = new URLSearchParams(window.location.search).get("productId");
console.log(id);

const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST";

const resetbtn = document.getElementById("reset");
resetbtn.addEventListener("click", () => {
  console.log(searchForm);
  searchForm.reset(); //non funziona why???
});

window.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  searchForm.onsubmit = handleSubmit;

  const subtitle = document.getElementById("subtitle");
  const submitBtn = document.querySelector("button[type='submit']");
  const deleteBtn = document.getElementById("delete");

  if (id) {
    //siamo su modifica prodotto
    subtitle.innerText = "—— Edit Product";
    submitBtn.innerText = "Edit";
    submitBtn.classList.add("btn-success");

    deleteBtn.classList.remove("d-none");

    deleteBtn.onclick = handleDelete;

    fetch(URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((resp) => resp.json())
      .then((prodotto) => {
        //rimettiamo i valori del prodotto
        document.getElementById("name").value = prodotto.name;
        document.getElementById("description").value = prodotto.description;
        document.getElementById("brand").value = prodotto.brand;
        document.getElementById("price").value = prodotto.price;
        document.getElementById("imgURL").value = prodotto.imageUrl;
        console.log(prodotto.imageUrl);
      })
      .catch((err) => console.log(err));
  } else {
    // qui siamo su creazione prodotto
    subtitle.innerText = "—— Add Product";
    submitBtn.classList.add("btn-info");
  }
});
//funzione delete
const handleDelete = () => {
  //alert di conferma
  const hasConfirmed = confirm("Are you sure delete this product?");

  if (hasConfirmed) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((productDelete) => {
        alert("Hai eliminato l'appuntamento " + productDelete.brand + " " + productDelete.name);
        window.location.assign("./Home.html");
      })
      .catch((err) => console.log(err));
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  const productObj = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imgURL").value,
    price: document.getElementById("price").value,
  };

  fetch(URL, {
    method: method,
    body: JSON.stringify(productObj),
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella creazione del prodotto");
      }
    })
    .then((prodotto) => {
      if (id) {
        alert(`Prodotto ${prodotto.brand} ${prodotto.name} SUCCESS EDIT!`);
      } else {
        alert(`Prodotto ${prodotto.brand} ${prodotto.name} CREATED!`);
        event.target.reset(); //idem per questo non funziona!
      }
    })
    .catch((err) => console.log(err));
};
