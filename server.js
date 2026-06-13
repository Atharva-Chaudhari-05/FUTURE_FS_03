require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const pool = require('./database/connection');

const app = express();

app.use(helmet({ 
  contentSecurityPolicy: false 
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(
  path.join(__dirname, 'public')
));

app.use((req, res, next) => {
    req.db = pool;
    next();
});

// Use /api prefix for the imported routers
app.use('/api', require('./routes/menu'));
app.use('/api', require('./routes/order'));
app.use('/api', require('./routes/contact'));

// Additional API Routes not in separate files
app.post('/api/reservations', async (req, res, next) => {
    try {
        const { guest_name, guest_phone, guest_email, date, time, guests_count, special_requests } = req.body;
        
        const [result] = await req.db.query(
            'INSERT INTO reservations (guest_name, guest_phone, guest_email, date, time, guests_count, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [guest_name, guest_phone, guest_email, date, time, guests_count, special_requests]
        );
        res.status(201).json({ success: true, message: 'Reservation created successfully', id: result.insertId });
    } catch (error) {
        next(error);
    }
});

app.get('/api/gallery', async (req, res, next) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM gallery_images ORDER BY created_at DESC');
        res.json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
});

pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Connected!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ MySQL Failed:', err.message);
    console.log('Fix your .env DB credentials');
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('');
  console.log('🍛 Spice Garden Dhaba Server');
  console.log('================================');
  console.log(`✅ Running: http://localhost:${PORT}`);
  console.log(`📁 Serving: /public folder`);
  console.log(`🗄️  Database: ${process.env.DB_NAME}`);
  console.log('================================');
});

app.use('*', (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: 'API route not found'
    });
  }
  res.sendFile(path.join(
    __dirname, 'public', 'index.html'
  ));
});

app.use((err, req, res, next) => {
  console.error('🔴 Error:', err.message);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development'
      ? err.message : 'Server error'
  });
});
