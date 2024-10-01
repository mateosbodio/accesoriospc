document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    const purchaseButton = document.getElementById('purchase-button');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', () => {
            completePurchase();
        });
    }

    document.querySelector('.prev').addEventListener('click', () => moveCarousel(-1));
    document.querySelector('.next').addEventListener('click', () => moveCarousel(1));
});

let cart = [];
let total = 0;

function displayProducts() {
    const products = [
        { id: 1, name: "Auriculares Inalámbricos", price: 30.00, category: "celulares", image: "img/Auriculares_Inalambrico.jpg" },
        { id: 2, name: "Cargador Rápido", price: 15.00, category: "celulares", image: "img/Cargador_Carga_Rapida.jpg" },
        { id: 3, name: "Teclado Mecánico", price: 50.00, category: "computadoras", image: "img/Teclado_Mecanico_Logitech_ProXG.jpg" },
        { id: 4, name: "Mouse Gamer", price: 25.00, category: "computadoras", image: "img/Mouse_Gamer_Logitech_G502.jpg" }
    ];

    products.forEach(product => {
        const productHTML = `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="btn" onclick="addToCart(${product.id})">Añadir al carrito</button>
            </div>
        `;
        if (product.category === "celulares") {
            document.getElementById('product-list-cellphones').innerHTML += productHTML;
        } else if (product.category === "computadoras") {
            document.getElementById('product-list-computers').innerHTML += productHTML;
        }
    });
}

function addToCart(productId) {
    const products = [
        { id: 1, name: "Auriculares Inalámbricos", price: 30.00, image: "img/Auriculares_Inalambrico.jpg" },
        { id: 2, name: "Cargador Rápido", price: 15.00, image: "img/Cargador_Carga_Rapida.jpg" },
        { id: 3, name: "Teclado Mecánico", price: 50.00, image: "img/Teclado_Mecanico_Logitech_ProXG.jpg" },
        { id: 4, name: "Mouse Gamer", price: 25.00, image: "img/Mouse_Gamer_Logitech_G502.jpg" }
    ];
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        total += product.price;
        updateCartUI();
    }
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
                <p>${item.name} - $${item.price.toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    document.getElementById('total-amount').innerText = `Total: $${total.toFixed(2)}`;
}

function completePurchase() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const shippingMethod = document.getElementById('shipping-method') ? document.getElementById('shipping-method').value : 'standard';
    let shippingCost = (shippingMethod === "standard") ? 5.00 : 10.00;
    const totalAmountWithShipping = total + shippingCost;
    document.getElementById('purchase-message').innerText = `Compra realizada con éxito! Total: $${totalAmountWithShipping.toFixed(2)}.`;

    cart = [];
    total = 0;
    updateCartUI();
}

let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    if (index >= items.length) currentIndex = 0;
    if (index < 0) currentIndex = items.length - 1;

    items.forEach((item, i) => {
        item.classList.remove('active');
        if (i === currentIndex) {
            item.classList.add('active');
        }
    });
}

function moveCarousel(step) {
    currentIndex += step;
    showSlide(currentIndex);
}