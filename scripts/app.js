import { getAllCoronaDataInObj } from "./dataAnalysis.js";
import { chartObj } from "./chart.js";
import { continents } from "./dataObject.js";
import { updateNumericData } from "./updateScreenData.js";

let dataChart;
// *===================================================================== main function ==========================================
async function main() {
  await getAllCoronaDataInObj(continents);

  //start with world data as default and confirm cases
  createDropDownOptionToSearch("world");
  updateNumericData(continents.sumDataForWorldTable());
  continents.sumDataForWorld("confirmed");
  //todo : add table data per world and continent also

  let myChart = document.getElementById("myChart").getContext("2d");

  chartObj.getLabels(continents, "world", false);
  chartObj.getData(continents, "world", "confirmed");

  dataChart = new Chart(myChart, chartObj);
}

// * Invoke all project functions*//
main();

// * ============================================ Events
document.getElementById("char-type").addEventListener("change", (e) => {
  chartObj.changeTypeOfChart(e.target.value);
  dataChart.update();
});

// ==========================================================================
// select region to show data
function createDropDownOptionToSearch(continentNameStr) {
  if (continentNameStr === "world") {
    continents.world.forEach((continent) => {
      createOptionCountry(continent.name, true);
    });
  } else {
    createOptionCountry(continentNameStr, false);
  }
}

function createOptionCountry(continentNameStr, isAllWorld) {
  const dataList = document.getElementById("searchCountry");
  if (!isAllWorld) {
    dataList.innerHTML = "";
  }
  continents[continentNameStr].forEach((country) => {
    const countryOpt = document.createElement("option");
    if (country) {
      // console.log(country);
      countryOpt.value = country.name;
      dataList.appendChild(countryOpt);
    }
  });
}

const helperMemory = {
  case: "confirmed",
  continent: "world",
};
function countrySelectedToShow(continentObjElement) {
  const selectedCountry = document.querySelector("#searchedAndSelected");
  selectedCountry.addEventListener("change", async () => {
    if (continentObjElement) {
      await continents.getDataByCountry(continentObjElement, selectedCountry.value);
      chartObj.getData(continents, continentObjElement, helperMemory.case);
    }
    updateNumericData(continents.tempData);
  });
}

document.getElementById("data-region").addEventListener("change", async (e) => {
  helperMemory.continent = e.target.value;

  if (e.target.value !== "world") {
    updateNumericData(continents.sumDataPerContinent(e.target.value));
  } else {
    updateNumericData(continents.sumDataForWorldTable());
  }

  if (e.target.value === "world") {
    continents.worldDataPerContinentAndStatus = [];
    continents.sumDataForWorld("confirmed");
    chartObj.getLabels(continents, e.target.value, false);
    chartObj.getData(continents, e.target.value, "confirmed");
  } else {
    chartObj.getLabels(continents, e.target.value, true);
    chartObj.getData(continents, e.target.value, "confirmed");
    // updateNumericData(continents.tempData);
  }

  createDropDownOptionToSearch(e.target.value);
  countrySelectedToShow(e.target.value);
  dataChart.update();
});

//del searched
document.getElementById("searchedAndSelected").addEventListener("focus", (e) => {
  e.target.value = "";
});

// =========================================================================

document.querySelector(".container-stats-btn").addEventListener("click", (e) => {
  chartObj.getData(continents, helperMemory.continent, e.target.value);
  if (helperMemory.continent === "world") {
    chartObj.getLabels(continents, helperMemory.continent, false);
  } else {
    chartObj.getLabels(continents, helperMemory.continent, true);
  }
  helperMemory.case = e.target.value;
  chartObj.setLabelAndColor(e.target.value);
  continents.worldDataPerContinentAndStatus = [];
  continents.sumDataForWorld(e.target.value);
  dataChart.update();
});
