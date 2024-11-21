const cart = [];

function addToCart(productId, productName, productPrice) {
    const quantityInput = document.getElementById(`quantity_${productId}`);
    const quantity = parseInt(quantityInput.value);
    
    if (quantity > 0) {
        cart.push({
            productId,
            productName,
            price: productPrice,
            quantity
        });

        updateCartUI();
        quantityInput.value = '';
    } else {
        alert('Cantidad no válida.');
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.productName} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);
    });
}

document.getElementById('checkout-btn').addEventListener('click', async () => {
    const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: cart })
    });
    
    const { id } = await response.json();
    
     // Reemplaza con tu clave pública de Stripe
    const stripe = Stripe('pk_test_51PYHlDRrK9uKI4kL0XW79DOiPlww0W9Fc7daClOFkETxgrqPblnXvgFRMBUValWlne0QyWdq0wqrpzFzLtm8b0lB00j6cV55zU');
    stripe.redirectToCheckout({ sessionId: id }).then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    });
});
