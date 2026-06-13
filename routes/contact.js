const express = require('express');
const router = express.Router();

// POST /api/contact - save contact message
router.post('/contact', async (req, res, next) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
        }

        const [result] = await req.db.query(
            'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone || null, subject || null, message]
        );

        res.status(201).json({ success: true, message: 'Message sent successfully', id: result.insertId });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
