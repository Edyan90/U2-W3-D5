const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmYxMTdjMjM5YzAwMTUyZjRiNmYiLCJpYXQiOjE3MTgzNTM2ODEsImV4cCI6MTcxOTU2MzI4MX0.HxbtsHIRZzTywQNmyERSUS_shUPpyog2m1MqD67j8DA";
const URL = "https://striveschool-api.herokuapp.com/api/product/";
const market = document.getElementById("market");
fetch(URL, {
  method: "GET",
  headers: {
    Authorization: API_KEY,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nel reperimento dati");
    }
  })
  .then((smartphones) => {
    console.log(smartphones);
    smartphones.forEach((smartphone) => {
      const col = document.createElement("div");
      const card = document.createElement("div");
      const img = document.createElement("img");
      const cardBody = document.createElement("div");
      const title = document.createElement("h3");
      const text = document.createElement("p");
      const divButtonsFlex = document.createElement("div");
      const divButtons = document.createElement("div");
      const buttonView = document.createElement("button");

      const small = document.createElement("small");

      col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-4", "col-xl-4", "col-xxl-3");
      card.classList.add("card", "mb-4", "shadow-sm", "h-100");
      img.classList.add("card-img-top", "bd-placeholder-img");
      cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-around");
      title.classList.add("card-title");
      text.classList.add("card-text");
      divButtonsFlex.classList.add("d-flex", "justify-content-between", "align-items-center");
      divButtons.classList.add("btn-group");
      buttonView.classList.add("btn", "btn-sm", "btn-outline-secondary");

      market.classList.add("g-5");

      img.setAttribute("src", `${smartphone.imageUrl}`);
      card.setAttribute("style", "width: 18rem");
      title.innerText = `${smartphone.name}`;
      text.innerText = `${smartphone.description}`;
      buttonView.innerText = "View";

      small.innerText = `${smartphone.price}€`;

      cardBody.appendChild(title);
      cardBody.appendChild(text);
      cardBody.appendChild(divButtonsFlex);
      divButtonsFlex.appendChild(divButtons);
      divButtonsFlex.appendChild(small);
      divButtons.appendChild(buttonView);

      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      market.appendChild(col);
    });
  })
  .catch((err) => console.log(err));
