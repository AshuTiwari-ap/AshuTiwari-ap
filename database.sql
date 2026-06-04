CREATE DATABASE IF NOT EXISTS balaji_refiners CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE balaji_refiners;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(40) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  category VARCHAR(80) NOT NULL,
  size VARCHAR(60) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image_url TEXT,
  description TEXT,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  mobile_email VARCHAR(160) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(40) NOT NULL UNIQUE,
  customer_name VARCHAR(160) NOT NULL,
  mobile VARCHAR(160),
  status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  payment_method VARCHAR(80) NOT NULL DEFAULT 'COD',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(40) NOT NULL,
  product_sku VARCHAR(40),
  product_name VARCHAR(160) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (order_id)
);

CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  mobile VARCHAR(30) NOT NULL,
  email VARCHAR(160),
  message TEXT NOT NULL,
  status ENUM('New', 'Contacted', 'Closed') NOT NULL DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (sku, name, category, size, price, stock, image_url, description) VALUES
('BR-1L', 'Classic Kachi Ghani Mustard Oil', 'Bottle', '1 Litre', 185.00, 124, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80', 'Cold-pressed aroma, lab-tested purity, sealed freshness.'),
('BR-2L', 'Premium Sarso Tel Family Pack', 'Bottle', '2 Litre', 355.00, 68, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80', 'Family pack for everyday Indian cooking.'),
('BR-5L', 'Shudh Sarso Ka Tel Jar', 'Jar', '5 Litre', 850.00, 18, 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=900&q=80', 'Value jar for home and small business kitchens.'),
('BR-15L', 'Commercial Mustard Oil Tin', 'Tin', '15 Litre', 2480.00, 9, 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=900&q=80', 'Commercial tin for retailers and HoReCa buyers.')
ON DUPLICATE KEY UPDATE
  name = VALUES(name), category = VALUES(category), size = VALUES(size), price = VALUES(price), stock = VALUES(stock), image_url = VALUES(image_url), description = VALUES(description);

INSERT INTO customers (name, mobile_email) VALUES
('Priya Sharma', 'priya@example.com'),
('Manoj Traders', 'manoj@example.com'),
('Rakesh Kumar', 'rakesh@example.com')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO orders (order_id, customer_name, mobile, status, total_amount, payment_method) VALUES
('BRORD-24018', 'Priya Sharma', 'priya@example.com', 'Delivered', 1035.00, 'UPI'),
('BRORD-24022', 'Manoj Traders', 'manoj@example.com', 'Processing', 2480.00, 'COD'),
('BRORD-24031', 'Rakesh Kumar', 'rakesh@example.com', 'Shipped', 850.00, 'Razorpay'),
('BRORD-24037', 'Neha Singh', 'neha@example.com', 'Pending', 355.00, 'UPI')
ON DUPLICATE KEY UPDATE status = VALUES(status), total_amount = VALUES(total_amount), payment_method = VALUES(payment_method);
