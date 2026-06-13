# Mirchi & Masala - Full Stack Restaurant Website

A dynamic, premium dark-themed full-stack restaurant website for Mirchi & Masala, featuring a modern glassmorphism UI. Built with Node.js, Express, and MySQL.

## Features
- **Dynamic Menu:** Categorized menu with filtering and sorting capabilities.
- **Cart & Checkout:** Client-side cart management and a multi-step order placement modal.
- **Reservations:** Real-time table booking system.
- **Gallery:** Interactive image gallery with masonry layout and lightbox.
- **Contact:** Functional contact messaging.
- **Responsive Design:** Mobile-friendly with smooth animations and custom cursor.
- **Dark Theme:** Premium aesthetics utilizing deep greens, vibrant oranges, and glassmorphic elements.

## Tech Stack
- **Frontend:** HTML5, CSS3 (Variables, Grid, Flexbox, Animations), Vanilla JavaScript.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL.

## Setup Instructions

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/Atharva-Chaudhari-05/FUTURE_FS_03.git
   cd FUTURE_FS_03/mirchi-masala
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Database Configuration:**
   - Ensure MySQL is running.
   - Run the schema script to create the database and tables:
     \`\`\`bash
     mysql -u root -p < database/schema.sql
     \`\`\`

4. **Environment Variables:**
   - Copy \`.env.example\` to \`.env\`:
     \`\`\`bash
     cp .env.example .env
     \`\`\`
   - Update the database credentials in \`.env\` if necessary.

5. **Run the application:**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open in browser:**
   Navigate to \`http://localhost:3000\`

## Owner Info
- **Name:** Suresh Patil
- **Location:** Malegaon, Maharashtra
- **Tagline:** "Where Every Bite Tells a Story"
