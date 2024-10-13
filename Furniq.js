let slide = document.querySelectorAll(".brand");
let cards = document.querySelectorAll(".card");
let bar = document.getElementById("bar");
let count = 0;


slide.forEach(function(slides, index) {
    slides.style.left = `${index * 100}%`;
});

function myFun() {
    slide.forEach(function(curVal) {
        curVal.style.transform = `translateX(-${count * 100}%)`;
    });
}

setInterval(function() {
    count++;
    if (count === slide.length) {
        count = 0;
    }
    myFun();
}, 2000);


bar.addEventListener("click", function() {
    document.querySelector("ul").classList.toggle("showData");
});


document.getElementById("home-btn").addEventListener("click", function() {
    const mainElement = document.querySelector(".main");
    if (mainElement) {
        mainElement.scrollIntoView({ behavior: "smooth" });
    }
});


document.getElementById("shopnow-btn").addEventListener("click", function() {
    const mainElement = document.querySelector(".head");
    if (mainElement) {
        mainElement.scrollIntoView({ behavior: "smooth" });
    }
});



let searchBtn = document.getElementById('search-btn');
let searchContainer = document.getElementById('search-container');

searchBtn.addEventListener('click', function() {
    if (searchContainer.style.display === 'none' || searchContainer.style.display === '') {
        searchContainer.style.display = 'block';
    } else {
        searchContainer.style.display = 'none';
    }
});


function search_furniture() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let items = document.getElementsByClassName('furniture-item');

    for (let i = 0; i < items.length; i++) {
        if (!items[i].innerHTML.toLowerCase().includes(input)) {
            items[i].style.display = "none";
        } else {
            items[i].style.display = "list-item";
        }
    }
}


let availableKeywords = [
    'Luxury Sofa',
    'Luxury Chair',
    'Dining Table',
    'Office Chair',
    'Computer Table',
];

const suggestionsContainer = document.getElementById("suggestions");
const inputBox = document.getElementById("searchbar");


inputBox.onkeyup = function() {
    let result = [];
    let input = inputBox.value;

    if (input.length) {
        result = availableKeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }
    display(result);

    if (!result.length) {
        suggestionsContainer.innerHTML = '';
    }
}

function display(result) {
    const content = result.map((list) => {
        return "<li onclick='selectInput(this)'>" + list + "</li>";
    }).join('');
    suggestionsContainer.innerHTML = content;
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    suggestionsContainer.innerHTML = ''; 
}



function searchProduct() {
    let input = document.getElementById('searchbar').value.toLowerCase(); 
    let cards = document.getElementsByClassName('card'); 
    let hasResults = false; 

    for (let i = 0; i < cards.length; i++) {
        let productName = cards[i].getElementsByTagName('h4')[0].innerText.toLowerCase(); 

        if (productName.includes(input)) {
            cards[i].style.display = 'block'; 
            hasResults = true; 
        } else {
            cards[i].style.display = 'none';
        }
    }

    if (hasResults) {
        document.getElementsByClassName('head')[0].scrollIntoView({ behavior: 'smooth' });
    }
}



let cartBtn = document.getElementById('cart-btn');
let cartContainer = document.querySelector('.cart-container');

cartBtn.addEventListener('click', function () {
    if (cartContainer.style.display === 'none' || cartContainer.style.display === '') {
        cartContainer.style.display = 'block'; 
    } else {
        cartContainer.style.display = 'none'; 
    }
});



let cartItems = document.getElementById('cart-items');
let subtotal = document.getElementById('subtotal');
let tax = document.getElementById('tax');
let total = document.getElementById('total');
let emptyCartMsg = document.getElementById('empty-cart-msg');

