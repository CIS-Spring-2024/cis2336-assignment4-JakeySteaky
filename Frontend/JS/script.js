document.addEventListener("DOMContentLoaded", function() {
    generateMenu();
    updateCart();
});

const baseURL = "http://localhost:3000";

function generateMenu() {
    var menuBox = document.getElementById("menuBox");
    menuBox.innerHTML = '';
    fetch(baseURL + '/menu')
    .then(res => res.json())
    .then(menuData => { 
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
    })
    .catch(error => console.error('Error fetching menu:', error));
}

function updateCart() {
    fetch(baseURL + '/cart')
        .then(response => response.json())
        .then(cartItems => {
            var cartBox = document.getElementById("cartBox");
            cartBox.innerHTML = '';

            cartItems.forEach(item => {
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

                cartItem.addEventListener('click', function() {
                    removeFromCart(item);
                });
            });

            var totalBox = document.getElementById("totalBox");
            totalBox.textContent = "Total: $" + getTotal(cartItems) + ".00";
        })
        .catch(error => console.error('Error fetching cart items:', error));
}

function getTotal(cartItems) {
    let total = 0;
    cartItems.forEach(item => {
        total += item.cost;
    });
    return total;
}

function addToCart(item) {
    console.log("add to cart started");
    fetch(baseURL + '/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: item.id }),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            updateCart();
        })
        .catch(error => console.error('Error adding item to cart:', error));
}

function removeFromCart(item) {
    fetch(baseURL + '/remove-from-cart/' + item.id, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to remove item from cart');
            }
        })
        .then(data => {
            updateCart();
        })
        .catch(error => console.error('Error removing item from cart:', error));
}

function toggleCart(){
    var cart = document.getElementsByClassName("cart")[0];
    if(cart.style.width !== "45vw"){
        cart.style.width = "45vw";
    }
    else {
        cart.style.width = "0";
    }
}
