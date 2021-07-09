//------------------------------------
// 
// Render the table onto the screen
//  arguments:
//   - tableEl : <table> element - expect each <th> to have an attribute data-head
//   - Array of objects with the following properties
//      - id
//      - name
//      - price
//      - quantity
//      - symbol
//      - value

function displayTableData(tableEl, tableData){
  let heads = getHeads(tableEl);
  removeTableBody(tableEl);
  
  let newBodyEl = document.createElement('tbody');
  tableData.map((item) => (appendTableRow(newBodyEl, item, heads)));
  tableEl.appendChild(newBodyEl);

  // remove <tbody> from Table Element if exists
  function removeTableBody(tableEl) {
    let bodyEl = tableEl.querySelector('tbody');
    if (bodyEl) bodyEl.remove();   
  };

  //get all the headers head
  function getHeads(tableEl){
    return [...tableEl.querySelectorAll('th')].map((th) => (th.dataset.head));
  };

  // append row into table body based on data and headers
  function appendTableRow(bodyEl, item, heads){
    let rowEl = document.createElement('tr');
    rowEl.dataset.coin = item.id;
    heads.map((head) => appendTableCell(rowEl, item, head));
    bodyEl.appendChild(rowEl);
  };

  // append cell to a row based on the data and header
  function appendTableCell(rowEl, data, head) {
    let cellEl = document.createElement('td');
    
    // for remove button
    if (head === "remove") {
      cellEl.innerHTML = `
        <span class="icon has-text-danger">
          <i class="fa fa-trash" aria-hidden="true"></i></span>
        </td>`;
      cellEl.addEventListener('click', handleRemoveCoin);
    } else {
      cellEl.textContent = data[head];
    }

    // add class for them to disappear in mobile
    if (['remove'].includes(head)) cellEl.classList.add('is-hidden-touch');
    if (['price'].includes(head)) cellEl.classList.add('is-hidden-mobile');

    // text alignment
    if (['symbol', 'remove'].includes(head)) cellEl.classList.add('has-text-centered');
    if (['quantity', 'price', 'value'].includes(head)) cellEl.classList.add('has-text-right');

    rowEl.appendChild(cellEl);
  };


  // handle when the remove coin is clicked
  function handleRemoveCoin(event){
    event.preventDefault();
    let rowEl =  event.target.closest('tr');
    let coinId = rowEl.dataset.coin;

    rowEl.remove();
    removeCoin(coinPortfolio, coinId);
    saveCoinPortfolio(coinPortfolio);
    // displayTableData(document.querySelector('#coin-table'), coinPortfolio);
    generateCoinChart(coinPortfolio);
  };
};

