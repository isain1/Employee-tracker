const { prompt } = require("inquirer");
const db = require("./db/connection");
require("console.table");

db.connect(function (err) {
  if (err) throw err;
  console.log("Database has bees succesfully connected!");
});


function addADepartment() {
    prompt([
        {
            type: "input",
            name: "department",
            message: "New department name",
        },
    ]).then((answers) => {
        db.query()
    })
};


function addArole(){

};


function addAnEmployee(){

};


function main() {
  prompt([
    {
      type: "list",
      name: "selection",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Exit",
      ],
    },
  ]).then((answers) => {
    switch (answers.action) {
      case "View all departments":
        db.query("SELECT * FROM departments",
          (err, res) => {
            if (err) throw err;
            console.log("Here is a list of all the departments");
            console.table(res);
            main();
          });
        break;

      case "View all roles":
        db.query("SELECT * FROM roles",
          (err, res) => {
            if (err) throw err;
            console.log("Here is a list of all the roles");
            console.table(res);
            main();
          });
        break;

      case "View all employees":
        db.query("SELECT * FROM employees",
          (err, res) => {
            if (err) throw err;
            console.log("Here is a list of all the employees");
            console.table(res);
            main();
          });
        break;

      case "Add a department":
        addADepartment();
        break;

      case "Add a role":
        addArole();
        break;

      case "Add an employee":
        addAnEmployee();
        break;

      case "Exit":
          console.log("======= Thanks for using me! Good Bye! =======")
    }
  });
};


