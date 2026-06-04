# Balaji Refiners - Shudh Sarso Ka Tel

Premium, classic, responsive e-commerce website for an edible mustard oil company, now connected to a Node.js + Express + MySQL backend.

## Pages
- `index.html` — Home page with hero banner, promotional banner, company intro, featured products, why choose us, reviews, contact CTA.
- `services.html` — About Us page with company history, mission, vision, manufacturing process, and quality assurance.
- `apply.html` — Products page with categories, product grid, gallery, product details, prices, stock, cart, and buy-now actions.
- `status.html` — Order tracking page with Order ID search and live processing/shipped/delivered steps from the database when the backend is running.
- `contact.html` — Contact page with form, address, mobile, WhatsApp, email, Google Maps, and policy sections.
- `dashboard.html` — Customer dashboard with signup/login, profile, order history, saved addresses, wishlist, checkout, invoices.
- `admin.html` — Secure admin dashboard with role-based login, analytics cards, charts, company settings, products, orders, customers, content management, and exports.

## Backend + Database Files
- `server.js` — Express API server that serves the website and connects to MySQL.
- `database.sql` — MySQL schema and seed data for products, customers, orders, order items, and enquiries.
- `.env.example` — Environment variable template for database credentials and admin login settings.
- `package.json` — Node.js dependencies and scripts.

## Demo Admin Credentials
- Username: `admin`
- Password: `admin123`

> Change `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` in your `.env` file before production deployment.

## Database-Connected Features
- Products page loads product price, stock, category, size, image, and description from MySQL through `GET /api/products`.
- Contact form saves enquiries in the `enquiries` table through `POST /api/contacts`.
- Customer login/signup saves customer records in the `customers` table through `POST /api/customers/login`.
- Checkout can save cart orders and order items through `POST /api/orders`.
- Order Tracking reads real order status through `GET /api/orders/:orderId`.
- Admin login returns a JWT through `POST /api/admin/login`.
- Admin orders/customers/products use database-backed APIs with local demo fallback if the backend is offline.

## Run With MySQL Database

### 1) Install Node dependencies
```bash
npm install
```

### 2) Create MySQL database and tables
Login to MySQL and import the schema:

```bash
mysql -u root -p < database.sql
```

### 3) Configure environment
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `.env` with your MySQL username/password:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=balaji_refiners
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=replace-with-a-long-random-secret
```

### 4) Start the connected website
```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Static Fallback Mode
You can still preview the website without MySQL using a static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. In this mode, the frontend uses demo fallback data when the database API is unavailable.

## Production Roadmap
The current implementation gives a working Node/Express/MySQL foundation. For a full production launch, add:
- Password hashing for customer accounts.
- Razorpay payment verification webhooks.
- Cloudinary upload endpoints for logos, banners, and product photos.
- Server-side GST invoice PDF generation.
- Role-based admin users stored in MySQL.
- Shipping rules, coupon validation, and order status notifications.
