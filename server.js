// Dependencies
require('dotenv').config(); // for .env
// Import mysql2 package
const mysql = require('mysql2');
// import inquirer package
const inquirer = require('inquirer');
// import console.table package
const consoleTbl = require('console.table');


// create connection to database
const db = mysql.createConnection(
  {
    host: 'localhost',

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(
    `=== WELCOME TO THE EMPLOYEE TRACKER ===`
  )
);


// async function -> start nenu
async function init() {
  //prompt user to choose an option
  const data = await inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: "Please choose from the following options:",
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employees role',
      'Exit'
    ]
  });
  // switch conditional statment to execute code blocks
  switch(data.menu) {
    case 'View all departments':
      // code block
      allDepartments();
      // breaks out of switch block
      break;
    
    case 'View all roles':
      // code block
      allRoles();
      // breaks out of switch block
      break;

    case 'View all employees':
      // code block
      allEmployees();
      // breaks out of switch block
      break;

    case 'Add a department':
      // code block
      addDepartment();
      // breaks out of switch block
      break;

    case 'Add a role':
      // code block
      addRole();
      // breaks out of switch block
      break;

    case 'Add an employee':
      // code block
      addEmployee();
      // breaks out of switch block
      break;

    case 'Update an employees role':
      // code block
      updateEmployee();
      // breaks out of switch block
      break;

    case 'Exit':
      db.end();
      // exits application
      process.exit(0);
      break; 
  }
}

// function for allDepartments
async function allDepartments() {
  // sql query for database -> in query.sql file
  db.query('SELECT departments.id AS Id, departments.dpt_name AS Department FROM departments', function(err, results) {
    if (err) throw err;
    console.log("=== NOW VIEWING ALL DEPARTMENTS IN DATABASE ===")
    // print results in a table
    console.table(results);
    init()
  })
}

//function for allRoles
async function allRoles() {
  // sql query for database -> in query.sql file
  db.query('SELECT roles.id AS Id, roles.salary AS Salary, roles.title AS Role,  departments.dpt_name AS Department FROM roles JOIN departments ON roles.dpt_id = departments.id', function (err, results) {
    if (err) throw err;
    console.log("=== NOW VIEWING ALL ROLES IN DATABASE ===")
    // print results in a table
    console.table(results);
    init()
  })
}

//function for allEmployees
async function allEmployees() {
  // sql query for database -> in query.sql file
  db.query('SELECT employees.id AS Id, employees.first_name AS FirstName, employees.last_name AS LastName, roles.salary AS Salary, roles.title AS Role,  departments.dpt_name AS Department, employees.manager_id AS ManagerId FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.dpt_id = departments.id ORDER BY employees.id;', function (err, results) {
    if (err) throw err;
    console.log("=== NOW VIEWING ALL EMPLOYEES IN DATABASE ===")
    // print results in a table
    console.table(results);
    init()
  })
}


//function for addDepartment
function addDepartment() {
  // prompt -> user input
  inquirer.prompt([
    {
      // to get name of new department
      type: 'input',
      name: 'addDepartment',
      message: 'Please enter a new department'
    }
  ]).then(function (answer) {
    // sql query for database -> in query.sql file
    db.query('INSERT INTO departments (dpt_name) VALUES (?)', [answer.addDepartment], function (err, results) {
      // to get all data from departments table
      const query = 'SELECT * FROM departments';
      db.query(query, function (err, results) {
        if (err) throw err;
        console.log("=== DEPARTMENT HAS BEEN ADDDED ===")
        // print results in a table
        console.table(results);
        init()
      })
    })
  })
}


//function for addRole
function addRole() {
  //prompts -> user input
  inquirer.prompt([
    {
      // to get name of new role
      type: 'input',
      name: 'addRole',
      message: 'Please enter a new role'
    },
    {
      // to get salary (must be int)
      type: 'input',
      name: 'salary',
      message: 'Please enter a salary figure:',
      validate: value => {
        if(isNaN(value) === false) return true;
        return false;
      }
    },
    {
      // to get department id (must be int)
      type: 'input',
      name: 'department',
      message: 'Please enter the department the role is in'
    }
  ]).then(function (answer) {
    // sql query for database -> in query.sql file
    db.query('INSERT INTO roles (title, salary, dpt_id) VALUES (?, ?, ?)', [answer.addRole, answer.salary, answer.department], function (err, results) {
      // to get all data from roles table
      const query = 'SELECT * FROM roles';
      db.query(query, function (err, results) {
        if (err){
          console.log(err)
          throw err;
        } 
        console.log("=== ROLE HAS BEEN ADDDED ===")
        // print results in a table
        console.table(results);
        init()
      })
    })
  })
}


//function for addEmployee
function addEmployee() {
  //prompts -> user input
  inquirer.prompt([
    {
      // to get name of new employee
      type: 'input',
      name: 'firstName',
      message: 'Please enter new employees first name'
    },
    {
      // to get last name of new employee
      type: 'input',
      name: 'lastName',
      message: 'Please enter new employees last name',
    },
    {
      // to get new employees role (int)
      type: 'input',
      name: 'role',
      message: 'Please enter the employees role id:'
    }
  ]).then(function (answer) {
    db.query('INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)', [answer.firstName, answer.lastName, answer.role], function (err, results) {
      const query = 'SELECT * FROM employees';
      db.query(query, function (err, results) {
        if (err){
          console.log(err)
          throw err;
        } 
        console.log("=== EMPLOYEE HAS BEEN ADDDED ===")
        // print results in a table
        console.table(results);
        init()
      })
    })
  })
}


// function for updateEmployee
// need to still do!


// initialise app
init()











