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
  // check time to update
  if (Math.floor(Date.now() / 1000 / 60 / 60) - localStorage.getItem("lastUpdateHours") > 2) {
    const houersLeftsince1970 = Math.floor(Date.now() / 1000 / 60 / 60);
    localStorage.setItem("lastUpdateHours", houersLeftsince1970);
    const timenow = "Last Update: " + Date().split(" ").splice(0, 5).join(" ");
    localStorage.setItem("lastUpdate", timenow);
    localStorage.setItem("coronaData", coronaObjToLocalStorage);
    console.log("store in local and update time");
  }
  document.getElementById("lastUpdateScreen").style.fontFamily = "Ariel";
  document.getElementById("lastUpdateScreen").textContent = localStorage.getItem("lastUpdate");

  //! This data will never update : country not moving between continents
  if (!localStorage.getItem("countryData")) {
    localStorage.setItem("countryData", countryObjToLocalStorage);
    console.log("store in local");
  }
}

// todo add timeline when to update local storage

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

function buildContinentsObj(country, obj, validCoronaDataArr) {
  for (let key in obj) {
    const keyName = key[0].toUpperCase() + key.slice(1);
    continentsAddCountries(country, obj[key], keyName, validCoronaDataArr);
  }
}

function continentsAddCountries(iterator, array, continent, coronaByCountryArray) {
  if (iterator.region === continent) {
    //country code work better than names
    const countryCoronaObj = coronaByCountryArray.find((c) => {
      return c.code === iterator.cca2;
    });
    array.push(countryCoronaObj);
  }
}

export async function getAllCoronaDataInObj(obj) {
  const coronaData = await getCoronaFromLocalStorage();
  const countryData = await getCountryFromLocalStorage();
  // !this code line can fix undifind country name
  // coronaData.data.forEach((validData, idx) => {
  //   if (validData.latest_data.confirmed < 100) {
  //     coronaData.data.splice(idx, 1);
  //   }
  // });
  countryData.forEach((country) => {
    buildContinentsObj(country, obj, coronaData.data);
  });
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
