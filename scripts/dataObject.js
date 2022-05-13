// * ======================================================================================================== *//
// ? This file represent the modified new obj according to desired data. it exported directly to main.
// ? The functions invoked in main and get input from user in order to represent the desired data.
// * ======================================================================================================== *//

export const continents = {
  asia: [],
  europe: [],
  americas: [],
  africa: [],
  oceania: [],
  tempData: {
    // name: undefined,
    // population: undefined,
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
  this.tempData.confirmed = findCountry.latest_data.confirmed;
  this.tempData.critical = findCountry.latest_data.critical;
  this.tempData.recovered = findCountry.latest_data.recovered;
  this.tempData.death = findCountry.latest_data.deaths;
  this.tempData.today = findCountry.today;
  console.log(continents.tempData);
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
