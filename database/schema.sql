CREATE DATABASE IF NOT EXISTS saas_ventas;
USE saas_ventas;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(160),
  phone VARCHAR(40),
  company VARCHAR(160),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(160),
  phone VARCHAR(40),
  tax_id VARCHAR(40),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  supplier_id INT UNSIGNED,
  sku VARCHAR(80) NOT NULL UNIQUE,
  scan_code VARCHAR(128) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  description VARCHAR(500),
  sale_price DECIMAL(12, 2) NOT NULL,
  cost_price DECIMAL(12, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  minimum_stock INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  CONSTRAINT chk_products_prices CHECK (sale_price >= 0 AND cost_price >= 0),
  CONSTRAINT chk_products_stock CHECK (stock >= 0 AND minimum_stock >= 0)
);

CREATE TABLE inventory_movements (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  movement_type ENUM('purchase', 'sale', 'adjustment', 'return') NOT NULL,
  quantity INT NOT NULL,
  reference VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_inventory_movements_product FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT chk_inventory_movements_quantity CHECK (quantity <> 0),
  INDEX idx_inventory_movements_product_date (product_id, created_at)
);

CREATE TABLE sales (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  client_id INT UNSIGNED NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  status ENUM('lead', 'proposal', 'won', 'lost') NOT NULL DEFAULT 'lead',
  sale_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sales_client FOREIGN KEY (client_id) REFERENCES clients(id)
);
