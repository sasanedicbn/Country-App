const select = document.querySelector("select");
// i ovo gore treba u black
const parentEl = document.querySelector(".country__list");
const searchCountry = document.querySelector("input");
// search se odnosi na input polje ovo gore
const pagination = document.querySelector(".pagination");
const header = document.querySelector("header");
const main = document.querySelector("body");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageSize = 20;
let currentPage;
let currentCountry = [];

function createPaginationButtons() {
  pagination.innerHTML = "";
  for (let i = 0; i < currentCountry.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.addEventListener("click", function () {
      currentPage = i;
      setCountries(currentCountry[currentPage]);
    });
    pagination.appendChild(btn);
  }
}
createPaginationButtons();
function setCountries(countries) {
  parentEl.innerHTML = "";
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
  let serchTerm = searchCountry.value.toLowerCase();

  const url = region
    ? `https://restcountries.com/v3.1/region/${region}`
    : `https://restcountries.com/v3.1/all`;

  try {
    const response = await fetch(url);
    let data = await response.json();
    if (serchTerm) {
      data = data.filter((country) => {
        return country.name.common.toLowerCase().startsWith(serchTerm);
      });
    }
    setCountries(data);
    paginate(data);
  } catch (error) {
    console.log(error);
  }
}
fetchCountry();
const debounceFetchCountry = _.debounce(fetchCountry, 300);

searchCountry.addEventListener("input", function () {
  debounceFetchCountry();
});

function paginate(array) {
  currentCountry = [];

  for (let i = 0; i < array.length; i += pageSize) {
    const chunk = array.slice(i, i + pageSize);
    currentCountry.push(chunk);

    currentPage = 0;
    setCountries(currentCountry[currentPage]);
    createPaginationButtons();
  }
}
prevBtn.addEventListener("click", function () {});
