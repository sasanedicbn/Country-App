const select = document.querySelector("select");

const parentEl = document.querySelector(".country__list");
const searchCountry = document.querySelector("input");

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
prevBtn.addEventListener("click", function () {
  if (currentPage > 0) {
    currentPage--;
    setCountries(currentCountry[currentPage]);
  }
});
nextBtn.addEventListener("click", function () {
  if (currentPage < currentCountry.length - 1) {
    currentPage++;
    setCountries(currentCountry[currentPage]);
  }
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
// Method structure: history.replaceState(stateObj, title, url).
// stateObj: An object representing the new state in the history.
// title: The title of the state.
// url: The URL you want to set.
// windows.location.href is not a method,
//  it's a property that will tell you the current URL location of the browser. Changing the value of the property will redirect the page.
//
