var addToCartArr = document.getElementsByClassName("add-to-cart");
var checkout = document.getElementById('checkout');
var orderArray = [];
var searchButton = document.getElementById('search-button');
var searchBar = document.getElementById('search-bar');
var searchQuery = document.getElementsByClassName('all-restaurants');
var searchBy = document.getElementById('select-search');
var showRestButton = document.getElementById('show-rest');


//Allows for menu items to be un-checked
for(i=0; i<addToCartArr.length; i++){
  addToCartArr[i].addEventListener("change", function() {
    if (this.checked) {
      orderArray.push(this.id);
    } else {
      var x = orderArray.indexOf(this.id);
      orderArray.splice(x,1);
    }
  })
}

//Cheaters search Bar
if (searchButton) {
  searchButton.addEventListener("click", function() {

    showRestButton.style.display = 'block';

    if (searchBy.value == "restaurant") {
      for(i=0; i<searchQuery.length; i++) {
        var lowSearchQuery = searchQuery[i].id.toLowerCase();
        var lowSearchBar = searchBar.value.toLowerCase();

        if (lowSearchQuery.includes(lowSearchBar)) {
          searchQuery[i].style.display = 'block';
        } else {
          searchQuery[i].style.display = 'none';
        }
      }
    }
  })
}

if(addToCartArr.length > 1){ // change if
  checkout.addEventListener("click", function(){
    localStorage.setItem("food", orderArray);
    console.log(localStorage.getItem('food'));
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

document.getElementById('submitButton').addEventListener("click", function(){
  document.getElementById('dessert').value = JSON.stringify([{item: "afd", quantity: 6}]);
})
