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
    if (head === "edit" ){
      cellEl.innerHTML = `
        <span class="icon has-text-info">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </span>`;
    } else if (head === "remove") {
      cellEl.innerHTML = `
        <span class="icon has-text-danger">
          <i class="fa fa-trash" aria-hidden="true"></i></span>
        </td>`;
    } else {
      cellEl.textContent = data[head];
    }
    rowEl.appendChild(cellEl);
  };
};

