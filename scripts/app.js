import { fetchData } from "./data.js";

const countriesURL =
  "https://nameless-citadel-58066.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/asia";

// const countriesURL = "https://cors.bridged.cc/https://restcountries.herokuapp.com/api/v1/";
const coronaURL = "https://corona-api.com/countries";
// fetchData(coronaURL, "");
fetchData(countriesURL, "");
