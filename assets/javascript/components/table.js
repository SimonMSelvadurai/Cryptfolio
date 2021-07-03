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


function appendTableRow(bodyEl, item, heads){
  let rowEl = document.createElement('tr');
  heads.map((head) => appendTableCell(rowEl, item, head));
  bodyEl.appendChild(rowEl);
};


function appendTableCell(rowEl, item, head) {
  let cellEl = document.createElement('td');
  cellEl.textContent = item[head];
  rowEl.appendChild(cellEl);
};