// * ======================================================================================================== *//
// ? This file represent the modified new obj according to desired data. it exported directly to main.
// ? The functions invoked in main and get input from user in order to represent the desired data.
// * ======================================================================================================== *//

export const continents = {
  world: [{ name: "asia" }, { name: "europe" }, { name: "americas" }, { name: "africa" }, { name: "oceania" }],
  asia: [],
  europe: [],
  americas: [],
  africa: [],
  oceania: [],
  tempData: {
    // population: undefined,
    confirmed: undefined,
    critical: undefined,
    recovered: undefined,
    death: undefined,
    todayC: undefined,
    todayD: undefined,
    name: undefined,
  },
  worldDataPerContinentAndStatus: [],
};

continents.getDataByCountry = function (continentKey, countryInput) {
  const findCountry = this[continentKey].find((c) => c !== undefined && c.name === countryInput);
  // this.tempData.population = findCountry.population;
  if (findCountry) {
    this.tempData.confirmed = findCountry.latest_data.confirmed;
    this.tempData.critical = findCountry.latest_data.critical;
    this.tempData.recovered = findCountry.latest_data.recovered;
    this.tempData.death = findCountry.latest_data.deaths;
    this.tempData.todayC = findCountry.today.confirmed;
    this.tempData.todayD = findCountry.today.deaths;
    this.tempData.name = findCountry.name;
    // console.log(continents.tempData);
  }
};

// ! this function have to invoke after getDataByCountry() invoked . otherwise it will overwrite on it
continents.sumDataPerContinent = function (continentKey) {
  const totalPerContinent = {
    confirmed: 0,
    critical: 0,
    recovered: 0,
    death: 0,
    todayC: 0,
    todayD: 0,
    name: continentKey,
  };
  this[continentKey].forEach((country) => {
    if (country !== undefined) {
      this.getDataByCountry(continentKey, country.name);
      for (let key in totalPerContinent) {
        if (key !== "name") {
          totalPerContinent[key] += this.tempData[key];
        }
      }
    }
  });
  // console.log(totalPerContinent);
  return totalPerContinent;
};

continents.sumDataForWorldTable = function () {
  const totalWorld = {
    confirmed: 0,
    critical: 0,
    recovered: 0,
    death: 0,
    todayC: 0,
    todayD: 0,
    name: "World",
  };
  const arr = ["asia", "europe", "americas", "africa", "oceania"];
  Object.keys(totalWorld).forEach((status) => {
    arr.forEach((continent) => {
      if (status !== "name") totalWorld[status] += this.sumDataPerContinent(continent)[status];
    });
  });
  console.log(totalWorld);
  return totalWorld;
};

continents.sumDataForWorld = function (status) {
  for (let key of Object.keys(this).slice(1, 6)) {
    let res = 0;
    this[key].forEach((country) => {
      if (country) {
        res += country.latest_data[status];
      }
    });
    this.worldDataPerContinentAndStatus.push(res);
  }
};
