let map = L.map("map").setView([33.48290974166602, 48.35314210520447], 10);
const day = Array.from(document.querySelectorAll(".day"));
const items = Array.from(document.querySelectorAll(".items"))[0];
const result = document.querySelector(".result");
const priceCarts = Array.from(document.querySelectorAll(".price-cart"));
const priceSum = document.getElementById("priceSum");
const form = document.getElementsByTagName("form")[0];

let lat = 0;
let lng = 0;

day.forEach((elm) => {
  elm.addEventListener("click", (event) => {
    for (let e of day) {
      e.classList.remove("ac");
    }
    elm.classList.add("ac");
    result.innerHTML = elm.innerHTML + " ساعت " + items.innerHTML;
  });
});

let sum = 0;
priceCarts.forEach((p) => {
  console.log(p.dataset.price);
  sum += Number(p.dataset.price);
});
sum += "";
sum = sum.replace(",", "");
x = sum.split(".");
y = x[0];
z = x.length > 1 ? "." + x[1] : "";
var rgx = /(\d+)(\d{3})/;
while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
priceSum.innerHTML = y + " تومان ";

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var marker;

map.on("click", function (e) {
  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker(e.latlng).addTo(map);

  lat = e.latlng.lat;
  lng = e.latlng.lng;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const inputLoc = document.createElement("input");
    inputLoc.name = "locat";
    inputLoc.value = `${lat},${lng}`;
    inputLoc.type = "hidden";

    const ac = document.querySelector(".ac");
    const inputDay = document.createElement("input");
    inputDay.name = "day";
    inputDay.value = ac.innerHTML;
    inputDay.type = "hidden";

    const inputTime = document.createElement("input");
    inputTime.name = "time";
    inputTime.value = "16 تا 18";
    inputTime.type = "hidden";

    form.appendChild(inputLoc);
    form.appendChild(inputDay);
    form.appendChild(inputTime);
    form.submit();
  } catch (err) {
    form.submit();
  }
});
