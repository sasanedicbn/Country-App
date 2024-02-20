async function fetchCountry() {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/europe`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
fetchCountry();
