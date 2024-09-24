// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    // Evento para el botón de compra
    document.getElementById('purchase-button').addEventListener('click', () => {
        completePurchase();
    });
});

let cart = [];
let total = 0;

// Función para mostrar productos
function displayProducts() {
    const products = [
        { id: 1, name: "Auriculares Inalámbricos", price: 30.00, category: "celulares", image: "img/auricular.jpg" },
        { id: 2, name: "Cargador Rápido", price: 15.00, category: "celulares", image: "img/cargador.jpg" },
        { id: 3, name: "Teclado Mecánico", price: 50.00, category: "computadoras", image: "img/teclado.jpg" },
        { id: 4, name: "Mouse Gamer", price: 25.00, category: "computadoras", image: "img/mouse.jpg" }
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
        { id: 1, name: "Auriculares Inalámbricos", price: 30.00 },
        { id: 2, name: "Cargador Rápido", price: 15.00 },
        { id: 3, name: "Teclado Mecánico", price: 50.00 },
        { id: 4, name: "Mouse Gamer", price: 25.00 }
    ];

    const product = products.find(p => p.id === productId);
    cart.push(product);
    total += product.price;
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiar carrito
    cart.forEach(item => {
        const cartItemHTML = `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    document.getElementById('total-amount').innerText = total.toFixed(2);
}

function completePurchase() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const shippingMethod = document.getElementById('shipping-method').value;
    let shippingCost = (shippingMethod === "standard") ? 5.00 : 10.00;

    const totalAmountWithShipping = total + shippingCost;

    document.getElementById('purchase-message').innerText = `Compra realizada con éxito! Total: $${totalAmountWithShipping.toFixed(2)}.`;

    // Limpiar carrito
    cart = [];
    total = 0;
    updateCartUI();
}