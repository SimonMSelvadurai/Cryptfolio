// util function to get api
//  arguments
//   - url: string - url to call
//   - callback: function (data) => (..) - to call when the return response is ok 
//   - handleBadResponse: function (response) - to call when the return response is not ok

function getApi(url, callback, handleBadResponse) {
  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then(callback);
    } else {
      handleBadResponse(response); 
    }
  }).catch((error) => {
      console.error('Error:', error);
  });
};

