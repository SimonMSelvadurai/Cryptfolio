// test data 
var coinPortfolio = [
  {
    id : "bitcoin",
    quantity: 0.1 
  },
  {
    id : "ethereum",
    quantity: 1.3
  },
  {
    id : "tether",
    quantity: 200
  },
  {
    id : "binancecoin",
    quantity: 1.3
  },
  {
    id : "cardano",
    quantity: 500
  }
];


let tableEl = document.querySelector('#coin-table')
generateCoinTable(coinPortfolio, tableEl);

