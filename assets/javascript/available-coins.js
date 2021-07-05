let availableCoins = [];

function initAvailbleCoins(){
  let queryStr = 'https://api.coingecko.com/api/v3/coins/list';
  getApi(queryStr, (data) => (availableCoins = data), (response) => (console.log(response)));
};

function showResult(searchText){
  let liveResultEl = document.getElementById("live-coin-search");
  let containerEl = liveResultEl.querySelector('.container');

  if (containerEl) {containerEl.remove()};
  if (searchText.length ===0) { return }; // empty string

  // non-empty string
  let newContainerEl = document.createElement('div');
  newContainerEl.classList = 'container';

  availableCoins.filter(
      (coin) => (coin.name.toLowerCase().startsWith(searchText.toLowerCase()))
    ).slice(0,5)
    .sort((a,b) => (a.name.length - b.name.length))
    .map((coin) => appendSuggestion(coin, newContainerEl));
  
  liveResultEl.appendChild(newContainerEl);
}; 


function appendSuggestion(coin, appendTo) {
  let buttonEl = document.createElement('button');
  buttonEl.style.display = 'block';
  buttonEl.dataset.coin = coin.id;
  buttonEl.textContent = coin.name; 
  appendTo.appendChild(buttonEl);
};



initAvailbleCoins();