# Balaji Refiners - Shudh Sarso Ka Tel

Premium, classic, responsive e-commerce website prototype for an edible mustard oil company.

## Pages
- `index.html` — Home page with hero banner, promotional banner, company intro, featured products, why choose us, reviews, contact CTA.
- `services.html` — About Us page with company history, mission, vision, manufacturing process, and quality assurance.
- `apply.html` — Products page with categories, product grid, gallery, product details, prices, stock, cart, and buy-now actions.
- `status.html` — Order tracking page with Order ID search and live processing/shipped/delivered steps.
- `contact.html` — Contact page with form, address, mobile, WhatsApp, email, Google Maps, and policy sections.
- `dashboard.html` — Customer dashboard with signup/login, profile, order history, saved addresses, wishlist, checkout, invoices.
- `admin.html` — Secure admin dashboard prototype with role-based login, analytics cards, charts, company settings, products, orders, customers, content management, and exports.

## Demo Credentials
- Username: `admin`
- Password: `admin123`

## Implemented Frontend Features
- Premium Indian brand look using dark green, gold, white, and black.
- Responsive mobile, tablet, and desktop layout.
- Smooth reveal animations and elegant UI cards.
- SEO-friendly titles, descriptions, semantic sections, and image alt text.
- LocalStorage cart and customer dashboard demo state.
- SessionStorage admin session demo state.
- CSV export and print/PDF export placeholders.

## Production Roadmap
The current repository is a static HTML/CSS/JavaScript prototype. For production, connect these screens to:
- Frontend: Next.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MySQL
- Authentication: JWT with role-based access control
- Image Storage: Cloudinary
- Payment Gateway: Razorpay + UPI + COD
- GST invoice generation and report exports

## Run Locally
Open `index.html` directly in a browser, or run a simple static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
