USE mirchi_masala_db;

-- Update Starters
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' WHERE category = 'starters';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80' WHERE name LIKE '%Tikka%';

-- Update Main Course
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' WHERE category = 'main_course';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80' WHERE name = 'Butter Chicken';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' WHERE name = 'Dal Makhani';

-- Update Breads
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565557612116-24e525164d73?w=400&q=80' WHERE category = 'breads';

-- Update Rice
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' WHERE category = 'rice';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80' WHERE name = 'Steamed Rice' OR name = 'Jeera Rice';

-- Update Desserts
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80' WHERE category = 'desserts';

-- Update Beverages
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80' WHERE category = 'beverages';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80' WHERE name = 'Masala Chai';

-- Update Thali
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' WHERE category = 'thali';

-- Update Street Food
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80' WHERE category = 'street_food';
