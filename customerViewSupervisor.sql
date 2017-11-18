
--DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;


USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);


ALTER TABLE products
ADD product_sales DECIMAL(10,2) DEFAULT 0.00;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("L Section Sofa", "Furniture", 1999.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Papasan Chair", "Furniture", 69.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lounge Chair", "Furniture", 799.99, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dinner Set", "Cookware", 579.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Glassware", "Dining", 34.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Comforter", "Bedding", 57.99, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Plush Blanket", "Bedding", 19.99, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolates", "Desserts", 19.99, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pudding", "Desserts", 29.99, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Muffins", "Desserts", 6.99, 1400);

