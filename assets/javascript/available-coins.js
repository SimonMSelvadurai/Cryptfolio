let availableCoins = [];

// Initialise the dropdown form to fill with coin list once get from coingecko
function initAvailbleCoins(){
  let queryStr = 'https://api.coingecko.com/api/v3/coins/list';
  getApi(queryStr, onReceiveCoinList, (response) => (console.log(response)));

  // to execute when receive a list of available coins from CoinGecko
  function onReceiveCoinList(data){ 
    let formEl = document.querySelector('#coin-holding-form');
    let coinInputEl = document.querySelector('#coin-input'); 

    availableCoins = data;
    autocomplete(coinInputEl, availableCoins);
    document.addEventListener('click', closeAllLists);
    connectHandleSubmitForm(formEl, availableCoins, coinPortfolio);
  };
};

// create autocomplete based on coin list
function autocomplete(inputEl, coinList) {
  let currentFocus;
  inputEl.addEventListener("input", handleTextChange);
  inputEl.addEventListener('keydown', handleKeyDown);

  // handle when the text in input changes
  function handleTextChange(event){
    let searchText = event.target.value;

    // close any already open lists of autocompleted values
    closeAllLists();
    if (!searchText) { return false;}  // empty searchtext
    currentFocus = -1;

    // non-empty string
    let newContainerEl = createAutocompleteListContainer(event.target.id);

    coinList.filter( 
      // matching starting text and get the top 5 entries
      (coin) => (coin.name.toLowerCase().startsWith(searchText.toLowerCase()))
    ).slice(0,5)
    .sort((a,b) => (a.name.length - b.name.length))
    .map((coin) => appendSuggestion(coin, searchText, newContainerEl))

    this.parentNode.appendChild(newContainerEl);
  };

  // create an autocomplete list container
  function createAutocompleteListContainer(id){
    let result = document.createElement('div');
    result.classList = 'autocomplete-items';
    result.setAttribute("id", id + "-autocomplete-list");
    result.addEventListener('click', handleCoinSelect)
    return result;
  };

  // handling when an autocomplete item is select => fill in the input
  function handleCoinSelect(event){
    event.preventDefault();
    let itemEl = event.target.closest('div');
    let inputEl = itemEl.closest('.autocomplete').querySelector('input');
    inputEl.value = itemEl.dataset.coin;
    closeAllLists();
  }

  // append autocomplete item to a container;
  function appendSuggestion(coin, inBold, appendTo){
    let el = document.createElement('div');
    el.innerHTML = "<strong>" + coin.name.slice(0, inBold.length) + "</strong>" 
    el.innerHTML += coin.name.slice(inBold.length);
    el.dataset.coin = coin.name;
    appendTo.appendChild(el);
  };

  // handle when a key on keyboard is pressed
  function handleKeyDown(event){
    let itemEls;
    let containerEl = event.target.nextElementSibling;
    if (containerEl) {itemEls = containerEl.querySelectorAll('div');};

    if (event.key === 'ArrowDown') { 
      currentFocus++;
      addActive(itemEls, currentFocus);
      return ;
    };

    if (event.key === 'ArrowUp') { 
      currentFocus--;
      addActive(itemEls, currentFocus);
      return ;
    };

    if (event.key === 'Enter') { 
      event.preventDefault();
      if (currentFocus > -1 && itemEls) {
        let inputEl = event.target;
        inputEl.value = itemEls[currentFocus].dataset.coin;
        closeAllLists();
      };
      return ;
    };

    function addActive(els){
      if (!els) return false;
      removeActive(els);
      if (currentFocus >= els.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      // add class "autocomplete-active"
      els[currentFocus].classList.add('autocomplete-active');
    };

    function removeActive(els){
      [...els].map((el) => (el.classList.remove('autocomplete-active')));
    };
  };
};

// close all autocomplete lists in the document
function closeAllLists() {
  var x = document.querySelectorAll(".autocomplete-items");
  for (node of x) {
    node.remove();
  };
};
