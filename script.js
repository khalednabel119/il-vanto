/* script.js - il vanto ecommerce (Updated & Optimized) */

// -------------------------
// GLOBAL STATE
// -------------------------
const State = {
    products: typeof productsData !== "undefined" ? productsData : [],
    cart: JSON.parse(localStorage.getItem("ilvanto_cart")) || [],
    user: JSON.parse(localStorage.getItem("ilvanto_session")) || null,
    users: JSON.parse(localStorage.getItem("ilvanto_users")) || []
};

// -------------------------
// HELPERS
// -------------------------
const formatPrice = (p) => `$${Number(p).toFixed(2)}`;

const saveCart = () => {
    localStorage.setItem("ilvanto_cart", JSON.stringify(State.cart));
    updateCartCount();
};

const showToast = (msg) => {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
};

function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// -------------------------
// INIT APPLICATION
// -------------------------
function initApp() {
    updateCartCount();
    updateUserNav();

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger) {
        hamburger.addEventListener("click", () =>
            navLinks.classList.toggle("active")
        );
    }

    const path = window.location.pathname;

    if (path.endsWith("index.html") || path.endsWith("/")) {
        initHome();
    } else if (path.includes("product.html")) {
        initProductDetail();
    } else if (path.includes("cart.html")) {
        initCart();
    } else if (path.includes("auth.html")) {
        initAuth();
    } else if (path.includes("checkout.html")) {
        // Checkout page logic is in checkout.html itself
    } else if (path.includes("tracking.html")) {
        // Tracking page logic is in tracking.html itself
    }
}

// -------------------------
// USER NAVBAR (WITH GREETING)
// -------------------------
function updateUserNav() {
    const authLink = document.getElementById("auth-link");
    const logoutBtn = document.getElementById("logout-btn");
    const greeting = document.getElementById("user-greeting");

    if (!authLink || !logoutBtn || !greeting) return;

    if (State.user) {
        // Show greeting
        greeting.textContent = `Hello, ${State.user.name}`;
        greeting.style.display = "inline-block";

        authLink.style.display = "none";
        logoutBtn.style.display = "inline-block";

        logoutBtn.onclick = () => {
            localStorage.removeItem("ilvanto_session");
            window.location.reload();
        };
    } else {
        greeting.style.display = "none";
        authLink.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
}

// -------------------------
// CART COUNT BADGE
// -------------------------
function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;

    const count = State.cart.reduce((s, i) => s + i.qty, 0);
    badge.textContent = count;
}

// -------------------------
// ADD TO CART
// -------------------------
function addToCart(productId, qty = 1) {
    const product = State.products.find((p) => p.id === Number(productId));
    if (!product) return;

    const existing = State.cart.find((i) => i.id === product.id);

    if (existing) existing.qty += qty;
    else State.cart.push({ ...product, qty });

    saveCart();
    showToast(`${product.title} added to cart`);
}

// -------------------------
// HOME PAGE
// -------------------------
function initHome() {
    const grid = document.getElementById("product-grid");
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");
    const tabs = document.querySelectorAll(".tab-btn");

    if (!grid) return;

    let currentCategory = "all";

    const render = (list) => {
        grid.innerHTML = list
            .map(
                (p) => `
            <article class="product-card">
                <a href="product.html?id=${p.id}">
                    <div class="card-image">
                        ${p.oldPrice ? `<span class="badge">Sale</span>` : ""}
                        ${p.tags.includes("new") ? `<span class="badge new">New</span>` : ""}
                        <img src="${p.image}" alt="${p.title}">

                        <button class="quick-add-btn" data-id="${p.id}">
                            Add
                        </button>
                    </div>

                    <div class="card-info">
                        <div class="card-meta">
                            <span>${p.category}</span>
                            <div class="prices">
                                ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}
                                <span class="card-price">${formatPrice(p.price)}</span>
                            </div>
                        </div>
                        <h3>${p.title}</h3>
                    </div>
                </a>
            </article>`
            )
            .join("");
    };

    const filterProducts = () => {
        let list = [...State.products];

        if (currentCategory !== "all") {
            if (currentCategory === "trending")
                list = list.filter((p) => p.tags.includes("trending"));
            else
                list = list.filter((p) => p.category === currentCategory);
        }

        const term = searchInput.value.toLowerCase();
        if (term) {
            list = list.filter((p) =>
                p.title.toLowerCase().includes(term.trim())
            );
        }

        const sort = sortSelect.value;
        if (sort === "low-high") list.sort((a, b) => a.price - b.price);
        if (sort === "high-low") list.sort((a, b) => b.price - a.price);
        if (sort === "newest") list.sort((a, b) => b.id - a.id);

        render(list);
    };

    tabs.forEach((tab) =>
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            currentCategory = tab.dataset.category;
            filterProducts();
        })
    );

    searchInput.addEventListener("input", debounce(filterProducts));
    sortSelect.addEventListener("change", filterProducts);

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("quick-add-btn")) {
            const id = e.target.dataset.id;
            addToCart(id);
        }
    });

    render(State.products);
}

