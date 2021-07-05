// display chart on screen
function displayChart(imgUrl) {
  let chartEl = document.querySelector('#chart-container');
  chartEl.innerHTML = `<img alt="Your coin portfolio" src="` + imgUrl + `">`
};