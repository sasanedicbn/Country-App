const select = document.querySelector("select");

const parentEl = document.querySelector(".country__list");
const searchCountry = document.querySelector("input");

const pagination = document.querySelector(".pagination");
const header = document.querySelector("header");
const main = document.querySelector("body");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const link = document.querySelector("a");
const link2 = document.querySelector(".link2");
const paginationBtns = document.querySelector(".pagination-buttons");
const searchBar = document.querySelector(".search__bar__container");

const pageSize = 20;
let currentPage;
let currentCountry = [];
let nameCountry;
let linkBack;
let detailsContainer;
const worldCountry = () => {
  const createPaginationButtons = () => {
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
  };
  const setCountries = (countries) => {
    parentEl.innerHTML = "";
    if (!countries) return;

    countries.forEach((country) => {
      const li = document.createElement("li");

      const link = document.createElement("a");
      link.href = "#";
      link.classList.add("country-link");
      li.appendChild(link);

      const img = document.createElement("img");
      img.classList.add("country__list__item");
      img.src = country.flags.svg;
      link.appendChild(img);

      const name = document.createElement("p");
      name.classList.add("country-name");
      name.textContent = country.name.common;
      link.appendChild(name);

      link.addEventListener("click", function (event) {
        event.preventDefault();
        linkBack = document.createElement("a");
        linkBack.classList.add("linkBack");
        linkBack.href = "#";
        linkBack.textContent = "← BACK";
        header.appendChild(linkBack);
        nameCountry = country.name.common;
        history.replaceState(
          null,
          null,
          nameCountry.replace(/ /g, "-").toLowerCase()
        );
        const selectedCountryData = [country];
        console.log(selectedCountryData);
        fetchdetailsCountry(selectedCountryData);
        displayCountryDetails(selectedCountryData);
      });

      parentEl.appendChild(li);
    });
  };
  const paginate = (array) => {
    currentCountry = [];

    for (let i = 0; i < array.length; i += pageSize) {
      const chunk = array.slice(i, i + pageSize);
      currentCountry.push(chunk);

      currentPage = 0;
      setCountries(currentCountry[currentPage]);
      createPaginationButtons();
    }
  };

  const debounceFetchCountry = _.debounce(fetchCountry, 300);
  return {
    createPaginationButtons,
    setCountries,
    paginate,
    debounceFetchCountry,
  };
};
const COUNTRY = worldCountry();

COUNTRY.createPaginationButtons();
fetchCountry();

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
    COUNTRY.setCountries(data);
    COUNTRY.paginate(data);
  } catch (error) {
    console.log(error);
  }
}
async function fetchdetailsCountry(name) {
  const fetchedCountry = name[0].name.common;

  console.log(fetchedCountry);
  const fetccouhed = `https://restcountries.com/v3.1/name/${fetchCountry}`;

  try {
    const response = await fetccouhed(fetccouhed);
    let fetched = await response.json();
    displayCountryDetails(name[0]);
    console.log(fetched);
  } catch (error) {
    // console.log(error);
  }
}
function displayCountryDetails(country) {
  console.log(country);
  const detaildCountry = country[0];
  detailsContainer = document.querySelector(".country-details");
  detailsContainer.innerHTML = "";

  // Create elements to display country details
  const name = document.createElement("h2");
  name.textContent = detaildCountry.name.common;

  const capital = document.createElement("p");
  capital.textContent = "Capital: " + detaildCountry.capital;

  const population = document.createElement("p");
  population.textContent =
    "Population: " + detaildCountry.population.toLocaleString();

  const img = document.createElement("img");
  img.classList.add("country__list__item");
  img.src = detaildCountry.flags.svg;

  detailsContainer.appendChild(img);
  detailsContainer.appendChild(name);
  detailsContainer.appendChild(capital);
  detailsContainer.appendChild(population);
  // Add more details as needed

  // Show details container
  detailsContainer.style.display = "block";
  COUNTRY.setCountries("");
  paginationBtns.style.display = "none";
  searchBar.style.display = "none";
}

searchCountry.addEventListener("input", function () {
  COUNTRY.debounceFetchCountry();
});

prevBtn.addEventListener("click", function () {
  if (currentPage > 0) {
    currentPage--;
    COUNTRY.setCountries(currentCountry[currentPage]);
  }
});
nextBtn.addEventListener("click", function () {
  if (currentPage < currentCountry.length - 1) {
    currentPage++;
    COUNTRY.setCountries(currentCountry[currentPage]);
  }
});

window.addEventListener("DOMContentLoaded", function () {
  history.replaceState({ homePage: "Home Page" }, null, "");
});

window.addEventListener("popstate", function () {
  fetchCountry();
  history.replaceState({ homePage: "Home Page" }, null, "/");
  paginationBtns.style.display = "flex";
  searchBar.style.display = "flex";
  linkBack.style.display = "none";
  detailsContainer.style.display = "none";
});

// POPSTATE
// this is event of windwows interface and then this fired when we click on button back or forward (change history)
// syntax is addEventListener("popstate", (event) => {})
// ONE MORE EXAMPLE WHEN WE CAN USE POPSTATE
// we can use popstate when we want implement navigation on single page and we click on <a></a> (some link on page)
// which uses JavaScript to dynamically load content we can update URL with (history.pushState, history.replaceState())
// HISTORY.PUSHSTATE
// THE PUSHSTATE HISTORY is method of the History interface adds an entry browser's session history stack.
// The pushState() method adds a new state to the browser's history.
// It's used to add a new entry to the history without actually loading a new page.
// It's applied when you want to simulate navigation to a new page within a single-page application.
// It allows you to change the URL in the browser's address bar without actually loading a new page.
// Method structure: history.pushState(stateObj, title, url).
// stateObj: An object representing the state you're adding to the history. This object can contain any data you want to associate with that state.
// title: The title of the state. Some browsers don't use it, so it's usually an empty string ('').
// url: The URL you want to set.
// HISTORY.REPLACESTATE()
// The replaceState() method replaces the current state in the browser's history with a new state.
// It's used when you want to replace the current state without adding a new entry to the history.
// Like pushState(), it allows you to change the URL in the browser's address bar without actually loading a new page.