// -------------------------
// PRODUCT DETAILS
// -------------------------
function initProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const product = State.products.find((p) => p.id === id);
    if (!product) return (window.location.href = "index.html");

    document.getElementById("detail-img").src = product.image;
    document.getElementById("detail-title").textContent = product.title;

    document.getElementById("detail-price").innerHTML = `
        ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ""}
        ${formatPrice(product.price)}
    `;

    document.getElementById("detail-desc").textContent = product.description;
    document.getElementById("detail-sku").textContent = `SKU: ILV-${String(
        product.id
    ).padStart(4, "0")}`;

    document
        .getElementById("add-to-cart-btn")
        .addEventListener("click", () => {
            const qty = Number(document.getElementById("qty-input").value);
            addToCart(product.id, qty);
        });
        const colorChoices = document.querySelectorAll('.color-choice');

colorChoices.forEach(choice => {
  choice.addEventListener('click', () => {
    colorChoices.forEach(c => c.classList.remove('selected'));
    choice.classList.add('selected');
    const selectedColor = choice.getAttribute('data-color');
    console.log('Selected color:', selectedColor);
    // You can use selectedColor for cart logic or display updates
  });
});

}

// -------------------------
// CART PAGE
// -------------------------
function initCart() {
    const container = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    // Render cart items
    const render = () => {
        const cart = State.cart || JSON.parse(localStorage.getItem("ilvanto_cart")) || [];

        if (cart.length === 0) {
            container.innerHTML = "<p>Your cart is empty.</p>";
            subtotalEl.textContent = "$0.00";
            totalEl.textContent = "$0.00";
            return;
        }

        let subtotal = 0;

        container.innerHTML = cart
            .map((item, index) => {
                const itemTotal = item.price * item.qty;
                subtotal += itemTotal;

                return `
                    <div class="cart-item">
                        <img src="${item.image}" class="cart-thumb">
                        <div class="cart-details">
                            <h4>${item.title}</h4>
                            <p>${formatPrice(item.price)}</p>
                        </div>
                        <div class="cart-actions">
                            <button class="qty-btn" data-i="${index}" data-c="-1">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" data-i="${index}" data-c="1">+</button>
                            <button class="remove-btn" data-i="${index}">Remove</button>
                        </div>
                    </div>`;
            })
            .join("");

        subtotalEl.textContent = formatPrice(subtotal);
        totalEl.textContent = formatPrice(subtotal + 15); // $15 shipping
    };

    // Quantity + remove buttons
    document.addEventListener("click", (e) => {
        const cart = State.cart || JSON.parse(localStorage.getItem("ilvanto_cart")) || [];

        // Quantity buttons
        if (e.target.classList.contains("qty-btn")) {
            const i = Number(e.target.dataset.i);
            const change = Number(e.target.dataset.c);

            if (cart[i].qty + change > 0) {
                cart[i].qty += change;
                saveCart();
                render();
            }
        }

        // Remove button
        if (e.target.classList.contains("remove-btn")) {
            const i = Number(e.target.dataset.i);
            cart.splice(i, 1);
            saveCart();
            render();
        }
    });

    // Checkout button
    document.getElementById("checkout-btn").addEventListener("click", () => {
        const cart = State.cart || JSON.parse(localStorage.getItem("ilvanto_cart")) || [];

        // Prevent checkout if cart is empty
        if (cart.length === 0) return showToast("Your cart is empty");

        // Prevent checkout if not signed in
        if (!State.user) {
            showToast("Please sign in to checkout");
            return setTimeout(() => {
                window.location.href = "auth.html";
            }, 1300);
        }

        // All good → proceed to checkout
        window.location.href = "checkout.html";
    });

    render();
}




// -------------------------
// AUTH PAGE
// -------------------------
function initAuth() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const toggle = document.getElementById("toggle-auth");
    const title = document.getElementById("form-title");

    let isLogin = true;

    toggle.addEventListener("click", () => {
        isLogin = !isLogin;

        title.textContent = isLogin ? "Sign In" : "Create Account";
        loginForm.style.display = isLogin ? "block" : "none";
        registerForm.style.display = isLogin ? "none" : "block";

        toggle.textContent = isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Sign In";
    });

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = e.target.regName.value.trim();
        const email = e.target.regEmail.value.trim();
        const password = e.target.regPass.value;

        if (!name || !email || !password) {
            return showToast("Please fill all fields");
        }

        if (State.users.find((u) => u.email === email))
            return showToast("Email already exists");

        const newUser = { name, email, password };

        State.users.push(newUser);
        localStorage.setItem("ilvanto_users", JSON.stringify(State.users));
        localStorage.setItem("ilvanto_session", JSON.stringify(newUser));

        window.location.href = "index.html";
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = e.target.loginEmail.value.trim();
        const password = e.target.loginPass.value;

        const user = State.users.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) return showToast("Invalid credentials");

        localStorage.setItem("ilvanto_session", JSON.stringify(user));
        window.location.href = "index.html";
    });
}

// -------------------------
document.addEventListener("DOMContentLoaded", initApp);
