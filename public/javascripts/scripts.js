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

// Define our data object
var context = {
  desserts: [] //DONT PUT SEMICOLON
};

var storageString = localStorage.getItem("food").split(",")
for(i in storageString){
  var bainasArr = storageString[i].split("qxz");
  context.desserts.push({
    "itemName": bainasArr[0],
    "restaurant": bainasArr[1],
    "price": bainasArr[2],
    "itemId": bainasArr[3]
  });
}


//////////////////////////////////////////////////////////////////

// Grab the template script
var theTemplateScript = document.getElementById("cart-item-template").innerHTML;

// Compile the template
var theTemplate = Handlebars.compile(theTemplateScript);
console.log(context);
// Pass our data to the template
var theCompiledHtml = theTemplate(context);

// Add the compiled html to the page
if(context.desserts[0]["itemName"].length >= 1){
  document.getElementById('content-placeholder').innerHTML = theCompiledHtml;
}


// PUT IN if/else statement blocking empty storage

document.getElementById('updateButton').addEventListener("click", function(){
  var cartItems = document.getElementsByClassName('cart-item');
  var toBeStringified = ""
  var counter = 0;
  for(i=0; i< cartItems.length; i++){
    counter ++;
    toBeStringified += cartItems[i].childNodes[9].childNodes[3].value;
    toBeStringified += "qxz";
    toBeStringified += cartItems[i].childNodes[7].childNodes[3].value;
    toBeStringified += "qxz";
  }
  toBeStringified += counter;
  document.getElementById('dessert').value = toBeStringified;
})
