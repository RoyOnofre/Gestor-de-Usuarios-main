-- Clean previous data if any
DELETE FROM products;
DELETE FROM categories;

-- Insert High-End Electronic Categories
INSERT INTO categories (id, name, image) VALUES (1, 'Laptops de Alta Gama', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop');
INSERT INTO categories (id, name, image) VALUES (2, 'Periféricos Gaming', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop');
INSERT INTO categories (id, name, image) VALUES (3, 'Smartphones & Tablets', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop');
INSERT INTO categories (id, name, image) VALUES (4, 'Componentes PC', 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400&auto=format&fit=crop');
INSERT INTO categories (id, name, image) VALUES (5, 'Audio & Sonido Pro', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop');

-- Insert Initial Featured Products
INSERT INTO products (name, category_id, price, cantid, created, image) VALUES 
('MacBook Pro M3 Max 16"', 1, 3499.99, 5, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop'),
('Logitech G Pro X Superlight', 2, 149.50, 20, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop'),
('iPhone 15 Pro Titanium', 3, 1199.00, 15, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=400&auto=format&fit=crop'),
('RTX 4090 Rog Strix', 4, 1999.00, 3, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1624701928517-44c8ac49d93c?q=80&w=400&auto=format&fit=crop'),
('Sony WH-1000XM5', 5, 399.00, 10, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop');
