document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    const purchaseButton = document.getElementById('purchase-button');

    if (purchaseButton) {
        purchaseButton.addEventListener('click', completePurchase);
    }

    document.querySelector('.prev').addEventListener('click', () => moveCarousel(-1));
    document.querySelector('.next').addEventListener('click', () => moveCarousel(1));

    document.getElementById('carouselImage').src = images[currentIndex];
});

const products = [
    { id: 1, name: "Auriculares Inalámbricos", price: 30.00, category: "celulares", image: "img/Auriculares_Inalambrico.jpg" },
    { id: 2, name: "Cargador Rápido", price: 15.00, category: "celulares", image: "img/Cargador_Carga_Rapida.jpg" },
    { id: 3, name: "Teclado Mecánico", price: 45.00, category: "computadoras", image: "img/Teclado_Mecanico_Logitech_ProXG.jpg" },
    { id: 4, name: "Ratón Gamer", price: 25.00, category: "computadoras", image: "img/Mouse_Gamer_Logitech_G502.jpg" }
];

let cart = [];
let total = 0;
let currentIndex = 0;

const images = ["img/Carousel1.jpg", "img/Carousel2.jpg", "img/Carousel3.jpg", "img/Carousel4.jpg"];

function displayProducts() {
    products.forEach(product => {
        const productList = document.getElementById(`product-list-${product.category}`);
        if (productList) {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="btn">Agregar al Carrito</button>
            `;
            productList.appendChild(productDiv);
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `<span>${item.name} - $${item.price.toFixed(2)}</span>`;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });

    document.getElementById('total-amount').innerText = `$${total.toFixed(2)}`;
}

function completePurchase() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
    } else {
        alert(`Compra completada por un total de $${total.toFixed(2)}`);
        cart = [];
        updateCart();
    }
}

function moveCarousel(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    const carouselImage = document.getElementById('carouselImage');
    carouselImage.src = images[currentIndex];
    carouselImage.alt = `Imagen del carrusel ${currentIndex + 1}`;
}