//---------------
// Comment
//  - coinPortfolio should really be a class


//  get saved coin profoliot from local storage
function getSavedCoinPortfolio() {
  let savedPortfolio = JSON.parse(localStorage.getItem('coinPortfolio'));
  return savedPortfolio? savedPortfolio : [];
};

// save coin portfolio to local storage
function saveCoinPortfolio(protfolio) {
  localStorage.setItem('coinPortfolio', JSON.stringify(protfolio)); 
};

// update coin portfolio 
function updateCoinPortfolio(coinPortfolio, coinData){
  let ids = coinPortfolio.map((coin) => (coin.id));
  if (ids.includes(coinData.id)){
    coinPortfolio.splice(ids.indexOf(coinData.id),1);
  }; 
  coinPortfolio.push(coinData);
};