let products = [
    {
        id: 1,
        name: 'Luxury Sofa\'s',
        image: 'file:///E:/Wallpapers/sofa2.jpeg',
        price: 149999
    },
    {
        id: 2,
        name: 'Luxury Chair\'s',
        image: 'file:///E:/Wallpapers/chair2.jpeg',
        price: 49999
    },
    {
        id: 3,
        name: 'Luxury Dining Table\'s',
        image: 'file:///E:/Wallpapers/table3.jpeg',
        price: 69999
    },
    {
        id: 4,
        name: 'Luxury Sofa\'s',
        image: 'file:///E:/Wallpapers/sofa3.jpeg',
        price: 99999
    },
    {
        id: 5,
        name: 'Luxury Chair\'s',
        image: 'file:///E:/Wallpapers/chair3.jpeg',
        price: 39999
    },
    {
        id: 6,
        name: 'Luxury Dining Table\'s',
        image: 'file:///E:/Wallpapers/table1.jpeg',
        price: 49999
    },
    {
        id: 7,
        name: 'Office Sofa',
        image: 'file:///E:/Wallpapers/sofa1.jpeg',
        price: 99999
    },
    {
        id: 8,
        name: 'Study Table',
        image: 'file:///E:/Wallpapers/table2.jpeg',
        price: 49999
    },
    {
        id: 9,
        name: 'Luxury Chair',
        image: 'file:///E:/Wallpapers/chair1.jpeg',
        price: 149999
    }
];

let cartList = [];


function addToCart(index) {
    let product = products[index];
    let existingProduct = cartList.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cartList.push({ ...product, quantity: 1 });
    }
    reloadCart();
}


function reloadCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;

    if (cartList.length === 0) {
        emptyCartMsg.style.display = 'block'; 
    } else {
        emptyCartMsg.style.display = 'none'; 
    }

  
    cartList.forEach(item => {
        let itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;

      
        let listItem = document.createElement('div');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
            <img src="${item.image}" style="width: 80px"/>
            <h4>${item.name}</h4>
            <p>Price: ₹${item.price.toLocaleString()}</p>
            <div>
                <button onclick="changeQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        `;
        cartItems.appendChild(listItem);
    });

    
    subtotal.innerText = totalPrice.toLocaleString();
    let calculatedTax = totalPrice * 0.18;
    tax.innerText = calculatedTax.toLocaleString();
    total.innerText = (totalPrice + calculatedTax).toLocaleString();
}

function changeQuantity(id, quantity) {
    let product = cartList.find(item => item.id === id);

    if (quantity === 0) {
        cartList = cartList.filter(item => item.id !== id); // Remove item if quantity is 0
    } else {
        product.quantity = quantity;
    }
    reloadCart();
}

function clearCart() {
    cartList = []; // Empty the cart list
    reloadCart();  // Reload the cart and update UI
}

reloadCart();


document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.fa-cart-plus');
    const clearCartButton = document.getElementById('clear-cart'); 

    let cartItems = {};

    function updateCartCount() {
        let currentCount = Object.keys(cartItems).length; 
        cartCount.textContent = currentCount;

        if (currentCount > 0) {
            cartCount.style.display = 'block';
        } else {
            cartCount.style.display = 'none';
        }
    }

    function addToCart(productId) {
       
        if (cartItems[productId]) {
            cartItems[productId]++;
        } else {
            cartItems[productId] = 1;  
        }
        updateCartCount(); 
    }


    function checkItemQuantity(productId) {
        if (cartItems[productId] <= 0) {
            delete cartItems[productId]; 
            updateCartCount(); 
        }
    }

    function decrementQuantity(productId) {
        if (cartItems[productId]) {
            cartItems[productId]--; 
            checkItemQuantity(productId); 
        }
    }

    function clearCart() {
        cartItems = {}; 
        updateCartCount(); 
    }

    updateCartCount();

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => addToCart(index));
    });

    clearCartButton.addEventListener('click', clearCart);
});




let loginModal = document.querySelector('.modal'); // Changed from 'login' to 'loginModal'

let loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', function () {
    if (loginModal.style.display === 'none' || loginModal.style.display === '') {
        loginModal.style.display = 'block'; // Show the login modal
    } else {
        loginModal.style.display = 'none'; // Hide the login modal
    }
});



let users = JSON.parse(localStorage.getItem('users')) || [];

let loggedInUser = null;

const adminUsername = 'admin';
const adminPassword = 'admin123';

function login() { // No conflict now
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        loggedInUser = user;
        alert('Login successful');
        loginModal.style.display = 'none'; // Close login modal after successful login
    } else {
        alert('Invalid credentials');
    }
}

function register() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    if (users.some(u => u.username === username)) {
        alert('Username already exists');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful');
        document.getElementById('registerModal').style.display = 'none';
    }
}


document.getElementById('showRegister').onclick = function () {
    loginModal.style.display = 'none';
    document.getElementById('registerModal').style.display = 'block';
};

document.getElementById('showLogin').onclick = function () {
    document.getElementById('registerModal').style.display = 'none';
    loginModal.style.display = 'block';
};

function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === adminUsername && password === adminPassword) {
        alert('Admin login successful');
        adminModal.style.display = 'none'; // Close admin login modal
        productForm.style.display = 'block'; // Show "Add New Product" form
    } else {
        alert('Invalid admin credentials');
    }
}

document.getElementById('showAdminLogin').onclick = function () {
    loginModal.style.display = 'none';
    adminModal.style.display = 'block';
};

document.getElementById('showUserLogin').onclick = function () {
    adminModal.style.display = 'none';
    loginModal.style.display = 'block';
};

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const imageFile = document.getElementById('productImage').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageSrc = e.target.result; 
            console.log({ name, price, imageSrc });
            alert('Product added successfully');
            addProductModal.style.display = 'none'; 
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please choose an image');
    }
}



function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const imageFile = document.getElementById('productImage').files[0];

    // Ensure all fields are filled
    if (!name || !price || !imageFile) {
        alert('Please fill all required details.');
        return; 
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageSrc = e.target.result; 


        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name, price, imageSrc });
        localStorage.setItem('products', JSON.stringify(products));

        alert('Product added successfully');
        
        document.getElementById('productForm').style.display = 'none';

        displayProducts(); // Refresh product list after adding
    };
    reader.readAsDataURL(imageFile);
}

function displayProducts() {
    const productDisplay = document.getElementById('productDisplay');
    productDisplay.innerHTML = ''; // Clear the display before showing new list

    const products = JSON.parse(localStorage.getItem('products')) || [];
    if (products.length === 0) {
        productDisplay.innerHTML = '<p>No products added yet.</p>';
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
	
	    <h4>${product.name}</h4>
            <p>Price: $${product.price}</p>
            <img src="${product.imageSrc}" alt="${product.name}" style="width: 300px; height: 220px;">
        `;
        productDisplay.appendChild(productDiv);
    });
}


document.getElementById('addProductBtn').addEventListener('click', addProduct);

window.onload = function() {
    displayProducts();
};




let categoriesBtn = document.querySelector('li a[href="#categories"]');
let dropdown = document.createElement('ul');
dropdown.classList.add('dropdown');
dropdown.style.display = 'none'; 


let categories = ['Sofa', 'Chair', 'Table'];

categories.forEach(function (category) {
    let listItem = document.createElement('li');
    listItem.innerText = category;

    listItem.onclick = function () {
        filterByCategory(category.toLowerCase());
        dropdown.style.display = 'none';
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    };

    dropdown.appendChild(listItem);
});

categoriesBtn.parentElement.appendChild(dropdown);

categoriesBtn.onclick = function (event) {
    event.preventDefault(); 
    dropdown.style.display = (dropdown.style.display === 'none') ? 'block' : 'none';
};


function filterByCategory(category) {
    let cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        let productCategory = cards[i].id;

        cards[i].style.display = (productCategory === category) ? 'block' : 'none';
    }
}


