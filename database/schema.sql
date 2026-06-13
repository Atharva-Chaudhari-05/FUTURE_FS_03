CREATE DATABASE IF NOT EXISTS mirchi_masala_db;
USE mirchi_masala_db;

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category ENUM('starters', 'main_course', 'breads', 'rice', 'desserts', 'beverages', 'thali', 'street_food') NOT NULL,
    is_veg BOOLEAN DEFAULT true,
    is_bestseller BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    spice_level ENUM('mild', 'medium', 'hot', 'extra_hot') DEFAULT 'medium',
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(100),
    order_type ENUM('dine_in', 'takeaway', 'delivery') NOT NULL,
    table_number VARCHAR(10),
    delivery_address TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    special_instructions TEXT,
    status ENUM('pending', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_order DECIMAL(10,2) NOT NULL,
    customization TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Reservations
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    guest_email VARCHAR(100),
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests_count INT NOT NULL,
    special_requests TEXT,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    title VARCHAR(100),
    category ENUM('food', 'ambiance', 'kitchen', 'events') DEFAULT 'food',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert new dishes
INSERT INTO menu_items (name, description, price, category, is_veg, is_bestseller, spice_level, image_url) VALUES
('Bhel Puri', 'Puffed rice mixed with vegetables and tangy tamarind chutney', 50.00, 'street_food', true, true, 'medium', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80'),
('Sev Puri', 'Crispy puris topped with potatoes, onions, chutneys and sev', 50.00, 'street_food', true, true, 'medium', 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?w=400&q=80'),
('Dahi Puri', 'Crispy puris stuffed with potatoes and topped with sweet yogurt and chutneys', 60.00, 'street_food', true, true, 'mild', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80'),
('Kanda Bhaji', 'Crispy onion fritters made with gram flour and spices', 60.00, 'street_food', true, false, 'medium', 'https://images.unsplash.com/photo-1567188040759-b13d750c2604?w=400&q=80'),
('Thalipeeth', 'Savory multi-grain pancake served with yogurt', 80.00, 'starters', true, false, 'medium', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'),
('Anda Bhurji', 'Spicy scrambled eggs with onions, tomatoes and green chilies', 100.00, 'street_food', false, true, 'hot', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'),
('Chicken Frankie', 'Spicy chicken wrapped in a paratha with onions and mint chutney', 120.00, 'street_food', false, true, 'hot', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80'),
('Masala Pav', 'Pav toasted with spicy onion-tomato masala', 40.00, 'street_food', true, false, 'hot', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80');

-- Add some gallery images
INSERT INTO gallery_images (image_url, title, category) VALUES
('https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80', 'Maharashtra Thali', 'food'),
('https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80', 'Our Dining Area', 'ambiance'),
('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', 'Busy Kitchen', 'kitchen'),
('https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80', 'Vada Pav', 'food'),
('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', 'Reserved Table', 'ambiance'),
('https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?w=800&q=80', 'Street Food Spread', 'food');
