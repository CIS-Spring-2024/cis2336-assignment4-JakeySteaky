const express = require('express');
const path = require('path');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('Frontend'));

let cartItems = [];

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

app.get('/menu', (req, res) => {
    res.json(menuData);
});

app.get('/cart', (req, res) => {
    res.json(cartItems);
});

app.post('/add-to-cart', (req, res) => {
    const itemId = parseInt(req.body.itemId);
    const selectedItem = menuData.find(item => item.id === itemId);
    if (selectedItem) {
        cartItems.push(selectedItem);
        res.status(200).json({ message: 'Item added to cart successfully' });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.delete('/remove-from-cart/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cartItems.splice(index, 1);
        res.status(200).json({ message: 'Item removed from cart successfully' });
    } else {
        res.status(404).json({ error: 'Item not found in cart' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
