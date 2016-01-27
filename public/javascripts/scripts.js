var addToCartArr = document.getElementsByClassName("add-to-cart");
var checkout = document.getElementById('checkout');
var orderArray = [];

for(i=0; i<addToCartArr.length; i++){
  addToCartArr[i].addEventListener("click", function(){
    orderArray.push(this.id);
  })
}

if(addToCartArr.length > 1){ // change if
  checkout.addEventListener("click", function(){
    localStorage.setItem("food", orderArray);
  });
};

var storageString =
var bainasArr = localStorage.getItem("food").split("qxz")

//////////////////////////////////////////////////////////////////

// Grab the template script
var theTemplateScript = document.getElementById("cart-item-template").innerHTML;

// Compile the template
var theTemplate = Handlebars.compile(theTemplateScript);
console.log(localStorage.getItem("food"));
// Define our data object
var context={
  "itemName": bainasArr[0],
  "restaurant": bainasArr[1],
  "price": bainasArr[2],
  "itemId": bainasArr[3]
};

// Pass our data to the template
var theCompiledHtml = theTemplate(context);

// Add the compiled html to the page
document.getElementById('content-placeholder').innerHTML = theCompiledHtml;


// PUT IN if/else statement blocking empty storage

