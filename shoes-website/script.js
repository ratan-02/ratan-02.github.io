const products = [
  {
    id: 1,
    name: "Air Max Sport 2024",
    type: "Men's Road Running",
    price: 129.99,
    oldPrice: null,
    category: "running",
    tag: "New",
    tagClass: "tag",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400"
  },
  {
    id: 2,
    name: "Classic Leather White",
    type: "Unisex Casual Sneakers",
    price: 65.00,
    oldPrice: 90.00,
    category: "lifestyle",
    tag: "Sale",
    tagClass: "tag sale-tag",
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400"
  },
  {
    id: 3,
    name: "ZoomX Invincible",
    type: "Women's Training Shoes",
    price: 180.00,
    oldPrice: null,
    category: "running",
    tag: null,
    tagClass: "",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=400"
  },
  {
    id: 4,
    name: "Court Vision Low",
    type: "Men's Basketball Style",
    price: 75.00,
    oldPrice: null,
    category: "basketball",
    tag: null,
    tagClass: "",
    img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=400"
  },
  {
    id: 5,
    name: "Vaporfly Next%",
    type: "Professional Racing",
    price: 250.00,
    oldPrice: null,
    category: "running",
    tag: "New",
    tagClass: "tag",
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400"
  },
  {
    id: 6,
    name: "Cloudfoam Pure",
    type: "Kids Daily Wear",
    price: 55.00,
    oldPrice: 70.00,
    category: "lifestyle",
    tag: "Sale",
    tagClass: "tag sale-tag",
    img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=400"
  },
  {
    id: 7,
    name: "Terrain Hiker",
    type: "Outdoor & Trekking",
    price: 145.00,
    oldPrice: null,
    category: "lifestyle",
    tag: null,
    tagClass: "",
    img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=400"
  },
  {
    id: 8,
    name: "All-Star Canvas",
    type: "Vintage High Top",
    price: 60.00,
    oldPrice: 80.00,
    category: "lifestyle",
    tag: "Sale",
    tagClass: "tag sale-tag",
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400"
  },
  {
    id: 9,
    name: "Elite Hooper Pro",
    type: "Men's Basketball",
    price: 115.00,
    oldPrice: null,
    category: "basketball",
    tag: "New",
    tagClass: "tag",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400"
  }
];
let cart = [];
let currentFilter = "all";
let currentSort = "default";

function renderProducts(filter = "all", sort = "default") {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  let filtered = products.filter(function(product) {
    if (filter === "all") return true;
    if (filter === "sale") return product.oldPrice !== null;
    return product.category === filter;
  });

  if (sort === "low") {
    filtered.sort(function(a, b) { return a.price - b.price; });
  } else if (sort === "high") {
    filtered.sort(function(a, b) { return b.price - a.price; });
  } else if (sort === "name") {
    filtered.sort(function(a, b) { return a.name.localeCompare(b.name); });
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="no-results">No products found. Try a different filter.</p>';
    return;
  }

  for (let product of filtered) {
    let tagHTML = product.tag
      ? `<div class="${product.tagClass}">${product.tag}</div>`
      : "";

    let priceHTML = product.oldPrice
      ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span> $${product.price.toFixed(2)}`
      : `$${product.price.toFixed(2)}`;

    let card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-id", product.id);

    card.innerHTML = `
      ${tagHTML}
      <img src="${product.img}" alt="${product.name}" loading="lazy"/>
      <h4>${product.name}</h4>
      <p class="prod-type">${product.type}</p>
      <p class="price">${priceHTML}</p>
      <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    grid.appendChild(card);
  }
}

function filterProducts(category, btn) {
  currentFilter = category;

  let buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(function(b) {
    b.classList.remove("active");
  });

  btn.classList.add("active");
  renderProducts(currentFilter, currentSort);
}


function sortProducts() {
  currentSort = document.getElementById("sortSelect").value;
  renderProducts(currentFilter, currentSort);
}

