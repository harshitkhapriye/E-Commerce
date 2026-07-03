// ===============================
// SHOE CAROUSEL + CART SYSTEM
// ===============================

// ---------- CAROUSEL SETUP ----------
const cards = document.querySelectorAll(".card");

let currentIndex = 1;
let interval;

// ---------- CART ----------
let cart = [];
let total = 0;

// ---------- INIT ----------
function init() {
    updateCarousel();
    startAutoSlide();
}

// ---------- UPDATE CAROUSEL ----------
function updateCarousel() {

    cards.forEach(card => {
        card.classList.remove("left", "active", "right");
    });

    const totalCards = cards.length;

    const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
    const rightIndex = (currentIndex + 1) % totalCards;

    cards[leftIndex].classList.add("left");
    cards[currentIndex].classList.add("active");
    cards[rightIndex].classList.add("right");

    attachHoverPause(); // IMPORTANT for pause on center card
}

// ---------- AUTO SLIDE ----------
function autoSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
}

// ---------- START / STOP ----------
function startAutoSlide() {
    interval = setInterval(autoSlide, 2000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

// ---------- HOVER PAUSE (CENTER CARD ONLY) ----------
function attachHoverPause() {

    const activeCard = document.querySelector(".card.active");

    // remove old listeners (prevents stacking)
    activeCard.onmouseenter = stopAutoSlide;
    activeCard.onmouseleave = startAutoSlide;
}

// ---------- CART FUNCTION ----------
function addToCart(name, price) {

    cart.push({ name, price });
    total += price;

    renderCart();
}

// ---------- RENDER CART ----------
function renderCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <p>${item.name} - $${item.price}</p>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.innerText = total;
}

// ---------- MANUAL CART OPEN/CLOSE (OPTIONAL UX) ----------
function toggleCart() {
    const panel = document.getElementById("cartPanel");
    if (panel) {
        panel.classList.toggle("show");
    }
}

// ---------- RUN ----------
init();
