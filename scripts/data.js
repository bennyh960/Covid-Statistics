// * ================================================================= Fetch Data =====================================================
const countriesURL = "https://restcountries.herokuapp.com/api/v1/";
const coronaURL = "https://corona-api.com/countries";

const proxy = "https://nameless-citadel-58066.herokuapp.com/";
// const proxy1 = 'https://api.allorigins.win/raw?url='

async function fetchData(proxy, url, str) {
  const dataAsJson = await fetch(proxy + url + str);
  const data = await dataAsJson.json();
  // console.log(data);
  return data;
}

async function getCountryObj() {
  const country = await fetchData(proxy, countriesURL, "");
  return country;
}
async function getCoronaObj() {
  const corona = await fetchData("", coronaURL, "");
  return corona;
}

//* ==================================================================== Store Data ======================================================
async function setDataToLocalStorage() {
  //fetch data functions
  const countryObjFromFetch = await getCountryObj();
  const coronaObjFromFetch = await getCoronaObj();
  //convert obj to string
  const countryObjToLocalStorage = await JSON.stringify(countryObjFromFetch);
  const coronaObjToLocalStorage = await JSON.stringify(coronaObjFromFetch);
  //store on local storage
  localStorage.setItem("countryData", countryObjToLocalStorage);
  localStorage.setItem("coronaData", coronaObjToLocalStorage);
}

setDataToLocalStorage();

async function getCountryFromLocalStorage() {
  const countryObj = await JSON.parse(localStorage.getItem("countryData"));
  // console.log(countryObj);
  return countryObj;
}
async function getCoronaFromLocalStorage() {
  const coronaObj = await JSON.parse(localStorage.getItem("coronaData"));
  // console.log(coronaObj);
  return coronaObj;
}

// *======================================================= Create Obj with all Data ====================================

function buildContinentsObj(country, obj, corona) {
  for (let key in obj) {
    const keyName = key[0].toUpperCase() + key.slice(1);
    continentsAddCountries(country, obj[key], keyName, corona.data);
  }
}

function continentsAddCountries(iterator, array, continent, coronaByCountryArray) {
  if (iterator.region === continent) {
    const countryCoronaObj = coronaByCountryArray.find((c) => c.name === iterator.name.common);
    array.push(countryCoronaObj);
  }
}

export async function getAllCoronaDataInObj(obj) {
  const coronaData = await getCoronaFromLocalStorage();
  const countryData = await getCountryFromLocalStorage();
  countryData.forEach((country) => {
    buildContinentsObj(country, obj, coronaData);
  });
  // console.log(obj);
}

// ?work same as async function
// coronaDataObj.then((corona) => {
//   countryDataObj.then((data) => {
//     data.forEach((country) => {
//       buildContinentsObj(country, continents, corona);
//     });
//     console.log(continents);
//   });
// });
