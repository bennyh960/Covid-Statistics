export function updateNumericData(obj) {
  document.querySelector(".data-who").textContent = obj.name;
  document.querySelectorAll(".dataPerInput").forEach((numeric, idx) => {
    const objKeyArr = Object.keys(obj);
    const key = objKeyArr[idx];
    // console.log(objKeyArr);
    numeric.textContent = intToString(obj[key]);
  });

  console.log(obj);
}

function intToString(n) {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
}
