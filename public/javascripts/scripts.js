////////////////////////////////////////////////////////////////////////
//                             scripts.js                             //
////////////////////////////////////////////////////////////////////////

/////     Step 1 - Store dessert item info into local storage      /////

// Set a variable to the checkout button, to the array of all
// "add-to-cart" buttons, and to an empty order array
var checkout = document.getElementById('checkout');
var addToCartArr = document.getElementsByClassName("add-to-cart");
var orderArray = [];
var searchButton = document.getElementById('search-button');
var searchBar = document.getElementById('search-bar');
var searchQuery = document.getElementsByClassName('all-restaurants');
var searchBy = document.getElementById('select-search');
var showRestButton = document.getElementById('show-rest');


// Loop through the add-to-cart buttons and have them listen for clicks
// When clicked, push the button's id (with the item info) to orderArray
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

// When checkout is clicked, set the local storage item, "food", to
// the orderArray with the dessert item's info
if(addToCartArr.length > 1){
  checkout.addEventListener("click", function(){
    localStorage.setItem("food", orderArray);
    console.log(localStorage.getItem('food'));
  });
};



/////  Step 2 - Use local storage data to populate checkout form   /////

// Set context (handlebar var) to a empty array named desserts
// Split localstorage at the commas to get the info chunks
var context = { desserts: [] };
var storageString = localStorage.getItem("food").split(",")


// Loop through the info chunks, split them at "qxz" and save the array
// Push elements of the bainas array to context.desserts as an object.
for(i in storageString){
  var bainasArr = storageString[i].split("qxz");
  context.desserts.push({
    "itemName": bainasArr[0],
    "restaurant": bainasArr[1],
    "price": bainasArr[2],
    "itemId": bainasArr[3]
  });
}

// Grab the template script, compile it through handlebars, and insert
// the context (composed of dessert item info objects) into the template
var theTemplateScript = document.getElementById("cart-item-template").innerHTML;
var theTemplate = Handlebars.compile(theTemplateScript);
var theCompiledHtml = theTemplate(context);

// If there is a dessert, add the compiled html to div placeholder
if(context.desserts[0]["itemName"].length >= 1){
  document.getElementById('content-placeholder').innerHTML = theCompiledHtml;
}


/////  Step 3 - Use the compiled html to send data back to server  /////

// When the update button is clicked, set an array to all the cart-item
// divs, set a counter to 0 and a str var to "".
// Loop through the cart-item divs adding the item id from the hidden
// input field, the quantity from the editable input fieldand, "qxz"s
// to make the str easy to split, and the counter at the end.
// Insert the str into the hidden "dessert" field and render the submit
document.getElementById('updateButton').addEventListener("click", function(){
  var cartItems = document.getElementsByClassName('cart-item');
  var toBeStringified = ""
  var counter = 0;
  for(i=0; i< cartItems.length; i++){
    counter ++;
    toBeStringified += cartItems[i].childNodes[19].value;
    toBeStringified += "qxz";
    toBeStringified += cartItems[i].childNodes[15].childNodes[3].value;
    toBeStringified += "qxz";
  }
  toBeStringified += counter;
  document.getElementById('dessert').value = toBeStringified;
  document.getElementById('butt').style.display = "block";
})



// add a gate above
