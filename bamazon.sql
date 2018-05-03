DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (

    item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    
    product_name VARCHAR(50) NOT NULL,
    
    department_name VARCHAR(50) NOT NULL,
    
    price DECIMAL(10,2) NOT NULL,

    stock_quantity INTEGER(11) 

    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper Airplane", "Important Stuff", 2.49, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grandma's Picture", "Old Things", 4.99, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Your Mom", "Family", 10.19, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Broken Door Knob", "Good Finds", 1, 900);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Old Ice Cubes", "Old Things", .50, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("No ur Mom", "Family", 11.69, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wooden Duck", "Old Things", 18.45, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boombox", "Important Stuff", 56.99, 49), ("Insurance Card", "Important Stuff", 3.49, 15), ("iPhone 3G", "Old Things", 15.33, 240);
