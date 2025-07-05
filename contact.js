// Add to Cart functionality
let cartCount = 0;
const cartCountSpan = document.getElementById("cart-count");
const addToCartBtn = document.getElementById("add-to-cart-btn");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", function () {
    cartCount++;
    cartCountSpan.textContent = `Cart: ${cartCount}`;
    addToCartBtn.classList.add("added");
    setTimeout(() => addToCartBtn.classList.remove("added"), 300);
  });
}

// Prevent contact form submission (demo only)
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for contacting us! (Demo only, no message sent)");
    contactForm.reset();
  });
}
