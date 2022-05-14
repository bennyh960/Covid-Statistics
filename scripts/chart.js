// *create chart data object
const data = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "CONFIRMED",
      backgroundColor: "rgba(200,0,0,0.3)",
      //   data: [65, 59, 20, 81, 56, 55, 40],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      stacked: true,
      grid: {
        display: true,
        // color: "rgba(255,99,132,0.2)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
    xAxes: [{ ticks: { fontSize: 8 } }],
    // yAxes: [{ ticks: { max:  } }],
  },
};

// ! due to export i am not able to position this code above his property defenitons
export const chartObj = {
  //line/bar/radar/doughnut and pie/polar area/bubble/scatter
  type: "line",
  options: options,
  data: data,
  getLabels(continentObj, key, isOnlyOneContinent) {
    if (isOnlyOneContinent) {
      this.data.labels = continentObj[key].map((country, idx) => {
        if (country !== undefined) {
          return country.name.slice(0, 10);
        } else {
          return "notDef";
        }
      });
    } else {
      this.data.labels = Object.keys(continentObj).slice(1, 6);
      // this.data.labels = ["", ...Object.keys(continentObj).slice(1, 6), ""];
    }
  },
  getData(continentObj, key, caseKey) {
    // console.log(continentObj, key);
    if (key === "world") {
      this.data.datasets[0].data = continentObj.worldDataPerContinentAndStatus;
    } else {
      this.data.datasets[0].data = continentObj[key].map((country) => {
        // console.log(country);
        if (country !== undefined) {
          return country.latest_data[caseKey];
        } else {
          return "x";
        }
      });
    }
  },
  changeTypeOfChart(type) {
    this.type = type;
  },
  setLabelAndColor(target) {
    this.data.datasets[0].label = target.toUpperCase();
    const colors = {
      confirmed: "rgba(255,102,203,0.3)",
      critical: "rgba(255,69,0,0.5)",
      recovered: "rgba(0,220,0,0.3)",
      deaths: "rgba(250,0,0,0.3)",
    };
    this.data.datasets[0].backgroundColor = colors[target];
  },
};
