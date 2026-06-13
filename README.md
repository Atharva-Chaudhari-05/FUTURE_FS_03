# 🍛 Spice Garden Dhaba

> Authentic Indian Restaurant Website - 
> Full Stack Web Development Internship Task 3
> Future Interns | Track: FS | Repo: FUTURE_FS_03

![Spice Garden Dhaba](https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80)

## 🌟 Live Demo
[View Live](https://github.com/Atharva-Chaudhari-05/FUTURE_FS_03)

## 📋 About The Project
Spice Garden Dhaba is a complete full-stack restaurant 
website built for an authentic Indian dhaba in Malegaon, 
Maharashtra. Built as Task 3 of the Future Interns 
Full Stack Web Development internship.

The website allows customers to browse the menu, 
add items to cart, place orders, book tables, and 
contact the restaurant - all powered by a Node.js 
backend and MySQL database.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js + Express.js |
| Database | MySQL + mysql2 |
| Animations | CSS Keyframes + Intersection Observer |
| Version Control | Git + GitHub |

## ✨ Key Features

- ✅ 5 Fully Responsive Pages
- ✅ Dynamic Menu from MySQL Database
- ✅ Shopping Cart (Vanilla JS)
- ✅ Order Placement System
- ✅ Table Reservation System
- ✅ WhatsApp Order Integration
- ✅ Contact Form with DB Storage
- ✅ Custom CSS Animations
- ✅ Dark Mode Toggle
- ✅ Page Loader
- ✅ Toast Notifications
- ✅ Mobile Responsive Design
- ✅ SEO Meta Tags

## 📁 Project Structure

spice-garden-dhaba/
├── server.js
├── package.json
├── database/
│   ├── schema.sql
│   └── connection.js
├── routes/
│   ├── menu.js
│   ├── order.js
│   └── contact.js
└── public/
    ├── index.html
    ├── menu.html
    ├── about.html
    ├── gallery.html
    ├── contact.html
    ├── css/
    └── js/

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18 or higher
- MySQL installed locally
- Git

### Step 1: Clone Repository
\`\`\`bash
git clone https://github.com/Atharva-Chaudhari-05/FUTURE_FS_03.git
cd FUTURE_FS_03
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Setup Database
Open MySQL terminal and run:
\`\`\`bash
mysql -u root -p < database/schema.sql
\`\`\`

### Step 4: Configure Environment
\`\`\`bash
cp .env.example .env
\`\`\`

Then edit .env and add your MySQL password:
\`\`\`
DB_PASSWORD=your_actual_password
\`\`\`

### Step 5: Start the Server
Development mode:
\`\`\`bash
npm run dev
\`\`\`

Production mode:
\`\`\`bash
npm start
\`\`\`

### Step 6: Open in Browser
http://localhost:3000

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/menu | Get all menu items |
| GET | /api/menu/:category | Filter by category |
| POST | /api/orders | Place new order |
| GET | /api/orders/:id | Get order status |
| POST | /api/contact | Send message |
| POST | /api/reservations | Book a table |
| GET | /api/gallery | Get gallery images |

## 📸 Pages Overview

| Page | Description |
|------|-------------|
| Home | Hero, Categories, Bestsellers, Testimonials |
| Menu | Filter, Cart, Order Modal |
| About | Story, Timeline, Team |
| Gallery | Masonry Grid, Lightbox |
| Contact | Forms, Reservation, FAQ, Map |

## 👤 Author

**Atharva Chaudhari**
- GitHub: [@Atharva-Chaudhari-05](https://github.com/Atharva-Chaudhari-05)
- Internship: Future Interns
- Track: Full Stack Web Development
- Task: FUTURE_FS_03

## 🏢 About Future Interns

This project was built as part of the Future Interns 
Full Stack Web Development internship program.
- Website: futureinterns.com
- LinkedIn: linkedin.com/company/future-interns

## 📄 License
MIT License - feel free to use this project 
as a reference.

---
⭐ Star this repo if you found it helpful!
