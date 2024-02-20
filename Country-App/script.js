const select = document.querySelector("select");
const parentEl = document.querySelector(".country__list");

function setCountries(countries) {
  countries.forEach((country) => {
    const li = document.createElement("li");
    console.log(countries);

    const img = document.createElement("img");
    img.classList.add("country__list__item");
    img.src = country.flags.svg;
    li.appendChild(img);

    const name = document.createElement("p");
    name.classList.add("country-name");
    name.textContent = country.name.common;
    li.appendChild(name);

    parentEl.appendChild(li);
  });
}

select.addEventListener("change", function (event) {
  const region = event.target.value;
  fetchCountry(region);
});

async function fetchCountry(region) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setCountries(data);
  } catch (error) {
    console.log(error);
  }
}
fetchCountry();
