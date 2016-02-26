#WDI Project 3
Sugar-Rush is a dessert delivery application targeted towards young adults and late-night snackers. This business currently operates from 7pm to 3am everyday in three neighborhoods: Silverlake, Santa Monica, and North Hollywood. Can't decide between two restaurants? Don't worry, we got you! Sugar-Rush keeps an inventory of the most popular offerings of the hottest dessert joints in the greater Los Angeles area. Worried about security? Chill out! S-R uses venmo-authentication so all your personal info is safe and secure. Not hungry? ... switch to a different tab and come back in a couple hours.

Sugar-Rush is a group project for General Assembly's Web Development Immersive course. The assignment was to create a web application with an express framework that has crudable models, an API, and external authentication. In addition to having fulfilled the project requirements, Sugar Rush allows users to login/register, search through our restaurant database, and order items of varying quantities. Admins have access to both API databases and can create, edit, destroy restaurants and orders.

In future versions, Sugar-Rush will have driver profiles and will link orders to the drivers that will deliver them. It will also let users pay for orders through their linked venmo accounts. In addition, we plan to add geolocation and mobile support.


### The Team
* Edward Yu: [github](https://github.com/eboxyz) [website](http://www.edwardyu.xyz) [linkedin](http://www.linkedin.com/in/edward-yu-web-developer-a50250ba)
* Fran Budiman: [github](https://github.com/fbudiman) [website](http://www.franbudiman.com) [linkedin](http://www.linkedin.com/in/franbudiman)
* GaMaur Landrum: [github](https://github.com/Dragyn3652) [website](http://gamaur.com) [linkedin](http://www.linkedin.com/in/gamaur)
* Nick Castañeda: [github](https://github.com/nick-castaneda) [website](http://www.nick-castaneda.com) [linkedin](http://www.linkedin.com/in/nickpcastaneda)
* Thomas Choi: [github](https://github.com/blueeyess) [website](http://www.thomastaechoi.com) [linkedin](http://www.linkedin.com/in/tchoii)

### Links
A version of this application can be found on the Heroku website at [this address](http://sugar-rush.herokuapp.com/).

The Trello Board for this site can be found [here](https://trello.com/b/BZfTctKa/sugar-rush).

## Code Snippets
Passing dessert info from the restaurant page to the checkout page was one of the more difficult challenges of the project. Instead of storing the information into sessions, we passed data into client-side javascript and stored it into local storage.

1.The restaurants page, we loop through the each restaurant and sets a checkbox to each dessert with an ID of 

```
<%= restaurants[i].menu[j].item %>qxz<%= restaurants[i].name %>qxz<%= restaurants[i].menu[j].price %>qxz<%= restaurants[i].menu[j]._id %>qxz<%= restaurants[i].menu[j].img_url %>
```

2.In the script file, we grab the dessert data from the checkbox ids and store it into local storage.

~~~javascript
// Set a variable to the checkout button, to the array of all
// "add-to-cart" buttons, and to an empty order array
var checkout = document.getElementById('checkout');
var addToCartArr = document.getElementsByClassName("add-to-cart");
var orderArray = [];

// Loop through the add-to-cart buttons and have them listen for clicks
// When clicked, push the button's id (with the item info) to orderArray
// Allows for menu items to be un-checked
for(i=0; i<addToCartArr.length; i++){
  addToCartArr[i].addEventListener("change", function() {
    if (this.checked) {
      orderArray.push(this.id);
      console.log(this.id)
    } else {
      var x = orderArray.indexOf(this.id);
      orderArray.splice(x,1);
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
~~~

3.Next set up a handlebars template to render each dessert added to the site

~~~javascript
<script id="cart-item-template" type="text/x-handlebars-template">

  <!-- //Handlebar loop that throws each dessert in the temp below -->
  {{#each desserts}}

  <div class="cart-item">

    <!-- //Eventually replace with a food image ({{this.image}}) -->
    <div class="cart-item-img-div cart-vert-align">
      <img class="cart-item-img" src={{this.pic}}>
    </div>

    <!-- //Inserts the item and restaurant names -->
    <div class="cart-item-text cart-vert-align">
      <p class="cart-general-label"><a href="/restaurants" class="cart-rest-label">{{this.restaurant}}</a></p>
      <p class="cart-text-info">{{this.itemName}}</p>
    </div>

    <!-- //Inserts the item price -->
    <div class="cart-item-cost cart-vert-align">
      <p class="cart-general-label">Price</p>
      <p class="cart-text-info cart-price">{{this.price}}</p>
    </div>

    <!-- //Shows the form field for the quantity -->
    <div class="cart-item-amount cart-vert-align">
      <p class="cart-general-label cart-quant-label">Quantity</p>
      <select name="quant" class="btn btn-mini cart-shift-down">
        <option value=0 selected>0</option>
        <option value=1>1</option>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
        <option value=6>6</option>
        <option value=7>7</option>
        <option value=8>8</option>
        <option value=9>9</option>
        <option value=10>10</option>
        <option value=11>11</option>
        <option value=12>12</option>
        <option value=13>13</option>
        <option value=14>14</option>
        <option value=15>15</option>
        <option value=16>16</option>
        <option value=17>17</option>
        <option value=18>18</option>
        <option value=19>19</option>
        <option value=20>20</option>
      </select>
    </div>

    <!-- //Hidden field to store the id of the food item -->
    <input type="text" style="display: none" value={{this.itemId}}>
  </div>
  <hr class="cart-faded-hr">
  {{/each}}

</script>
~~~

4.Next go through the local storage and add the data to the handlebars template

~~~javascript
/////  Step 2 - Use local storage data to populate checkout form   /////

// Set context (handlebar var) to a empty array named desserts
// Split localstorage at the commas to get the info chunks
var context = { desserts: [] };
var storageString = localStorage.getItem("food").split(",")


// Loop through the info chunks, split them at "qxz" and save the array
// Push elements of the bainas array to context.desserts as an object.
for(i in storageString){
  var bainasArr = storageString[i].split("qxz");
  console.log(bainasArr[4]);
  context.desserts.push({
    "itemName": bainasArr[0],
    "restaurant": bainasArr[1],
    "price": bainasArr[2],
    "itemId": bainasArr[3],
    "pic": bainasArr[4]
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
~~~

5.When update_cart is clicked, go through the compiled html and grab the item ids and their quantities. Rewrite the array of objects so that you can pass it through the post form.

~~~javascript
// When the update button is clicked, two sets of action occur:
// First, the function sets an array to all the cart-item divs, set a
// counter to 0 and a str var to "". Loop through the cart-item divs
// adding the item id from the hidden input field, the quantity from the
// editable input fieldand, "qxz"s to make the str easy to split, and
// the counter at the end. Insert the str into the hidden "dessert"
// field and render the submit
// Second, vars are set for a total, the html elements that hold the
// item prices, and the elements that hold the quantity values. A loop
// grabs the inner html of the price divs, turns them into numbers, and
// mutiplies them by the values. Each produce is added to the total and
// the total prints to the screen
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
  document.getElementById('submit-button').style.display = "block";
  ///////
  var total = 0;
  var prices = document.getElementsByClassName("cart-price");
  var quants_divs = document.getElementsByClassName("cart-shift-down");
  for(i=0; i<prices.length; i++){
    var moneyString = prices[i].innerHTML;
    total += Number(moneyString.slice(1)) * quants_divs[i].value;
  }
  document.getElementById('cart-total-numb').innerHTML = "$" + total;
})
~~~


## Wire Frames
### Home Page
![Home Page](http://i.imgur.com/OWNDqX2.jpg)

### All Restaurants Page
![All Restaurants Page](http://i.imgur.com/CkzJzhJ.jpg)

### Profile Page
![Profile Page](http://i.imgur.com/eNCUXIG.jpg)

### Register Page
![Register Page](http://i.imgur.com/kQx7ekW.jpg)

## Technology
**Core Technologies** - Sugar-Rush is a MEN stack application. The framework is Express.js, the database is MongoDB, and the engine is Node.js

**Languages** - Sugar-Rush is written in Javascript, HTML, CSS. Handlebars.js.

**View Compilers** - The majority of Sugar-Rush is compiled through ejs, but the order

**Libraries** - Sugar-Rush utilizes Bootstrap, jQuery, and Parallax.

**NPM Dependencies** - Visit package.json for more info.

