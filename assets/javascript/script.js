/*logic: a function that takes the user input data "id" and "quantity" from the form when the "submit" button is clicked
it then adds the item to the coinPortfolio array[] in the first position. I will try using "unshift" which adds the new
element to the start of the array and extends the array length by 1.*/


var id = document.getElementById("id")
var quantity = document.getElementById("quantity")




document.getElementById("submit-btn").addEventListener('click', addCoin);
function addCoin() {
    coinPortfolio.unshift({id: "id", quantity:"quantity"});
    console.log(coinPortfolio);
}



  