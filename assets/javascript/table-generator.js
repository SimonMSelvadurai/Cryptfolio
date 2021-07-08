// generate a table of cryptos with their values in AUD
//  Arguments
//   - coinHolding: Array of objects with properties {id, quantity}
//   - table: table element to display the data
//  Note
//   - Object must have properties "id" and "quantity" in order to execute properly 
//   - Each "id" is used to make an API call to CoinGecko. If it is misspell, the response 
//     will be null.
 
function generateCoinTable(coinHolding, table) {
  if (coinHolding.length === 0) return;
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
    return;
  };
  // let tableData = generateTableData(data, coinHolding);
  updateCoinPortfolioWithMarketData(data, coinHolding);
  displayTableData(table, coinHolding);
  generateCoinChart(coinHolding);
};

// log bad ids for checking
function logBadIds(data, coinHolding){
  let responseIds = data.map((item) => (item.id));
  let badIds = coinHolding.map((item) =>(item.id)).filter((item) => (!responseIds.includes(item)));
  console.log('The following coin IDs do not exist in CoinGecko database:');
  console.log(badIds);
};

