const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const jwtSecret = process.env.JWT_SECRET || "change-this-secret-before-production";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "balaji_refiners",
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  namedPlaceholders: true,
});

app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const sendDatabaseError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "Database connection failed. Check MySQL credentials and schema.", detail: error.code || error.message });
};

const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Admin token required" });
    return;
  }

  try {
    req.admin = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired admin token" });
  }
};

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, database: "connected" });
  } catch (error) {
    sendDatabaseError(res, error);
  }
});

app.get("/api/products", async (_req, res) => {
  try {
    const [products] = await pool.query(
      "SELECT sku AS id, name, category, size, price, stock, image_url AS image, description FROM products WHERE is_active = 1 ORDER BY created_at DESC"
    );
    res.json(products);
  } catch (error) {
    sendDatabaseError(res, error);
  }
});

app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const [orders] = await pool.query(
      "SELECT order_id, customer_name, status, total_amount, payment_method, created_at FROM orders WHERE order_id = :orderId LIMIT 1",
      { orderId: req.params.orderId }
    );

    if (!orders.length) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(orders[0]);
  } catch (error) {
    sendDatabaseError(res, error);
  }
});

app.post("/api/orders", async (req, res) => {
  const { customerName, mobile, paymentMethod, items = [] } = req.body;
  const totalAmount = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
  const orderId = `BRORD-${Date.now().toString().slice(-6)}`;

  try {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(
        "INSERT INTO orders (order_id, customer_name, mobile, status, total_amount, payment_method) VALUES (:orderId, :customerName, :mobile, 'Pending', :totalAmount, :paymentMethod)",
        { orderId, customerName, mobile, totalAmount, paymentMethod }
      );

      for (const item of items) {
        await connection.query(
          "INSERT INTO order_items (order_id, product_sku, product_name, quantity, price) VALUES (:orderId, :productSku, :productName, :quantity, :price)",
          { orderId, productSku: item.id, productName: item.name, quantity: item.qty || 1, price: item.price || 0 }
        );
      }

      await connection.commit();
      res.status(201).json({ orderId, status: "Pending", totalAmount });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    sendDatabaseError(res, error);
  }
});

app.post("/api/contacts", async (req, res) => {
  const { name, mobile, email, message } = req.body;
  try {
    await pool.query(
      "INSERT INTO enquiries (name, mobile, email, message) VALUES (:name, :mobile, :email, :message)",
      { name, mobile, email, message }
    );
    res.status(201).json({ message: "Enquiry saved" });
  } catch (error) {
    sendDatabaseError(res, error);
  }
});

app.post("/api/customers/login", async (req, res) => {
  const { name, mobileEmail } = req.body;
  try {
    await pool.query(
      "INSERT INTO customers (name, mobile_email) VALUES (:name, :mobileEmail) ON DUPLICATE KEY UPDATE name = VALUES(name), updated_at = CURRENT_TIMESTAMP",
      { name, mobileEmail }
    );
    const [customers] = await pool.query("SELECT id, name, mobile_email FROM customers WHERE mobile_email = :mobileEmail LIMIT 1", { mobileEmail });
    res.json(customers[0]);
  } catch (error) {
    sendDatabaseError(res, error);
  }
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (username !== adminUsername || password !== adminPassword) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  const token = jwt.sign({ username, role: "admin" }, jwtSecret, { expiresIn: "8h" });
  res.json({ token, user: { username, role: "Super Admin" } });
});

app.get("/api/admin/orders", requireAdmin, async (_req, res) => {
  try {
    const [orders] = await pool.query("SELECT order_id, customer_name, status, total_amount, payment_method FROM orders ORDER BY created_at DESC LIMIT 100");
    res.json(orders);
  } catch (error) {
    sendDatabaseError(res, error);
  }
});

app.get("/api/admin/customers", requireAdmin, async (_req, res) => {
  try {
    const [customers] = await pool.query(
      "SELECT c.id, c.name, c.mobile_email, COUNT(o.id) AS orders, COALESCE(SUM(o.total_amount), 0) AS revenue FROM customers c LEFT JOIN orders o ON o.mobile = c.mobile_email GROUP BY c.id ORDER BY c.created_at DESC LIMIT 100"
    );
    res.json(customers);
  } catch (error) {
    sendDatabaseError(res, error);
  }
});

app.post("/api/admin/products", requireAdmin, async (req, res) => {
  const { id, name, category, size, price, stock, image, description } = req.body;
  try {
    await pool.query(
      `INSERT INTO products (sku, name, category, size, price, stock, image_url, description)
       VALUES (:id, :name, :category, :size, :price, :stock, :image, :description)
       ON DUPLICATE KEY UPDATE name = VALUES(name), category = VALUES(category), size = VALUES(size), price = VALUES(price), stock = VALUES(stock), image_url = VALUES(image_url), description = VALUES(description)`,
      { id, name, category, size, price, stock, image, description }
    );
    res.status(201).json({ id, name, category, size, price, stock, image, description });
  } catch (error) {
    sendDatabaseError(res, error);
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Balaji Refiners app running at http://localhost:${port}`);
});
