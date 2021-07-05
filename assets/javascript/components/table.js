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
  let bodyEl = tableEl.querySelector('tbody');
  tableData.map((item) => (appendTableRow(bodyEl, item, heads)));
};

//get all the headers head
function getHeads(tableEl){
  return [...tableEl.querySelectorAll('th')].map((th) => (th.dataset.head));
};

// append row into table body based on data and headers
function appendTableRow(bodyEl, item, heads){
  let rowEl = document.createElement('tr');
  heads.map((head) => appendTableCell(rowEl, item, head));
  bodyEl.appendChild(rowEl);
};

// append cell to a row based on the data and header
function appendTableCell(rowEl, data, head) {
  let cellEl = document.createElement('td');
  if (head === "edit" ){
    cellEl.innerHTML = `
      <span class="icon has-text-info">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </span>`;
    cellEl.dataset.coin = data.id;
  } else if (head === "remove") {
    cellEl.innerHTML = `
      <span class="icon has-text-danger">
        <i class="fa fa-trash" aria-hidden="true"></i></span>
      </td>`;
    cellEl.dataset.coin = data.id;
  } else {
    cellEl.textContent = data[head];
  }
  rowEl.appendChild(cellEl);
};