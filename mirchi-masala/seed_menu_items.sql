USE mirchi_masala_db;

INSERT INTO menu_items (name, description, price, category, is_veg, is_bestseller, spice_level, image_url) VALUES 
-- Starters
('Samosa Chaat', 'Crispy samosa chunks topped with chana masala, yogurt, and chutneys', 120.00, 'starters', 1, 1, 'medium', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Chicken Tikka', 'Tender chicken pieces marinated in yogurt and spices, roasted in a tandoor', 250.00, 'starters', 0, 1, 'hot', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80'),
('Hara Bhara Kebab', 'Healthy and delicious vegetarian kebabs made with spinach, potatoes, and peas', 180.00, 'starters', 1, 0, 'mild', 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=80'),
('Fish Amritsari', 'Spicy, tangy, and crispy fried fish chunks from the streets of Amritsar', 320.00, 'starters', 0, 0, 'hot', 'https://images.unsplash.com/photo-1599084942896-673ecf0670af?w=400&q=80'),
('Pani Puri', 'Crispy hollow puris filled with spicy and sweet flavored water', 80.00, 'starters', 1, 1, 'hot', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),

-- Main Course
('Butter Chicken', 'Tender chicken simmered in a rich, creamy tomato and butter gravy', 350.00, 'main_course', 0, 1, 'mild', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80'),
('Palak Paneer', 'Fresh paneer cubes cooked in a vibrant, spiced spinach puree', 280.00, 'main_course', 1, 1, 'medium', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Dal Makhani', 'Slow-cooked black lentils and kidney beans in a creamy, buttery sauce', 220.00, 'main_course', 1, 1, 'mild', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80'),
('Mutton Rogan Josh', 'Aromatic Kashmiri lamb curry cooked with traditional spices', 450.00, 'main_course', 0, 0, 'hot', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'),
('Malai Kofta', 'Potato and paneer dumplings deep-fried and served in a rich cashew gravy', 300.00, 'main_course', 1, 0, 'mild', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),

-- Breads
('Butter Naan', 'Soft and fluffy Indian flatbread baked in a tandoor, brushed with butter', 50.00, 'breads', 1, 1, 'mild', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Tandoori Roti', 'Whole wheat flatbread baked in a traditional clay oven', 30.00, 'breads', 1, 0, 'mild', 'https://images.unsplash.com/photo-1565557612116-24e525164d73?w=400&q=80'),
('Laccha Paratha', 'Multi-layered, flaky whole wheat bread cooked on a tawa', 60.00, 'breads', 1, 0, 'mild', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Cheese Naan', 'Naan bread stuffed with melted cheese', 80.00, 'breads', 1, 0, 'mild', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),

-- Rice
('Chicken Biryani', 'Aromatic basmati rice cooked with marinated chicken and whole spices', 320.00, 'rice', 0, 1, 'medium', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80'),
('Veg Pulao', 'Fragrant basmati rice cooked with mixed vegetables and mild spices', 180.00, 'rice', 1, 0, 'mild', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'),
('Mutton Biryani', 'Slow-cooked fragrant rice with tender mutton pieces and spices', 420.00, 'rice', 0, 1, 'hot', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80'),
('Steamed Rice', 'Simple, perfectly cooked plain basmati rice', 120.00, 'rice', 1, 0, 'mild', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'),

-- Desserts
('Rasmalai', 'Soft paneer discs soaked in thickened, sweetened milk garnished with nuts', 120.00, 'desserts', 1, 1, 'mild', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Gajar Ka Halwa', 'Traditional Indian dessert made with grated carrots, milk, sugar, and ghee', 150.00, 'desserts', 1, 0, 'mild', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Kulfi Falooda', 'Rich, creamy frozen dessert served with sweet noodles and rose syrup', 140.00, 'desserts', 1, 0, 'mild', 'https://images.unsplash.com/photo-1563805042-7684c8e9e533?w=400&q=80'),

-- Beverages
('Masala Chai', 'Traditional Indian tea brewed with aromatic spices and herbs', 40.00, 'beverages', 1, 1, 'mild', 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80'),
('Sweet Lassi', 'Refreshing yogurt-based sweet drink', 80.00, 'beverages', 1, 0, 'mild', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Cold Coffee', 'Creamy, frothy iced coffee', 120.00, 'beverages', 1, 0, 'mild', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80'),
('Fresh Lime Soda', 'Refreshing carbonated lemonade with a hint of salt and sugar', 60.00, 'beverages', 1, 0, 'mild', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80'),

-- Thali
('Maharaja Non-Veg Thali', 'A grand feast featuring chicken curry, mutton curry, dal, rice, breads, and dessert', 550.00, 'thali', 0, 1, 'medium', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Mini Veg Thali', 'A perfect quick lunch with paneer curry, dal, rice, and two rotis', 220.00, 'thali', 1, 0, 'mild', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Seafood Thali', 'Coastal special thali with fish curry, fried fish, rice, and sol kadhi', 480.00, 'thali', 0, 0, 'hot', 'https://images.unsplash.com/photo-1599084942896-673ecf0670af?w=400&q=80');
