import { getAllCoronaDataInObj } from "./data.js";

// const countryDataObj = getCountryFromLocalStorage();
// const coronaDataObj = getCoronaFromLocalStorage();

const continents = {
  asia: [],
  europe: [],
  americas: [],
  africa: [],
  oceania: [],
  tempData: {
    name: undefined,
    population: undefined,
    updateDate: undefined,
    confirmed: undefined,
    critical: undefined,
    recovered: undefined,
    death: undefined,
    today: undefined,
  },
};

continents.getDataByCountry = function (continentKey, countryInput) {
  const findCountry = this[continentKey].find((c) => c !== undefined && c.name === countryInput);
  this.tempData.name = findCountry.name;
  this.tempData.population = findCountry.population;
  this.tempData.updateDate = findCountry.updated_at;
  this.tempData.confirmed = findCountry.latest_data.confirmed;
  this.tempData.critical = findCountry.latest_data.critical;
  this.tempData.recovered = findCountry.latest_data.recovered;
  this.tempData.death = findCountry.latest_data.deaths;
  this.tempData.today = findCountry.today;
  //   console.log(continents.tempData);
};

continents.sumDataPerContinent = function (continentKey) {
  const totalPerContinent = {
    population: 0,
    confirmed: 0,
    critical: 0,
    recovered: 0,
    death: 0,
    // today: undefined,
  };
  this[continentKey].forEach((country) => {
    if (country !== undefined) {
      this.getDataByCountry(continentKey, country.name);
      for (let key in totalPerContinent) {
        totalPerContinent[key] += this.tempData[key];
      }
    }
  });
  return totalPerContinent;
};

async function main() {
  await getAllCoronaDataInObj(continents);
  await continents.getDataByCountry("asia", "Israel");
  //   await continents.getDataByCountry("americas", "Israel");
  //   await continents.getDataByCountry("europe", "Israel");
  await continents.sumDataPerContinent("asia");
}
main();
