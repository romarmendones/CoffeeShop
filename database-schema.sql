-- Coffee Shop Database Schema
-- Run this in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create menu table with improved structure
CREATE TABLE IF NOT EXISTS menu (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category_id INTEGER REFERENCES categories(id),
  available BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  preparation_time INTEGER DEFAULT 5, -- in minutes
  calories INTEGER,
  allergens TEXT[],
  ingredients TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(200),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, preparing, ready, completed, cancelled
  payment_method VARCHAR(50) DEFAULT 'cash',
  pickup_time TIMESTAMP WITH TIME ZONE,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(200),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, description, icon, color) VALUES
('Coffee', 'Freshly brewed coffee drinks', '☕', '#8B4513'),
('Tea', 'Premium loose leaf teas', '🫖', '#228B22'),
('Pastries', 'Fresh baked goods', '🥐', '#DAA520'),
('Snacks', 'Light bites and treats', '🍪', '#CD853F'),
('Beverages', 'Non-caffeinated drinks', '🥤', '#4169E1'),
('Seasonal', 'Limited time offerings', '🍁', '#FF6347')
ON CONFLICT (name) DO NOTHING;

-- Insert sample menu items
INSERT INTO menu (name, description, price, category_id, featured, preparation_time, calories, allergens, ingredients) VALUES
('Espresso', 'Single shot of premium espresso', 120.00, 1, true, 2, 5, ARRAY['none'], ARRAY['espresso beans', 'water']),
('Cappuccino', 'Classic Italian cappuccino with steamed milk', 180.00, 1, true, 4, 120, ARRAY['milk'], ARRAY['espresso', 'steamed milk', 'milk foam']),
('Latte', 'Smooth espresso with steamed milk', 160.00, 1, true, 4, 110, ARRAY['milk'], ARRAY['espresso', 'steamed milk']),
('Americano', 'Espresso with hot water', 140.00, 1, false, 3, 5, ARRAY['none'], ARRAY['espresso', 'hot water']),
('Green Tea', 'Premium Japanese green tea', 100.00, 2, false, 2, 0, ARRAY['none'], ARRAY['green tea leaves', 'water']),
('Croissant', 'Buttery French croissant', 80.00, 3, true, 1, 250, ARRAY['wheat', 'milk', 'butter'], ARRAY['flour', 'butter', 'milk', 'yeast', 'salt']),
('Chocolate Chip Cookie', 'Fresh baked chocolate chip cookie', 60.00, 3, false, 1, 150, ARRAY['wheat', 'eggs', 'milk'], ARRAY['flour', 'chocolate chips', 'butter', 'eggs', 'sugar']),
('Iced Latte', 'Chilled latte over ice', 170.00, 1, false, 3, 110, ARRAY['milk'], ARRAY['espresso', 'cold milk', 'ice']),
('Chai Tea Latte', 'Spiced chai with steamed milk', 190.00, 2, true, 4, 130, ARRAY['milk'], ARRAY['chai tea', 'steamed milk', 'honey']),
('Smoothie Bowl', 'Fresh fruit smoothie bowl', 220.00, 5, true, 5, 180, ARRAY['none'], ARRAY['banana', 'berries', 'yogurt', 'granola'])
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_category ON menu(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_available ON menu(available);
CREATE INDEX IF NOT EXISTS idx_menu_featured ON menu(featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access to menu" ON menu FOR SELECT USING (available = true);
CREATE POLICY "Admin full access to menu" ON menu FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Public insert access to orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access to orders" ON orders FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admin full access to order_items" ON order_items FOR ALL USING (auth.role() = 'admin');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menu_updated_at BEFORE UPDATE ON menu FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
