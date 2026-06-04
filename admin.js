const adminLoginForm = document.querySelector("#adminLoginForm");
const adminPanel = document.querySelector("#adminPanel");
const adminLoginCard = document.querySelector("#adminLoginCard");
const adminHint = document.querySelector("#adminHint");
const logoutBtn = document.querySelector("#logoutBtn");
const adminUserLabel = document.querySelector("#adminUserLabel");

const ADMIN_API_BASE =
  window.BALAJI_API_BASE ||
  (window.location.port === "3000" ? "/api" : "http://localhost:3000/api");

const defaultOrders = [
  ["BRORD-24018", "Priya Sharma", "Delivered", "₹1,035", "UPI"],
  ["BRORD-24022", "Manoj Traders", "Processing", "₹2,480", "COD"],
  ["BRORD-24031", "Rakesh Kumar", "Shipped", "₹850", "Razorpay"],
  ["BRORD-24037", "Neha Singh", "Pending", "₹355", "UPI"],
];

const defaultCustomers = [
  ["CUST-101", "Priya Sharma", "4", "₹3,820", "Active"],
  ["CUST-102", "Manoj Traders", "12", "₹28,900", "Wholesale"],
  ["CUST-103", "Rakesh Kumar", "2", "₹1,205", "Active"],
];

const defaultProducts = [
  ["BR-1L", "Classic Kachi Ghani Mustard Oil", "₹185", "124"],
  ["BR-15L", "Commercial Mustard Oil Tin", "₹2,480", "9"],
];

const getAdminToken = () => sessionStorage.getItem("balajiAdminToken");

const adminApiRequest = async (path, options = {}) => {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const token = getAdminToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${ADMIN_API_BASE}${path}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "API request failed" }));
    throw new Error(error.message || "API request failed");
  }
  return response.json();
};

const showAdminPanel = (username = "Super Admin") => {
  if (!adminPanel || !adminLoginCard) return;
  adminPanel.hidden = false;
  adminLoginCard.hidden = true;
  if (adminUserLabel) adminUserLabel.textContent = username;
  loadAdminDatabaseTables();
};

const renderTable = (selector, rows) => {
  const table = document.querySelector(selector);
  if (!table) return;
  table.innerHTML = rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}<td><button class="btn ghost" type="button">View</button></td></tr>`).join("");
};

const renderProductTable = (rows) => {
  const table = document.querySelector("#adminProductsTable");
  if (!table) return;
  table.innerHTML = rows
    .map(
      (row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td><button class="btn ghost" type="button">Edit</button> <button class="btn ghost" type="button">Delete</button></td></tr>`
    )
    .join("");
};

const loadAdminDatabaseTables = async () => {
  renderTable("#ordersTable", defaultOrders);
  renderTable("#customersTable", defaultCustomers);
  renderProductTable(defaultProducts);

  try {
    const [orders, customers, products] = await Promise.all([
      adminApiRequest("/admin/orders"),
      adminApiRequest("/admin/customers"),
      adminApiRequest("/products"),
    ]);

    renderTable(
      "#ordersTable",
      orders.map((order) => [
        order.order_id,
        order.customer_name,
        order.status,
        `₹${Number(order.total_amount).toLocaleString("en-IN")}`,
        order.payment_method,
      ])
    );

    renderTable(
      "#customersTable",
      customers.map((customer) => [
        `CUST-${customer.id}`,
        customer.name,
        customer.orders || 0,
        `₹${Number(customer.revenue || 0).toLocaleString("en-IN")}`,
        customer.mobile_email,
      ])
    );

    renderProductTable(
      products.map((product) => [
        product.id,
        product.name,
        `₹${Number(product.price).toLocaleString("en-IN")}`,
        product.stock,
      ])
    );
  } catch (error) {
    console.info("Admin database API unavailable; using demo dashboard data.", error.message);
  }
};

const exportCsv = (filename, rows) => {
  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.querySelector("#adminUsername").value.trim();
    const password = document.querySelector("#adminPassword").value;

    try {
      const result = await adminApiRequest("/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      sessionStorage.setItem("balajiAdminSession", username);
      sessionStorage.setItem("balajiAdminToken", result.token);
      showAdminPanel(result.user?.role || "Super Admin");
      if (adminHint) adminHint.textContent = "";
    } catch (error) {
      if (username === "admin" && password === "admin123") {
        sessionStorage.setItem("balajiAdminSession", username);
        sessionStorage.removeItem("balajiAdminToken");
        showAdminPanel("Super Admin");
        if (adminHint) adminHint.textContent = "Database API offline: demo admin mode opened.";
      } else if (adminHint) {
        adminHint.textContent = "Invalid username or password. Use admin / admin123 for this demo.";
      }
    }
  });
}

if (sessionStorage.getItem("balajiAdminSession")) showAdminPanel("Super Admin");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("balajiAdminSession");
    sessionStorage.removeItem("balajiAdminToken");
    adminPanel.hidden = true;
    adminLoginCard.hidden = false;
  });
}

document.querySelectorAll(".tab-button[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button[data-tab]").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((panel) => (panel.hidden = true));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.tab}`).hidden = false;
  });
});

const productForm = document.querySelector("#productForm");
if (productForm) {
  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#adminProductName").value;
    const price = document.querySelector("#adminProductPrice").value;
    const stock = document.querySelector("#adminProductStock").value;
    const category = productForm.querySelector("select").value;
    const id = `BR-${Date.now().toString().slice(-5)}`;
    const product = {
      id,
      name,
      category,
      size: "Custom Pack",
      price,
      stock,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
      description: "Admin-added database product.",
    };

    try {
      await adminApiRequest("/admin/products", { method: "POST", body: JSON.stringify(product) });
      await loadAdminDatabaseTables();
      alert("Product database me save ho gaya.");
    } catch (error) {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${id}</td><td>${name}</td><td>₹${price}</td><td>${stock}</td><td><button class="btn ghost" type="button">Edit</button> <button class="btn ghost" type="button">Delete</button></td>`;
      document.querySelector("#adminProductsTable").prepend(row);
      alert("Database offline hai. Product demo table me add hua.");
    }

    productForm.reset();
  });
}

document.querySelectorAll("[data-export]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.export === "orders") exportCsv("balaji-orders.csv", defaultOrders);
    if (button.dataset.export === "customers") exportCsv("balaji-customers.csv", defaultCustomers);
    if (button.dataset.export === "pdf") window.print();
  });
});

loadAdminDatabaseTables();
