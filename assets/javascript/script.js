var coinPortfolio = [
];




//

// init page
function initPage(){
  let tableEl = document.querySelector('#coin-table')
  let clearFormBtn = document.querySelector('#clear-form-button');
  coinPortfolio = getSavedCoinPortfolio();
  generateCoinTable(coinPortfolio, tableEl);
  initAvailbleCoins();
  connectHandleClearForm(clearFormBtn);
}

initPage();