function filterCategory(category) {
  currentFilter = category;

  let buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(function(b) {
    b.classList.remove("active");
    if (b.textContent.toLowerCase() === category) {
      b.classList.add("active");
    }
  });

  renderProducts(currentFilter, currentSort);
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function addToCart(productId) {
  let product = products.find(function(p) { return p.id === productId; });
  if (!product) return;

  let existing = cart.find(function(item) { return item.id === productId; });

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`✅ ${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(function(item) { return item.id !== productId; });
  updateCartUI();
}

function calculateCartTotals() {
  let totalItems = 0;
  let subtotal = 0;

  for (let item of cart) {
    totalItems += item.qty;
    subtotal += item.price * item.qty;
  }

  let shipping = 0;
  if (subtotal > 0 && subtotal < 100) {
    shipping = 9.99;
  } else {
    shipping = 0;
  }

  let total = subtotal + shipping;
  return { totalItems, subtotal, shipping, total };
}

function updateCartUI() {
  let totals = calculateCartTotals();

  document.getElementById("cartCount").textContent = totals.totalItems;

  let cartItemsEl = document.getElementById("cartItems");
  let cartFooter = document.getElementById("cartFooter");

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty 🛒</p>';
    cartFooter.style.display = "none";
  } else {
    cartItemsEl.innerHTML = "";
    cartFooter.style.display = "block";

    for (let item of cart) {
      let div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}"/>
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <p>Qty: ${item.qty} × $${item.price.toFixed(2)}</p>
        </div>
        <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
      `;
      cartItemsEl.appendChild(div);
    }
  }

  document.getElementById("cartTotal").textContent = `$${totals.total.toFixed(2)}`;

  let summarySection = document.getElementById("cartSummarySection");
  if (cart.length > 0) {
    summarySection.style.display = "block";
    document.getElementById("summaryCount").textContent = totals.totalItems;
    document.getElementById("summarySubtotal").textContent = `$${totals.subtotal.toFixed(2)}`;
    document.getElementById("summaryShipping").textContent =
      totals.shipping === 0 ? "FREE 🎉" : `$${totals.shipping.toFixed(2)}`;
    document.getElementById("summaryTotal").textContent = `$${totals.total.toFixed(2)}`;
  } else {
    summarySection.style.display = "none";
  }
}

function toggleCart() {
  let sidebar = document.getElementById("cartSidebar");
  let overlay = document.getElementById("cartOverlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("open");
}

function checkout() {
  let totals = calculateCartTotals();

  if (cart.length === 0) {
    showToast("❌ Your cart is empty!");
    return;
  }

  let msg = "";
  if (totals.total >= 100) {
    msg = `Order placed! Total: $${totals.total.toFixed(2)} — Free shipping applied! 🎉`;
  } else {
    msg = `Order placed! Total: $${totals.total.toFixed(2)} (add $${(100 - totals.subtotal).toFixed(2)} more for free shipping)`;
  }

  cart = [];
  updateCartUI();
  toggleCart();
  showToast(`✅ ${msg}`);
}

document.getElementById("searchInput").addEventListener("input", function() {
  let query = this.value.toLowerCase().trim();
  let grid = document.getElementById("productGrid");

  let results = products.filter(function(p) {
    return p.name.toLowerCase().includes(query) ||
           p.type.toLowerCase().includes(query) ||
           p.category.toLowerCase().includes(query);
  });

  grid.innerHTML = "";

  if (results.length === 0) {
    grid.innerHTML = '<p class="no-results">No results found for "' + query + '"</p>';
    return;
  }

  for (let product of results) {
    let tagHTML = product.tag
      ? `<div class="${product.tagClass}">${product.tag}</div>`
      : "";

    let priceHTML = product.oldPrice
      ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span> $${product.price.toFixed(2)}`
      : `$${product.price.toFixed(2)}`;

    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      ${tagHTML}
      <img src="${product.img}" alt="${product.name}" loading="lazy"/>
      <h4>${product.name}</h4>
      <p class="prod-type">${product.type}</p>
      <p class="price">${priceHTML}</p>
      <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  }
});

function subscribeNewsletter() {
  let emailInput = document.getElementById("newsEmail");
  let msgEl = document.getElementById("newsMsg");
  let email = emailInput.value.trim();

  if (email === "") {
    msgEl.style.color = "#ff6b6b";
    msgEl.textContent = "❌ Please enter your email.";
    return;
  }

  if (!email.includes("@")) {
    msgEl.style.color = "#ff6b6b";
    msgEl.textContent = "❌ Invalid email — must contain @";
    return;
  }

  msgEl.style.color = "#7dff7d";
  msgEl.textContent = "✅ Subscribed successfully! Welcome to StepUp.";
  emailInput.value = "";

  setTimeout(function() {
    msgEl.textContent = "";
  }, 4000);
}

function submitContact() {
  let name = document.getElementById("contactName").value.trim();
  let email = document.getElementById("contactEmail").value.trim();
  let msg = document.getElementById("contactMsg").value.trim();
  let resultEl = document.getElementById("contactResult");

  if (name === "") {
    resultEl.style.color = "red";
    resultEl.textContent = "❌ Name cannot be empty.";
    return;
  }

  if (!email.includes("@")) {
    resultEl.style.color = "red";
    resultEl.textContent = "❌ Please enter a valid email.";
    return;
  }

  if (msg.length < 10) {
    resultEl.style.color = "red";
    resultEl.textContent = "❌ Message must be at least 10 characters.";
    return;
  }

  resultEl.style.color = "green";
  resultEl.textContent = `✅ Thank you, ${name}! We'll get back to you soon.`;

  document.getElementById("contactName").value = "";
  document.getElementById("contactEmail").value = "";
  document.getElementById("contactMsg").value = "";

  setTimeout(function() {
    resultEl.textContent = "";
  }, 5000);
}

window.addEventListener("scroll", function() {
  let navbar = document.getElementById("navbar");
  if (window.scrollY > 60) {
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

function showToast(message) {
  let toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function() {
    toast.classList.remove("show");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
  renderProducts("all", "default");
});
