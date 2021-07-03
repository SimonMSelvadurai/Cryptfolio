// generate a table of coin hold with values
//  Arguments
//   - coinHolding: Array of objects with properties {id, quantity}
//  Note
//   - Object must have properties "id" and "quantity" in order to execute properly 
//   - The "id" is used to make an API call to CoinGecko. If it is misspell, the response 
//     will be null.
 
function generateCoinTable(coinHolding, table) {
  let queryUrl = generateCoinDataQueryString(coinHolding);
  getApi(queryUrl, (data) => onReceiveMarketData(data, coinHolding, table), (response) => (console.log(response.status)));
}

// generate query string
function generateCoinDataQueryString(coinHolding){
  let baseUrl = 'https://api.coingecko.com/api/v3';
  let marketPath = '/coins/markets';
  let vsCurrencyQuery = 'vs_currency=aud';
  let orderQuery = '&order=market_cap_desc';
  let perPageQuery = '&per_page=40';
  let pageQuery = '&page=1';
  let sparkLineQuery = '&sparkline=false';

  let coinStr = coinHolding.map((item) => (item.id)).join(',');
  let result = baseUrl + marketPath + '?' + vsCurrencyQuery + '&ids=' + coinStr ;
  result += orderQuery + perPageQuery + pageQuery + sparkLineQuery; 
  return result;
};

// call when recieve market data 
function onReceiveMarketData(data, coinHolding, table){
  if (data.length !== coinHolding.length) {  // check for id error
    logBadIds(data, coinHolding);
  };
  let tableData = generateTableData(data, coinHolding)
  displayTableData(table, tableData);
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
  result.symbol = item.symbol.toUpperCase();
  result.price = item['current_price'];
  result.value = (result.price * result.quantity).toFixed(2);
  return result;
};