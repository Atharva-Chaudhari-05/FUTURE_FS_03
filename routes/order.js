const express = require('express');
const router = express.Router();

// POST /api/orders - create new order
router.post('/orders', async (req, res, next) => {
    try {
        const { 
            customer_name, 
            customer_phone, 
            customer_email, 
            order_type, 
            table_number, 
            delivery_address, 
            total_amount, 
            special_instructions,
            items 
        } = req.body;

        if (!customer_name || !customer_phone || !order_type || !items || !items.length) {
            return res.status(400).json({ success: false, message: 'Missing required order fields' });
        }

        const connection = await req.db.getConnection();
        await connection.beginTransaction();

        try {
            // Insert order
            const [orderResult] = await connection.query(
                `INSERT INTO orders 
                (customer_name, customer_phone, customer_email, order_type, table_number, delivery_address, total_amount, special_instructions) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [customer_name, customer_phone, customer_email, order_type, table_number || null, delivery_address || null, total_amount, special_instructions]
            );
            
            const orderId = orderResult.insertId;

            // Insert order items
            for (let item of items) {
                await connection.query(
                    `INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_order, customization) VALUES (?, ?, ?, ?, ?)`,
                    [orderId, item.menu_item_id, item.quantity, item.price, item.customization || null]
                );
            }

            await connection.commit();
            res.status(201).json({ success: true, message: 'Order placed successfully', orderId: orderId });
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    } catch (error) {
        next(error);
    }
});

// GET /api/orders/:id - get order status
router.get('/orders/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await req.db.query('SELECT * FROM orders WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const order = rows[0];
        
        const [items] = await req.db.query(
            `SELECT oi.*, m.name, m.image_url FROM order_items oi 
             JOIN menu_items m ON oi.menu_item_id = m.id 
             WHERE oi.order_id = ?`, 
             [id]
        );
        order.items = items;

        res.json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
