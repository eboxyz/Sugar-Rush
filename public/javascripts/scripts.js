

var addToCartArr = document.getElementsByClassName("add-to-cart");
var checkout = document.getElementById('checkout');
var orderArray = [];

for(i=0; i<addToCartArr.length; i++){
  addToCartArr[i].addEventListener("click", function(){
    orderArray.push(this.id);
  })
}

checkout.addEventListener("click", function(){
  localStorage.setItem("food", orderArray);
});


alert(localStorage.getItem("food"))
