// function updateNumericData(confirmed) {
//   document.getElementById("confirm-stats").textContent = confirmed;
//   document.getElementById("critical-stats").textContent = confirmed;
//   document.getElementById("recoverd-stats").textContent = confirmed;
//   document.getElementById("death-stats").textContent = confirmed;
//   document.getElementById("newCases-stats").textContent = confirmed;
//   document.getElementById("newDeath-stats").textContent = confirmed;
// }
function updateNumericData(confirmed) {
  document.querySelectorAll(".dataPerInput").forEach((numeric) => {
    numeric.textContent = "xy";
  });
}
