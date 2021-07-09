

function handleSubmitForm(event, coinList, coinPortfolio){
  event.preventDefault();
  let formEl = event.target;
  let coinInputEl = formEl.querySelector('#coin-input');
  clearAllWarnings(formEl);

  let inputs = getFormInputs();
  if (inputs.name === null || inputs.quantity === null) return; // empty entries
  
  inputs.id = getCoinId(inputs.name, coinList);
  if (inputs.id === null){ // if the input is not in our database
    showWarning(coinInputEl,'This coin does not exist in our database!');
    return;
  };

  updateCoinPortfolio(coinPortfolio, inputs);
  saveCoinPortfolio(coinPortfolio);

  let tableEl = document.querySelector('#coin-table');
  generateCoinTable(coinPortfolio, tableEl);
  clearForm(formEl);
  
  

  // get form inputs
  function getFormInputs() {
    let inputEls = formEl.querySelectorAll('input');
    let result = {};
    [...inputEls].map((inputEl) => parseInputData(inputEl,result));
    return result;
  };

  // get input data and do an early check
  function parseInputData(inputEl, parseTo){
    let inputType = inputEl.dataset.inputType;
    let prop = inputEl.name.split('-')[1];
    let value = inputEl.value;
    parseTo[prop] = value;

    // empty input
    if (!value) {
      showWarning(inputEl,'The field cannot be empty!')
      parseTo[prop] = null;
      return;
    }; 

    // wrong type
    if (inputType === 'number' && isNaN(value)) {
        showWarning(inputEl,'The field must be a number!')
        parseTo[prop] = null;
        return;
    };

  };

  // get coin id from coin list
  function getCoinId(coinName, coinList){
    let coinData = coinList.filter((coin) => (coin.name === coinName))[0];
    return coinData ? coinData.id : null;
  };

  // show warning
  function showWarning(inputEl, message){
    inputEl.closest('.field').querySelector('p.help').textContent = message
  };

  // clear warning 
  function clearAllWarnings(formEl){
    let warningEls = [...formEl.querySelectorAll('p.help')];
    warningEls.map((el) => (el.textContent = ""));
  };
};

// clear form
function clearForm(formEl){
  let inputEls = [...formEl.querySelectorAll('input')];
  inputEls.map((el) => (el.value = ''));
};


// handle when clear button is clicked
function handleClearForm(event){
  event.preventDefault();
  let formEl = event.target.closest('form');
  clearForm(formEl);
};


// connect form submission handling to a form
function connectHandleSubmitForm(formEl, coinList, coinPortfolio){
  formEl.addEventListener('submit', (event) => handleSubmitForm(event, coinList, coinPortfolio));
};

// connect form clearing handling to a form
function connectHandleClearForm(button){
  button.addEventListener('click', handleClearForm);
};