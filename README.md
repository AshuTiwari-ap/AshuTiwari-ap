# S.D.S Convent School Management Website

A complete professional and responsive school management website for **S.D.S Convent School**, Gopalpur, Kanpur Nagar, Uttar Pradesh.

## Modules Included
- Home page with school banner, address, principal details, navigation.
- About school (history, mission & vision, infrastructure).
- Student Management (Add/Edit/Delete/Search/Profile).
- Staff Management.
- Notice Board (Exam/Holiday/General notices).
- Meeting Scheduler.
- Certificate Generator (Bonafide/Character/Transfer) with PDF export.
- Secure Admin Login panel with dashboard counters.
- Contact form.
- School gallery.
- Database backup system (download SQL backup).

## Tech Stack
- Frontend: HTML, CSS, JavaScript, Bootstrap 5
- Backend: PHP (REST-style endpoints)
- Database: MySQL

## Project Structure
- `index.html` - Public school website
- `admin.html` - Admin login and dashboard
- `app.js` - Public module logic (students/staff/notices/meetings/certificates)
- `admin.js` - Admin actions (login, notices, meetings, dashboard)
- `styles.css` - Theme and layout styling
- `backend/api/*.php` - CRUD APIs
- `backend/config.php` - Database configuration
- `database.sql` - MySQL schema
- `backend/backup.php` - Backup download generator

## Setup Instructions
1. Import DB schema:
   ```bash
   mysql -u root -p < database.sql
   ```
2. Update DB credentials in `backend/config.php` if needed.
3. Run local PHP server:
   ```bash
   php -S 0.0.0.0:8000 -t .
   ```
4. Open:
   - `http://localhost:8000/index.html`
   - `http://localhost:8000/admin.html`

## Admin Login
- Username: `admin`
- Password: `admin123`

## Notes
- Certificate PDF includes school header and principal signature area.
- Backup button in admin panel downloads live SQL dump.


## White Screen / Not Found Fix
- Server hamesha project root se start karein.
- Recommended command: `php -S 0.0.0.0:8000 -t .`
- Browser me `http://localhost:8000/index.php` open karein.
