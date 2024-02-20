function setCountries(countries) {
  const parentEl = document.querySelector(".country__list");
  countries.forEach((country) => {
    const li = document.createElement("li");
    console.log(countries);

    const img = document.createElement("img");
    img.classList.add("country__list__item");
    img.src = country.flags.svg;
    li.appendChild(img);

    const name = document.createElement("p");
    name.textContent = country.name.common;
    li.appendChild(name);

    parentEl.appendChild(li);
  });
}

async function fetchCountry() {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/europe`
    );
    const data = await response.json();
    setCountries(data);
  } catch (error) {
    console.log(error);
  }
}
fetchCountry();
