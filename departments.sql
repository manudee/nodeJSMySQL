
USE bamazon_db;

CREATE TABLE departments (
  department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100) NULL,
  over_head_costs VARCHAR(100) NULL,
  PRIMARY KEY (department_id)
);


INSERT INTO departments (department_name, over_head_costs)
VALUES ("Furniture", 10);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cookware", 20);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Dining", 30);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Bedding", 40);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Desserts", 50);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("food", 60);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("drinks", 70);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("accessories", 80);
