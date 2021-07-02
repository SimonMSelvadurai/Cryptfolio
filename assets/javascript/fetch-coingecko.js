var baseUrl = 'https://api.coingecko.com/api/v3';
var pricePath = '/simple/price';
var vsCurrenciesPath = '/simple/supported_vs_currencies';
var marketPath = '/coins/markets';
var vsCurrencyQuery = 'vs_currency=aud';
var orderQuery = '&order=market_cap_desc';
var perPageQuery = '&per_page=40';
var pageQuery = '&page=1';
var sparkLineQuery = '&sparkline=false';

// test data 
var coinHolding = [
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

// util function to get api
function getApi(url, callback, handleError) {
  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then(callback);
    } else {
      handleError(response); 
    }
  }).catch((error) => {
      console.error('Error:', error);
  });
};

// generate a table of coin hold with values
function generateCoinPortfolio(coinHolding) {
  let queryUrl = generateQueryString(coinHolding);
  getApi(queryUrl, (data) => onReceiveMarketData(data, coinHolding), (response) => (console.log(response.status)));
}

// generate query string
function generateQueryString(coinHolding){
  let coinStr = coinHolding.map((item) => (item.id)).join(',');
  let result = baseUrl + marketPath + '?' + vsCurrencyQuery + '&ids=' + coinStr ;
  result += orderQuery + perPageQuery + pageQuery + sparkLineQuery; 
  return result;
};

// call when recieve market data 
function onReceiveMarketData(data, coinHolding){
  let tableData = generateTableData(data, coinHolding)
  displayTableData(tableData);
};

// generate table data
function generateTableData(data, coinHolding) {
  return coinHolding.map((coin) => generateCoinData(data, coin));
};

// generate a row data
function generateCoinData(data, coin) {
  let result = {};
  let coinData = data.filter((item) => (item.id === coin.id))[0];
  result.id = coin.id;
  result.quantity = coin.quantity;
  result.name = coinData.name;
  result.symbol = coinData.symbol;
  result.price = coinData['current_price'];
  result.value = result.price * result.quantity;
  return result;
};

//------------------------------------
// TODO
// display table data
function displayTableData(tableData){
  console.log(tableData)
};
//-------------------------------------

generateCoinPortfolio(coinHolding);

