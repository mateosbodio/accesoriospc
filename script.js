let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');

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

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});

let cart = [];

function addToCart(product, price) {
    cart.push({ product, price }); // Añadir producto al array del carrito
    updateCartUI(); // Actualizar la interfaz de usuario
}

function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar producto del array por índice
    updateCartUI(); // Actualizar la interfaz de usuario
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');

    cartItemsContainer.innerHTML = ''; // Limpiar el contenido previo
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.product} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price; // Sumar el precio al total
    });

    totalAmount.textContent = total.toFixed(2);
}