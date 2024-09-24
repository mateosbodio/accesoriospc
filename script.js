let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const cart = [];
const products = [{
        id: 1,
        name: "Auriculares Inalámbricos",
        price: 30.00,
        category: "celulares",
        image: "img/auricular.jpg",
    },
    {
        id: 2,
        name: "Cargador Rápido",
        price: 15.00,
        category: "celulares",
        image: "img/cargador.jpg",
    },
    {
        id: 3,
        name: "Teclado Mecánico",
        price: 50.00,
        category: "computadoras",
        image: "img/teclado.jpg",
    },
    {
        id: 4,
        name: "Mouse Gamer",
        price: 25.00,
        category: "computadoras",
        image: "img/mouse.jpg",
    }
];

function showSlide(index) {
    if (index >= items.length) currentIndex = 0;
    if (index < 0) currentIndex = items.length - 1;
    items.forEach((item, i) => {
        item.style.display = i === currentIndex ? 'block' : 'none';
    });
}

function moveCarousel(step) {
    currentIndex += step;
    showSlide(currentIndex);
}

function displayProducts() {
    const cellphonesContainer = document.getElementById('product-list-cellphones');
    const computersContainer = document.getElementById('product-list-computers');

    products.forEach(product => {
        const productHTML = `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <a href="#" class="btn" onclick="addToCart(${product.id})">Añadir al carrito</a>
            </div>
        `;
        if (product.category === "celulares") {
            cellphonesContainer.innerHTML += productHTML;
        } else {
            computersContainer.innerHTML += productHTML;
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartUI();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });

    totalAmount.textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
    displayProducts();
});