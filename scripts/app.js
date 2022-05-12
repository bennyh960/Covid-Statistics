import { fetchData } from "./data.js";

const countriesURL = "https://restcountries.herokuapp.com/api/v1/region/:";
const coronaURL = "https://corona-api.com/countries";
fetchData(coronaURL, "");
