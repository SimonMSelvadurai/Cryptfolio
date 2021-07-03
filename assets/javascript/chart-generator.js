
let data = {
  type: 'doughnut', 
  data: {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May'
    ], 
    datasets:[
      { 
        data: [
          50,
          60,
          70,
          180,
          190
        ]
      }
    ]
  },
  options: {
    plugins:{
      doughnutlabel:{
        labels:[
          {
            text:'550',
            font:{
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
};


function getChartQueryString(data){
  return 'https://quickchart.io/chart?c=' + convertToString(data)
}

function convertToString(obj) {
  // is array
  if (typeof(obj) === "object" && Array.isArray(obj)) {
    let entries = obj.map((item) => (convertToString(item)));
    return '[' + entries.join(',') + ']'
  } else if (typeof(obj) === 'object' ){ 
    // is object
    let entries = Object.entries(obj).map(([key, value]) => ( key + ':' + convertToString(value)))
    return '{' + entries.join(',') + '}';
  } else { 
    // everything else
    return JSON.stringify(obj).split('"').join("'");
  }
};

function goto(url) {
  document.location.href = url;
}

goto(getChartQueryString(data));


