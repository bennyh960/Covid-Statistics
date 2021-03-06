//example how to work with charjs basic of basic

//HTML
{
  /* <body>
<div class="container">
  <canvas id="myChart"></canvas>
</div>
</body> */
}

let myChart = document.getElementById("myChart").getContext("2d");

//global options
//   Chart.defaults.global.defaultFontFamily = "Lato";
//   Chart.defaults.global.defaultFontSize = "18";
// (Chart.defaults.global.defaultFontColor = "#777");
let massPopChart = new Chart(myChart, {
  type: "bar", //bar,horizontalBar,pie, line ,doughnut, radar,polarArea
  data: {
    labels: ["Ashkelon", "Jerusalem", "Tel-Aviv", "Ashdod", "Haifa", "Sderot"],
    datasets: [
      {
        label: "Population",
        data: [100000, 300000, 400000, 150000, 232000, 84000],
        backgroundColor: ["green", "red", "blue", "orange", "black"],
        borderWidth: 2,
        borderColor: "#f3f3f3",
        hoverBorderWidth: 3,
        hoverBorderColor: "black",
        //   backgroundColor: "green",//work for all
        //   border: "4px solid gray",//not work
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Largest City Population",
      fontSize: 25,
    },
    legend: {
      display: false, // true
      position: "right",
      labels: {
        fontColor: "gray",
      },
    },
    layout: {
      padding: {
        left: 50,
        right: 0,
        bottom: 0,
        top: 0,
      },
    },
    tooltips: {
      enabled: false, //true
    },
  },
});

const fetcData = axios.get("https://corona-api.com/countries");
console.log(fetcData);

const fetchData2 = fetch("https://corona-api.com/countries").then("");
