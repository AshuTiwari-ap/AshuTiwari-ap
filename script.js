const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const API_BASE =
  window.BALAJI_API_BASE ||
  (window.location.port === "3000" ? "/api" : "http://localhost:3000/api");

const fallbackProducts = [
  {
    id: "BR-1L",
    name: "Classic Kachi Ghani Mustard Oil",
    category: "Bottle",
    size: "1 Litre",
    price: 185,
    stock: 124,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
    description: "Cold-pressed aroma, lab-tested purity, sealed for long-lasting freshness.",
  },
  {
    id: "BR-2L",
    name: "Premium Sarso Tel Family Pack",
    category: "Bottle",
    size: "2 Litre",
    price: 355,
    stock: 68,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    description: "Family pack for everyday Indian cooking.",
  },
  {
    id: "BR-5L",
    name: "Shudh Sarso Ka Tel Jar",
    category: "Jar",
    size: "5 Litre",
    price: 850,
    stock: 18,
    image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=900&q=80",
    description: "Value jar for home and small business kitchens.",
  },
  {
    id: "BR-15L",
    name: "Commercial Mustard Oil Tin",
    category: "Tin",
    size: "15 Litre",
    price: 2480,
    stock: 9,
    image: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=900&q=80",
    description: "Commercial tin for retailers and HoReCa buyers.",
  },
];

let products = [...fallbackProducts];

const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "API request failed" }));
    throw new Error(error.message || "API request failed");
  }

  return response.json();
};

const getStored = (key, fallback) => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
const setStored = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getCart = () => getStored("balajiCart", []);
const setCart = (items) => setStored("balajiCart", items);

const updateCartCount = () => {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = count;
  });
};

