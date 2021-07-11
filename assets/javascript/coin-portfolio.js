//---------------
// Comment
//  - coinPortfolio should really be a class


//  get saved coin profoliot from local storage
function getSavedCoinPortfolio() {
  let savedPortfolio = JSON.parse(localStorage.getItem('coinPortfolio'));
  return savedPortfolio? savedPortfolio : [];
};

// save coin portfolio to local storage
function saveCoinPortfolio(portfolio) {
  localStorage.setItem('coinPortfolio', JSON.stringify(portfolio)); 
};

// update coin portfolio 
function updateCoinPortfolio(coinPortfolio, coinData){
  removeCoin(coinPortfolio, coinData.id);
  coinPortfolio.push(coinData);
};

// update coin portfolio with new coinGecko market data
function updateCoinPortfolioWithMarketData(coinGeckoData, coinHolding) {
  coinHolding.map((coin) => (updateCoinWithMarketData(coinGeckoData, coin)));

  // update individual coin with new new coinGecko market data
  function updateCoinWithMarketData(coinGeckoData, coin) {
    let coinData = coinGeckoData.filter((item) => (item.id === coin.id))[0];
    coin.name = coinData.name;
    coin.symbol = coinData.symbol.toUpperCase();
    coin.price = coinData['current_price'];
    coin.value = (coin.price * coin.quantity).toFixed(2);
  };
};

// remove a coin from coin portfolio 
function removeCoin(coinPortfolio, id){
  let ids = coinPortfolio.map((coin) => (coin.id));
  if (ids.includes(id)){ // check if id is in the portfolio
    coinPortfolio.splice(ids.indexOf(id),1);
  }; 
};