// Cart functionality for pricing page
let cart = [];
let totalPrice = 0;

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  totalPrice += price;
  updateCartDisplay();
  showNotification(`${productName} added to cart!`);
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = `Cart: ${cart.length} items (₹${totalPrice})`;
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add cart display to the page
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const cartDisplay = document.createElement("div");
  cartDisplay.id = "cart-display";
  cartDisplay.innerHTML = `
        <div class="cart-info">
            <span id="cart-count">Cart: 0 items (₹0)</span>
            <button onclick="checkout()" class="checkout-btn">Checkout</button>
        </div>
    `;
  header.appendChild(cartDisplay);
});

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Redirect to payment page with cart data
  const cartData = encodeURIComponent(JSON.stringify(cart));
  window.location.href = `payment.html?cart=${cartData}`;
}

// Add styles for notification and cart display
const style = document.createElement("style");
style.innerHTML = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4f8cff;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
#cart-display {
    position: absolute;
    top: 1rem;
    right: 2rem;
    background: rgba(255,255,255,0.1);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
}
.cart-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.checkout-btn {
    background: #4f8cff;
    color: white;
    border: none;
    padding: 0.3rem 0.8rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
}
.checkout-btn:hover {
    background: #23272f;
}`;
document.head.appendChild(style);
