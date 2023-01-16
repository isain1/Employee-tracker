use employee_db

insert INTO departments (name)
VALUES
    ('Technology'),
    ('Production'),
    ('Sales'),
    ('Marketing'),
    ('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Web Developer', 115000, 1),
    ('Senior Engineer', 155000, 1),
    ('Production Coordinator', 85000, 2),
    ('Production Director', 105000, 2),
    ('Salesperson', 75000, 3),
    ('Sales Manager', 100000, 3),
    ('Marketing Analyst', 75000, 4),
    ('Chief Marketing Officer', 155000, 4),
    ('Underwriter', 85000, 5),
    ('Chief Financial Officer', 155000, 5);

INSERT INTO employees (first_name, last_name, role_id, Manager_id)
VALUES
    ('Gwen', 'Parsons', 1, 2),
    ('Tonya', 'Kim', 2, NULL),
    ('Nicole', 'Moody', 3, 4),
    ('Darla', 'Padilla', 4, NULL),
    ('Cory', 'Wilkerson', 5, 6),
    ('Derrick', 'Carr', 6, NULL),
    ('Crystal', 'Henry', 7, 8),
    ('Bertha', 'Briggs', 8, NULL),
    ('Opal', 'Hall', 9, 10),
    ('Marta', 'Rodgers', 10, NULL);




