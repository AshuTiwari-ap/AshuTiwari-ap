# Ashu Cyber Cafe & Jan Seva Kendra Website

Yeh project ek complete responsive website hai jo cyber cafe / Jan Seva Kendra ke liye banayi gayi hai. Isme apply online system, status tracking, aur admin panel included hai.

## Features
- Fully responsive (mobile + desktop)
- Modern, colorful, professional UI
- Home, Services, Apply Online, Status, Admin Login, Contact pages
- Application ID generation + status tracking
- Admin dashboard (total apps, new apps)
- Status update & delete with password confirmation
- 3 wrong attempts par 10-minute lock
- WhatsApp + Call floating buttons

## Tech Stack
- HTML, CSS, JavaScript (LocalStorage based)

## Step-by-step Setup (Beginner Friendly)

### 1) Files ko download karein
- Is repo ko zip me download karein ya git clone karein.

### 2) Local run (Laptop par)
1. Folder open karein.
2. `index.html` par double click karein.
3. Website browser me open ho jayegi.

> Tip: Best experience ke liye VS Code me **Live Server** extension use karein.

### 3) Free Hosting (Netlify / GitHub Pages)
- Netlify:
  1. https://www.netlify.com par sign up karein
  2. "Add new site" -> "Deploy manually" -> folder drag & drop
- GitHub Pages:
  1. GitHub repo me code push karein
  2. Repo Settings -> Pages -> Deploy from branch -> main

## Admin Panel Instructions
- Admin Login page: `admin.html`
- Default password: `admin123`
- Password change option available hai.

> Note: Admin login aur applications LocalStorage me save hote hain, isliye different device/browser par data share nahi hota. Agar server-based database chahiye to PHP/MySQL integrate kiya ja sakta hai.

## Customize Tips
- Phone number, email, address change karne ke liye HTML files me content update karein.
- Map location update ke liye `contact.html` me Google Maps link replace karein.

## Folder Structure
```
index.html
services.html
apply.html
status.html
admin.html
contact.html
styles.css
script.js
admin.js
```
