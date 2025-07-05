// Payment page functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get cart data from localStorage or URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const cartData = urlParams.get("cart");

  if (cartData) {
    try {
      const cart = JSON.parse(decodeURIComponent(cartData));
      displayOrderSummary(cart);
    } catch (e) {
      console.error("Error parsing cart data:", e);
      displayOrderSummary([]);
    }
  } else {
    displayOrderSummary([]);
  }

  // Handle payment method switching
  const paymentMethods = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );
  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      showPaymentDetails(this.value);
    });
  });

  // Handle form submission
  const paymentForm = document.getElementById("payment-form");
  paymentForm.addEventListener("submit", handlePayment);

  // Format card number input
  const cardNumberInput = document.querySelector('input[name="cardNumber"]');
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", formatCardNumber);
  }

  // Format expiry date input
  const expiryInput = document.querySelector('input[name="expiry"]');
  if (expiryInput) {
    expiryInput.addEventListener("input", formatExpiry);
  }
});

function displayOrderSummary(cart) {
  const orderItems = document.getElementById("order-items");
  const totalAmount = document.getElementById("total-amount");
  const payAmount = document.getElementById("pay-amount");

  let total = 0;
  let itemsHtml = "";

  if (cart.length === 0) {
    itemsHtml = "<p>No items in cart</p>";
  } else {
    cart.forEach((item) => {
      total += item.price;
      itemsHtml += `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                </div>
            `;
    });
  }

  orderItems.innerHTML = itemsHtml;
  totalAmount.textContent = total;
  payAmount.textContent = total;
}

function showPaymentDetails(method) {
  // Hide all payment detail sections
  const details = document.querySelectorAll(".payment-details");
  details.forEach((detail) => (detail.style.display = "none"));

  // Show the selected payment method details
  switch (method) {
    case "card":
      document.getElementById("card-details").style.display = "block";
      break;
    case "upi":
      document.getElementById("upi-details").style.display = "block";
      break;
    case "netbanking":
      document.getElementById("netbanking-details").style.display = "block";
      break;
  }
}

function formatCardNumber(e) {
  let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
  e.target.value = formattedValue;
}

function formatExpiry(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length >= 2) {
    value = value.substring(0, 2) + "/" + value.substring(2, 4);
  }
  e.target.value = value;
}

function handlePayment(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const paymentMethod = formData.get("paymentMethod");

  // Basic validation
  if (paymentMethod === "card") {
    const cardNumber = formData.get("cardNumber").replace(/\s/g, "");
    const expiry = formData.get("expiry");
    const cvv = formData.get("cvv");

    if (cardNumber.length !== 16) {
      alert("Please enter a valid 16-digit card number");
      return;
    }
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      alert("Please enter expiry date in MM/YY format");
      return;
    }
    if (cvv.length !== 3) {
      alert("Please enter a valid 3-digit CVV");
      return;
    }
  }

  if (paymentMethod === "upi") {
    const upiId = formData.get("upiId");
    if (!upiId.includes("@")) {
      alert("Please enter a valid UPI ID");
      return;
    }
  }

  if (paymentMethod === "netbanking") {
    const bank = formData.get("bank");
    if (!bank) {
      alert("Please select a bank");
      return;
    }
  }

  // Show payment processing
  const payBtn = document.querySelector(".pay-btn");
  const originalText = payBtn.innerHTML;
  payBtn.innerHTML = "Processing Payment...";
  payBtn.disabled = true;

  // Simulate payment processing
  setTimeout(() => {
    alert(
      "Payment successful! Your order has been placed. You will receive a confirmation email shortly."
    );
    // Clear cart and redirect to home
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  }, 2000);
}

// Add styles for payment page
const style = document.createElement("style");
style.innerHTML = `
.payment-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.order-summary {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    height: fit-content;
    border: 1px solid #e0e7ef;
}

.order-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e0e7ef;
}

.total {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #4f8cff;
    font-size: 1.2rem;
}

.payment-form-container {
    background: #fff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(60,60,60,0.08);
    border: 1px solid #e0e7ef;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #23272f;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #cfd8e3;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.payment-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
}

.payment-option {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 2px solid #e0e7ef;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.3s;
}

.payment-option:hover {
    border-color: #4f8cff;
}

.payment-option input[type="radio"] {
    margin-right: 1rem;
}

.option-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.option-icon {
    font-size: 1.5rem;
}

.pay-btn {
    background: #4f8cff;
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    width: 100%;
    margin-top: 1rem;
    transition: background 0.3s;
}

.pay-btn:hover:not(:disabled) {
    background: #23272f;
}

.pay-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .payment-container {
        grid-template-columns: 1fr;
    }
    .form-row {
        grid-template-columns: 1fr;
    }
}`;
document.head.appendChild(style);
