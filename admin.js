const adminLoginForm = document.querySelector("#adminLoginForm");
const adminPanel = document.querySelector("#adminPanel");
const adminLoginCard = document.querySelector("#adminLoginCard");
const adminHint = document.querySelector("#adminHint");
const logoutBtn = document.querySelector("#logoutBtn");
const adminUserLabel = document.querySelector("#adminUserLabel");

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

const showAdminPanel = (username = "Super Admin") => {
  if (!adminPanel || !adminLoginCard) return;
  adminPanel.hidden = false;
  adminLoginCard.hidden = true;
  if (adminUserLabel) adminUserLabel.textContent = username;
};

const renderTable = (selector, rows) => {
  const table = document.querySelector(selector);
  if (!table) return;
  table.innerHTML = rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}<td><button class="btn ghost" type="button">View</button></td></tr>`).join("");
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
  adminLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.querySelector("#adminUsername").value.trim();
    const password = document.querySelector("#adminPassword").value;
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("balajiAdminSession", username);
      showAdminPanel("Super Admin");
      if (adminHint) adminHint.textContent = "";
    } else if (adminHint) {
      adminHint.textContent = "Invalid username or password. Use admin / admin123 for this demo.";
    }
  });
}

if (sessionStorage.getItem("balajiAdminSession")) showAdminPanel("Super Admin");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("balajiAdminSession");
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
  productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#adminProductName").value;
    const price = document.querySelector("#adminProductPrice").value;
    const stock = document.querySelector("#adminProductStock").value;
    const row = document.createElement("tr");
    row.innerHTML = `<td>NEW</td><td>${name}</td><td>₹${price}</td><td>${stock}</td><td><button class="btn ghost" type="button">Edit</button> <button class="btn ghost" type="button">Delete</button></td>`;
    document.querySelector("#adminProductsTable").prepend(row);
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

renderTable("#ordersTable", defaultOrders);
renderTable("#customersTable", defaultCustomers);
