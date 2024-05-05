
const menuData = [
  { id: 1, name: "Grilled Cheese", image: "grilled-cheese.jpg", cost: 5},
  { id: 2, name: "Chicken Caesar Salad", image: "chicken-caesar-salad.jpg", cost: 7},
  { id: 3, name: "Cheeseburger", image: "burger.jpeg", cost: 5},
  { id: 4, name: "Chicken Wrap", image: "chicken-wrap.jpeg", cost: 5},
  { id: 5, name: "Margherita Pizza", image: "pizza.jpeg", cost: 10 },
  { id: 6, name: "Fried Chicken", image: "friedChk.jpeg" , cost: 7},
  { id: 7, name: "Fish and Chips", image: "fishAndChips.jpeg" , cost: 10},
  { id: 8, name: "Veggie Burger", image: "veggieBurger.jpeg", cost: 5 },
  { id: 9, name: "BBQ Ribs", image: "bbq.jpeg", cost: 10 },
  { id: 10, name: "Philly Cheesesteak", image: "philly.jpeg" , cost: 10},
  { id: 11, name: "Chicken Nuggets", image: "chkNugs.jpeg" , cost: 7},
  { id: 12, name: "Beef Burrito", image: "beefBur.jpeg", cost: 10 }
];





document.addEventListener("DOMContentLoaded", function() {
  function generateMenu() {
    var menuBox = document.getElementById("menuBox");
  
    menuData.forEach(item => {
      var menuItem = document.createElement("div");
      var textBox = document.createElement("div");
      var itemName = document.createElement("a");
      var itemCost = document.createElement("a");
      
      menuItem.classList.add("menuItem");
      
      itemName.textContent = item.name;
      itemCost.textContent = "$" + item.cost + ".00";

      textBox.appendChild(itemName);
      textBox.appendChild(itemCost);
      menuItem.appendChild(textBox);
      menuBox.appendChild(menuItem);

      menuItem.addEventListener('click', function() {
        addToCart(item);
      });
    });
  }

  generateMenu();

});

function toggleCart(){
  var cart = document.getElementsByClassName("cart")[0];
  var style = getComputedStyle(cart);
  if(style.width < "45"){
    cart.style.width = "45vw";
  }
  else {
    cart.style.width = "0vw";
  }
}

function addToCart(item){
  var cartBox = document.getElementById("cartBox");
  var cartItem = document.createElement("div");
  var textBox = document.createElement("div");
  var itemName = document.createElement("a");
  var itemCost = document.createElement("a");
  
  cartItem.classList.add("cartItem");

  itemName.textContent = item.name;
  itemCost.textContent = "$" + item.cost + ".00";

  textBox.appendChild(itemName);
  textBox.appendChild(itemCost);
  cartItem.appendChild(textBox);
  cartBox.appendChild(cartItem);
  updateTotalCost(item.cost);
}

function updateTotalCost(cost) {
  var totalCostElement = document.getElementById("totalCost");
  var currentTotal = parseFloat(totalCostElement.textContent.replace("$", ""));
  var newTotal = currentTotal + cost;
  totalCostElement.textContent = "$" + newTotal.toFixed(2);
}
