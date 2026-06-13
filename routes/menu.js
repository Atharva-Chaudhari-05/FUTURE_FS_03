const express = require('express');
const router = express.Router();

// Fallback images map if DB image is null/empty
const fallbackImages = {
  'starters': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80',
  'main_course': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80',
  'breads': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80',
  'rice': 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&q=80',
  'desserts': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
  'beverages': 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80',
  'thali': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
  'street_food': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80'
};

router.get('/menu/bestsellers', async (req, res) => {
  try {
    const [rows] = await req.db.execute(
      `SELECT * FROM menu_items 
       WHERE is_bestseller = 1 
       AND is_available = 1 
       LIMIT 6`
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

router.get('/menu/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const [rows] = await req.db.execute(
      'SELECT * FROM menu_items WHERE category = ? AND is_available = 1',
      [category]
    );
    
    const dishes = rows.map(dish => ({
      ...dish,
      image_url: dish.image_url || fallbackImages[dish.category]
    }));
    
    res.json({ success: true, data: dishes });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

router.get('/menu', async (req, res) => {
  try {
    const [rows] = await req.db.execute(
      'SELECT * FROM menu_items WHERE is_available = 1 ORDER BY category, name'
    );
    
    const dishes = rows.map((dish, index) => ({
      ...dish,
      image_url: dish.image_url || 
        fallbackImages[dish.category] ||
        `https://images.unsplash.com/photo-158593742161${index}-70a008356fbe?w=400&q=80`
    }));
    
    res.json({ 
      success: true, 
      data: dishes,
      total: dishes.length
    });
  } catch (error) {
    console.error('Menu fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch menu' 
    });
  }
});

module.exports = router;
