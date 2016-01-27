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
  desserts: []
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

