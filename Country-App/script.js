function setCountries(countries) {
  const parentEl = document.querySelector(".country__list");
  countries.forEach((country) => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.classList.add("country__list__item");
    img.src = country.flags.svg;
    li.appendChild(img);

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
