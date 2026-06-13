DROP DATABASE IF EXISTS spice_garden_db;
CREATE DATABASE IF NOT EXISTS spice_garden_db;
USE spice_garden_db;

-- 1. TABLE: menu_items
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    category ENUM('starters','main_course','breads','rice','desserts','beverages','thali'),
    is_veg BOOLEAN DEFAULT TRUE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    spice_level ENUM('mild','medium','hot','extra_hot'),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLE: orders
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(15) NOT NULL,
    customer_email VARCHAR(100),
    order_type ENUM('dine_in','takeaway','delivery'),
    table_number INT,
    delivery_address TEXT,
    total_amount DECIMAL(10,2),
    status ENUM('pending','confirmed','preparing','ready','delivered','cancelled') DEFAULT 'pending',
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLE: order_items
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    menu_item_id INT,
    quantity INT NOT NULL,
    price_at_order DECIMAL(10,2),
    customization TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- 4. TABLE: contact_messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABLE: gallery_images
CREATE TABLE IF NOT EXISTS gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    image_url VARCHAR(255),
    category ENUM('food','ambiance','events','team','kitchen'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABLE: reservations
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    guest_phone VARCHAR(15) NOT NULL,
    guest_email VARCHAR(100),
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests_count INT NOT NULL,
    special_requests TEXT,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT sample data for menu_items
INSERT INTO menu_items (name, description, price, category, is_veg, is_bestseller, spice_level, image_url) VALUES
('Paneer Tikka', 'Cottage cheese marinated in yogurt and spices', 250.00, 'starters', TRUE, TRUE, 'medium', 'https://images.unsplash.com/photo-1567188040759-b13d750c2604?w=400&q=80'),
('Samosa', 'Crispy pastry filled with spiced potatoes and peas', 60.00, 'starters', TRUE, TRUE, 'mild', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Chicken Tikka', 'Tender chicken pieces marinated and grilled', 320.00, 'starters', FALSE, TRUE, 'medium', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80'),
('Aloo Tikki', 'Spiced potato patties served with chutney', 120.00, 'starters', TRUE, FALSE, 'medium', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'),
('Hara Bhara Kebab', 'Spinach and green pea vegetarian patties', 180.00, 'starters', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&q=80'),
('Dal Makhani', 'Slow-cooked black lentils in creamy butter sauce', 280.00, 'main_course', TRUE, TRUE, 'mild', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'),
('Butter Chicken', 'Tender chicken cooked in rich tomato gravy', 380.00, 'main_course', FALSE, TRUE, 'mild', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80'),
('Palak Paneer', 'Cottage cheese in creamy spinach sauce', 300.00, 'main_course', TRUE, FALSE, 'medium', 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=400&q=80'),
('Mutton Rogan Josh', 'Kashmiri style aromatic lamb curry', 450.00, 'main_course', FALSE, TRUE, 'hot', 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=80'),
('Chana Masala', 'Spicy chickpea curry', 220.00, 'main_course', TRUE, FALSE, 'medium', 'https://images.unsplash.com/photo-1567188040759-b13d750c2604?w=400&q=80'),
('Naan', 'Classic Indian flatbread baked in tandoor', 40.00, 'breads', TRUE, TRUE, 'mild', 'https://images.unsplash.com/photo-1600326145552-327f74e4b76e?w=400&q=80'),
('Garlic Naan', 'Naan topped with minced garlic and cilantro', 60.00, 'breads', TRUE, TRUE, 'mild', 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=400&q=80'),
('Tandoori Roti', 'Whole wheat bread baked in tandoor', 30.00, 'breads', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'),
('Lachha Paratha', 'Flaky layered flatbread', 50.00, 'breads', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1596568459202-b2d86161eb3a?w=400&q=80'),
('Missi Roti', 'Spiced gram flour bread', 45.00, 'breads', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80'),
('Biryani', 'Aromatic basmati rice cooked with spices', 350.00, 'rice', FALSE, TRUE, 'medium', 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&q=80'),
('Veg Pulao', 'Basmati rice cooked with mixed vegetables', 220.00, 'rice', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80'),
('Jeera Rice', 'Cumin flavored basmati rice', 160.00, 'rice', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=400&q=80'),
('Steamed Rice', 'Plain basmati rice', 120.00, 'rice', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80'),
('Peas Pulao', 'Rice cooked with fresh green peas', 180.00, 'rice', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80'),
('Gulab Jamun', 'Deep fried dough balls soaked in sugar syrup', 100.00, 'desserts', TRUE, TRUE, 'mild', 'https://images.unsplash.com/photo-1598993297127-3211516e8b4e?w=400&q=80'),
('Rasmalai', 'Cottage cheese dumplings in sweetened milk', 120.00, 'desserts', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1615486171448-4fd18d0cdbc6?w=400&q=80'),
('Lassi', 'Sweet yogurt drink', 80.00, 'beverages', TRUE, TRUE, 'mild', 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80'),
('Masala Chai', 'Indian spiced tea', 40.00, 'beverages', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80'),
('Chole Bhature', 'Spicy chickpeas with fried bread', 150.00, 'main_course', TRUE, TRUE, 'medium', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80'),
('Mutton Curry', 'Spicy lamb curry', 350.00, 'main_course', FALSE, TRUE, 'hot', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'),
('Rajma Chawal', 'Kidney beans curry with rice', 180.00, 'main_course', TRUE, TRUE, 'medium', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'),
('Kheer', 'Rice pudding', 90.00, 'desserts', TRUE, TRUE, 'mild', 'https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=400&q=80'),
('Tandoori Chicken', 'Chicken baked in tandoor', 350.00, 'main_course', FALSE, TRUE, 'medium', 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80'),
('Mango Lassi', 'Sweet mango yogurt drink', 100.00, 'beverages', TRUE, TRUE, 'mild', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80'),
('Misal Pav', 'Spicy sprouted moth bean curry with pav bread', 60.00, 'starters', TRUE, TRUE, 'medium', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&q=80'),
('Vada Pav', 'Mumbai street style spicy potato dumpling in pav', 30.00, 'starters', TRUE, TRUE, 'hot', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80'),
('Pav Bhaji', 'Spiced mashed vegetable curry served with buttered pav', 80.00, 'starters', TRUE, FALSE, 'medium', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80'),
('Chicken Kolhapuri', 'Fiery Kolhapuri style chicken in bold masala gravy', 220.00, 'main_course', FALSE, TRUE, 'extra_hot', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'),
('Mutton Rassa', 'Traditional Maharashtra style spicy mutton curry', 280.00, 'main_course', FALSE, TRUE, 'hot', 'https://images.unsplash.com/photo-1542528180-a1208c5169a5?w=400&q=80'),
('Puran Poli', 'Sweet flatbread stuffed with jaggery and chana dal', 70.00, 'desserts', TRUE, FALSE, 'mild', 'https://images.unsplash.com/photo-1542528180-a1208c5169a5?w=400&q=80'),
('Zunka Bhakri', 'Traditional besan curry with jowar flatbread', 90.00, 'main_course', TRUE, FALSE, 'medium', 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?w=400&q=80'),
('Maharashtra Thali', 'Dal, Rice, Bhakri, Zunka, Koshimbir, Papad, Pickle and Shrikhand - complete meal', 249.00, 'thali', TRUE, TRUE, 'medium', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80');

-- INSERT sample orders (5 orders)
INSERT INTO orders (customer_name, customer_phone, customer_email, order_type, table_number, delivery_address, total_amount, status) VALUES
('Rahul Sharma', '9876543210', 'rahul@example.com', 'dine_in', 5, NULL, 850.00, 'delivered'),
('Priya Singh', '9876543211', 'priya@example.com', 'delivery', NULL, '123 Main Street, Apt 4B', 620.00, 'preparing'),
('Amit Patel', '9876543212', 'amit@example.com', 'takeaway', NULL, NULL, 400.00, 'ready'),
('Neha Gupta', '9876543213', 'neha@example.com', 'dine_in', 2, NULL, 1200.00, 'confirmed'),
('Vikram Kumar', '9876543214', 'vikram@example.com', 'delivery', NULL, '456 Park Avenue', 950.00, 'pending');

-- INSERT sample order_items
INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_order) VALUES
(1, 6, 1, 280.00), (1, 11, 2, 40.00), (1, 16, 1, 350.00),
(2, 7, 1, 380.00), (2, 12, 2, 60.00),
(3, 1, 1, 250.00), (3, 23, 1, 80.00),
(4, 9, 2, 450.00), (4, 11, 4, 40.00),
(5, 25, 2, 450.00);

-- INSERT sample gallery images (10 images)
INSERT INTO gallery_images (title, image_url, category) VALUES
('Spice Assortment', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800', 'food'),
('Rustic Ambience', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'ambiance'),
('Tandoor Oven', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', 'kitchen'),
('Family Dinner', 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800', 'events'),
('Fresh Vegetables', 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800', 'kitchen'),
('Evening Setup', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800', 'ambiance'),
('Chef Special', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800', 'team'),
('Thali Serving', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800', 'food'),
('Outdoor Seating', 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800', 'ambiance'),
('Cooking Process', 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800', 'kitchen');

-- INSERT sample reservations (3 reservations)
INSERT INTO reservations (guest_name, guest_phone, guest_email, date, time, guests_count, special_requests, status) VALUES
('Suresh Raina', '9876543220', 'suresh@example.com', '2024-12-01', '19:30:00', 4, 'Window seat please', 'confirmed'),
('Anjali Desai', '9876543221', 'anjali@example.com', '2024-12-02', '20:00:00', 2, 'Anniversary celebration', 'pending'),
('Rohan Mehta', '9876543222', 'rohan@example.com', '2024-12-03', '13:00:00', 6, 'Vegetarian options needed', 'confirmed');
