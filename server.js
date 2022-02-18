require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTbl = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`=== WELCOME TO THE EMPLOYEE TRACKER ===`)
);

async function init() {
  const data = await inquirer.prompt({
    type: "list",
    name: "menu",
    message: "Please choose from the following options:",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employees role",
      "Exit",
    ],
  });

  switch (data.menu) {
    case "View all departments":
      allDepartments();
      break;

    case "View all roles":
      allRoles();
      break;

    case "View all employees":
      allEmployees();
      break;

    case "Add a department":
      addDepartment();
      break;

    case "Add a role":
      addRole();
      break;

    case "Add an employee":
      addEmployee();
      break;

    case "Update an employees role":
      updateEmployee();
      break;

    case "Exit":
      db.end();
      process.exit(0);
      break;
  }
}

async function allDepartments() {
  db.query(
    "SELECT departments.id AS Id, departments.dpt_name AS Department FROM departments",
    function (err, results) {
      if (err) throw err;
      console.log("=== NOW VIEWING ALL DEPARTMENTS IN DATABASE ===");
      console.table(results);
      init();
    }
  );
}

async function allRoles() {
  db.query(
    "SELECT roles.id AS Id, roles.salary AS Salary, roles.title AS Role,  departments.dpt_name AS Department FROM roles JOIN departments ON roles.dpt_id = departments.id",
    function (err, results) {
      if (err) throw err;
      console.log("=== NOW VIEWING ALL ROLES IN DATABASE ===");
      console.table(results);
      init();
    }
  );
}

async function allEmployees() {
  db.query(
    "SELECT employees.id AS Id, employees.first_name AS FirstName, employees.last_name AS LastName, roles.salary AS Salary, roles.title AS Role,  departments.dpt_name AS Department, employees.manager_id AS ManagerId FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.dpt_id = departments.id ORDER BY employees.id;",
    function (err, results) {
      if (err) throw err;
      console.log("=== NOW VIEWING ALL EMPLOYEES IN DATABASE ===");
      console.table(results);
      init();
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Please enter a new department",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO departments (dpt_name) VALUES (?)",
        [answer.addDepartment],
        function (err, results) {
          const query = "SELECT * FROM departments";
          db.query(query, function (err, results) {
            if (err) throw err;
            console.log("=== DEPARTMENT HAS BEEN ADDDED ===");
            console.table(results);
            init();
          });
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "Please enter a new role",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter a salary figure:",
        validate: (value) => {
          if (isNaN(value) === false) return true;
          return false;
        },
      },
      {
        type: "input",
        name: "department",
        message: "Please enter the department the role is in",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO roles (title, salary, dpt_id) VALUES (?, ?, ?)",
        [answer.addRole, answer.salary, answer.department],
        function (err, results) {
          const query = "SELECT * FROM roles";
          db.query(query, function (err, results) {
            if (err) {
              console.log(err);
              throw err;
            }
            console.log("=== ROLE HAS BEEN ADDDED ===");
            console.table(results);
            init();
          });
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter new employees first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter new employees last name",
      },
      {
        type: "input",
        name: "role",
        message: "Please enter the employees role id:",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)",
        [answer.firstName, answer.lastName, answer.role],
        function (err, results) {
          const query = "SELECT * FROM employees";
          db.query(query, function (err, results) {
            if (err) {
              console.log(err);
              throw err;
            }
            console.log("=== EMPLOYEE HAS BEEN ADDDED ===");
            console.table(results);
            init();
          });
        }
      );
    });
}

init();
