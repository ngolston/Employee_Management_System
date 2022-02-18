
USE employee_db

INSERT INTO departments (id, dpt_name)
VALUES (1, "Editorial"),
       (2, "Production"),
       (3, "Marketing"),
       (4, "Sales");

INSERT INTO roles (id, title, salary, dpt_id)
VALUES (1, "Commissioning Editor", 100000, 1),
       (2, "Copy Editor", 70000, 1),
       (3, "Editorial Assistant", 45000, 1),

       (4, "Production Controller", 70000, 2),
       (5, "Production Assistant", 45000, 2),

       (6, "Marketing Rep", 70000, 3),
       (7, "Marketing Assistant", 45000, 3),

       (8, "Sales Rep", 65000, 4),
       (9, "Sales Admin", 40000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "William S", "Burroughs", 1, NULL),
       (2, "Charles", "Bukowski", 2, 1),
       (3, "Stephen", "King", 2, 1),
       (4, "Fernando", "Pessoa", 3, 1),
       (5, "Ryu", "Murakami", 3, 1),

       (6, "Irvine", "Welsh", 4, NULL),
       (7, "Nick", "Cave", 5, 6),
       (8, "Frank", "Miller", 5, 6),
       (9, "Garth", "Ennis", 5, 6),

       (10, "Gillian", "Flynn", 6, NULL),
       (11, "Cormac", "McCarthy", 7, 10),
       (12, "JG", "Ballard", 7, 10),
       
       
       (13, "Joan", "Didion", 8, NULL),
       (14, "Jean-Paul", "Sartre", 9, 13),
       (15, "Chuck", "Palahniuk", 9, 13),
       (16, "Hubert", "Selby Jr", 9, 13);
