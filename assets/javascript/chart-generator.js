
const queryTemplate = {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [],
      },
    ],
    labels: [],
  },
  options: {
    title: {
      display: true,
      text: 'Coin Portfolio',
    },
    plugins: {
      datalabels: {
        display: false,
      },
      doughnutlabel:{
        labels:[
          {
            text:'550',
            font: {
              size:20
            }
          },
          {
            text:'total'
          }
        ]
      }
    }
  }
}

// deep clone an object - no reference will be create between the original and the new one
function deepCloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
};


// generate chart query string for Quick Chart 
function getChartQueryString(coinProfolio){
  let names = coinProfolio.map((coin) => (coin.name));
  let values = coinProfolio.map((coin) => (coin.value));
  let result = deepCloneObject(queryTemplate);   

  result.data.datasets[0].data = values;
  result.data.labels = names;
  result.options.plugins.doughnutlabel.labels[0].text = values.reduce((sum, value) => (sum + parseFloat(value)), 0).toFixed(2);
  result = 'https://quickchart.io/chart?c=' + convertToString(result);
  result += '&w=300&h=500';
  return result;
}

// convert object, array, function, and other to text of the format: (differ to JSON.stringify)
//  {property:'value'}
function convertToString(obj) {
  // is array
  if (typeof(obj) === "object" && Array.isArray(obj)) {
    let entries = obj.map((item) => (convertToString(item)));
    return '[' + entries.join(',') + ']'
  }
  
  // is object
  if (typeof(obj) === 'object' ){ 
    let entries = Object.entries(obj).map(([key, value]) => (key + ':' + convertToString(value)))
    return '{' + entries.join(',') + '}';
  } 

  // is function
  // ...

  // everything else
  return JSON.stringify(obj).split('"').join("'");
};

// generate coin chart
function generateCoinChart(coinProfolio){
  let queryStr = getChartQueryString(coinProfolio);
  displayChart(queryStr);
};


