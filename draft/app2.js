import { getAllCoronaDataInObj } from "../scripts/dataAnalysis.js";
import { chartObj } from "../scripts/chart.js";
import { continents } from "../scripts/dataObject.js";
import { updateNumericData } from "../scripts/updateScreenData.js";

let dataChart;
// *===================================================================== main function ==========================================
async function main() {
  await getAllCoronaDataInObj(continents);
  await continents.getDataByCountry("asia", "India");
  //   console.log(continents.tempData);
  //   todo: sum all per country need to fix due to it use tempdata on loop and overwrite it
  //   await continents.sumDataPerContinent("asia");
  let myChart = document.getElementById("myChart").getContext("2d");

  chartObj.getLabels(continents, "asia", true);
  chartObj.getData(continents, "asia", "confirmed");

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
function createDropDownOptionToSearch(event) {
  const dataList = document.getElementById("searchCountry");
  dataList.innerHTML = "";
  continents[event.target.value].forEach((country) => {
    const countryOpt = document.createElement("option");
    if (country) {
      //   console.log(country);
      countryOpt.value = country.name;
      dataList.appendChild(countryOpt);
    }
  });
}

const helperMemory = {
  case: "confirmed",
  continent: "asia",
};
function countrySelectedToShow(eventFather) {
  const selectedCountry = document.querySelector("#searchedAndSelected");
  selectedCountry.addEventListener("change", async () => {
    if (eventFather) {
      await continents.getDataByCountry(eventFather.target.value, selectedCountry.value);
      chartObj.getData(continents, eventFather.target.value, helperMemory.case);
    }
    updateNumericData(continents.tempData);
  });
}

document.getElementById("data-region").addEventListener("change", async (e) => {
  helperMemory.continent = e.target.value;

  if (e.target.value === "world") {
    chartObj.getLabels(continents, e.target.value, false);
  } else {
    chartObj.getLabels(continents, e.target.value, true);
  }

  //   continents.sumDataPerContinent("asia");
  createDropDownOptionToSearch(e);
  countrySelectedToShow(e);
  dataChart.update();
});

// =========================================================================

document.querySelector(".container-stats-btn").addEventListener("click", (e) => {
  chartObj.getData(continents, helperMemory.continent, e.target.value);
  helperMemory.case = e.target.value;
  chartObj.setLabelAndColor(e.target.value);
  dataChart.update();
  //   console.log(continents.sumDataPerContinent("asia"));
  //   console.log(continents.tempData);
});