const renderProducts = () => {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;
  grid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card reveal" data-category="${product.category}">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-body">
            <div class="product-meta"><span>${product.category}</span><span>${product.size}</span></div>
            <h3>${product.name}</h3>
            <p>${product.description || "Cold-pressed aroma, lab-tested purity, sealed for long-lasting freshness."}</p>
            <div class="product-meta"><span class="price">₹${Number(product.price).toLocaleString("en-IN")}</span><span class="stock ${product.stock < 20 ? "low" : ""}">${product.stock < 20 ? "Low stock" : "In stock"}</span></div>
            <div class="actions">
              <button class="btn primary add-cart" data-id="${product.id}"><i class="fa-solid fa-cart-plus"></i> Add to cart</button>
              <button class="btn ghost buy-now" data-id="${product.id}">Buy now</button>
            </div>
          </div>
        </article>`
    )
    .join("");
  document.querySelectorAll("#productGrid .reveal").forEach((item) => revealObserver.observe(item));
};

const loadProductsFromDatabase = async () => {
  if (!document.querySelector("#productGrid")) return;

  try {
    const databaseProducts = await apiRequest("/products");
    if (Array.isArray(databaseProducts) && databaseProducts.length) {
      products = databaseProducts;
      renderProducts();
    }
  } catch (error) {
    console.info("Using local product fallback because database API is not reachable.", error.message);
  }
};

const addToCart = (productId) => {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  const cart = getCart();
  const found = cart.find((item) => item.id === productId);
  if (found) found.qty += 1;
  else cart.push({ id: product.id, name: product.name, price: Number(product.price), qty: 1 });
  setCart(cart);
  updateCartCount();
  renderCartSummary();
  alert(`${product.name} cart me add ho gaya.`);
};

document.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-cart");
  const buyButton = event.target.closest(".buy-now");
  const filterButton = event.target.closest("[data-filter]");

  if (addButton) addToCart(addButton.dataset.id);
  if (buyButton) {
    addToCart(buyButton.dataset.id);
    location.href = "dashboard.html#checkout";
  }
  if (filterButton) {
    const category = filterButton.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.remove("active"));
    filterButton.classList.add("active");
    document.querySelectorAll(".product-card").forEach((card) => {
      card.style.display = category === "All" || card.dataset.category === category ? "block" : "none";
    });
  }
});

const statusOrder = ["Pending", "Processing", "Shipped", "Delivered"];
const statusFallback = (id) => statusOrder[(id.length % (statusOrder.length - 1)) + 1];

const updateTrackingUi = (id, status) => {
  const activeIndex = Math.max(statusOrder.indexOf(status), 1);
  const result = document.querySelector("#trackingResult");
  document.querySelector("#trackingOrder").textContent = id;
  document.querySelector("#trackingStatus").textContent = status;
  document.querySelectorAll(".status-step").forEach((step, index) => {
    step.classList.toggle("active", index <= activeIndex);
  });
  result.hidden = false;
};

const trackingForm = document.querySelector("#trackingForm");
if (trackingForm) {
  trackingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.querySelector("#orderId").value.trim() || "BRORD-24018";

    try {
      const order = await apiRequest(`/orders/${encodeURIComponent(id)}`);
      updateTrackingUi(order.order_id || id, order.status || "Processing");
    } catch (error) {
      console.info("Using simulated tracking because database order was not found/reachable.", error.message);
      updateTrackingUi(id, statusFallback(id));
    }
  });
}

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
      name: document.querySelector("#name").value,
      mobile: document.querySelector("#mobile").value,
      email: document.querySelector("#email").value,
      message: document.querySelector("#message").value,
    };

    try {
      await apiRequest("/contacts", { method: "POST", body: JSON.stringify(payload) });
      document.querySelector("#contactSuccess").textContent = "Thank you. Your enquiry was saved in database.";
    } catch (error) {
      document.querySelector("#contactSuccess").textContent = "Thank you. Database offline hai, enquiry locally noted for demo.";
    }

    document.querySelector("#contactSuccess").hidden = false;
    contactForm.reset();
  });
}

const dashboardForm = document.querySelector("#dashboardLogin");
if (dashboardForm) {
  dashboardForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#customerName").value || "Balaji Customer";
    const mobileEmail = document.querySelector("#customerMobile").value;

    try {
      const customer = await apiRequest("/customers/login", {
        method: "POST",
        body: JSON.stringify({ name, mobileEmail }),
      });
      localStorage.setItem("balajiCustomer", customer.name || name);
    } catch (error) {
      localStorage.setItem("balajiCustomer", name);
    }

    document.querySelector("#profileName").textContent = localStorage.getItem("balajiCustomer");
    document.querySelector("#dashboardArea").hidden = false;
  });
  const storedName = localStorage.getItem("balajiCustomer");
  if (storedName) {
    document.querySelector("#profileName").textContent = storedName;
    document.querySelector("#dashboardArea").hidden = false;
  }
}

const renderCartSummary = () => {
  const cartList = document.querySelector("#cartSummary");
  if (!cartList) return;
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  cartList.innerHTML = cart.length
    ? cart.map((item) => `<li>${item.name} × ${item.qty} <strong>₹${(Number(item.price) * item.qty).toLocaleString("en-IN")}</strong></li>`).join("")
    : "<li>No items in cart yet.</li>";
  document.querySelector("#cartTotal").textContent = `₹${total.toLocaleString("en-IN")}`;
};

const checkoutButton = document.querySelector("#placeOrderBtn");
if (checkoutButton) {
  checkoutButton.addEventListener("click", async () => {
    const cart = getCart();
    const customerName = localStorage.getItem("balajiCustomer") || "Website Customer";
    const paymentMethod = document.querySelector("#paymentMethod")?.value || "COD";

    if (!cart.length) {
      alert("Cart empty hai. Pehle product add karein.");
      return;
    }

    try {
      const order = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({ customerName, mobile: customerName, paymentMethod, items: cart }),
      });
      setCart([]);
      updateCartCount();
      renderCartSummary();
      alert(`Order database me save ho gaya. Order ID: ${order.orderId}`);
    } catch (error) {
      alert("Database offline hai. Order demo cart me hi saved rahega.");
    }
  });
}

renderProducts();
loadProductsFromDatabase();
updateCartCount();
renderCartSummary();
