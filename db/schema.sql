Drop DATABASE IF EXISTS employee_db;
CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id INT(50) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT
);

CREATE TABLE employees (
    id INT(15) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    role_id INT,
    Manager_id INT
);

