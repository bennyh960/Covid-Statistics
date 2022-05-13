import { getAllCoronaDataInObj } from "./dataAnalysis.js";
import { chartObj } from "./chart.js";
import { continents } from "./dataObject.js";

let dataChart;
// *===================================================================== main function ==========================================
async function main() {
  await getAllCoronaDataInObj(continents);
  await continents.getDataByCountry("asia", "Israel");
  //   console.log(continents.tempData);
  //   todo: sum all per country need to fix due to it use tempdata on loop and overwrite it
  //   await continents.sumDataPerContinent("asia");
  let myChart = document.getElementById("myChart").getContext("2d");

  chartObj.getLabels(continents, "asia");
  chartObj.getData(continents, "asia", "confirmed");

  dataChart = new Chart(myChart, chartObj);
}

// * Invoke all project functions*//
main();

document.getElementById("char-type").addEventListener("change", (e) => {
  chartObj.changeTypeOfChart(e.target.value);

  dataChart.update();
});

document.querySelector(".container-stats-btn").addEventListener("click", (e) => {
  //   chartObj.changeTypeOfChart(e.target.value);
  chartObj.getData(continents, "asia", e.target.value);
  chartObj.setLabelAndColor(e.target.value);
  //   todo : this func should invoke when country select and not here
  updateNumericData(continents.tempData);
  dataChart.update();
});

function updateNumericData(obj) {
  document.querySelectorAll(".dataPerInput").forEach((numeric, idx) => {
    const objKeyArr = Object.keys(obj);
    const key = objKeyArr[idx];
    // console.log(key);
    numeric.textContent = intToString(obj[key]);
  });
  console.log(obj.tempData);
}

function intToString(n) {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
}
