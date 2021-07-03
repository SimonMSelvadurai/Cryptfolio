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
var XXXXXXcoinPortfolio = [
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


// generate a table of coin hold with values
//  Arguments
//   - coinHolding: Array of objects with properties {id, quantity}
//  Note
//   - Object must have properties "id" and "quantity" in order to execute properly 
//   - The "id" is used to make an API call to CoinGecko. If it is misspell, the response will be null.
 
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
  if (data.length !== coinHolding.length) {  // check for id error
    logBadIds(data, coinHolding);
  };
  let tableData = generateTableData(data, coinHolding)
  displayTableData(tableData);
};

// log bad ids for checking
function logBadIds(data, coinHolding){
  let responseIds = data.map((item) => (item.id));
  let badIds = coinHolding.map((item) =>(item.id)).filter((item) => (!responseIds.includes(item)));
  console.log('The following coin IDs do not exist in CoinGecko database:');
  console.log(badIds);
};

// generate table data
function generateTableData(data, coinHolding) {
  return data.map((item) => generateCoinData(item, coinHolding));
};

// generate a row data
function generateCoinData(item, coinHolding) {
  let result = {};
  let coinData = coinHolding.filter((coin) => (coin.id === item.id))[0];
  result.id = item.id;
  result.quantity = coinData.quantity;
  result.name = item.name;
  result.symbol = item.symbol;
  result.price = item['current_price'];
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


generateCoinPortfolio(XXXXXXcoinPortfolio);

