const { prompt } = require("inquirer");
const db = require("./db/connection");
require("console.table");

db.connect(function (err) {
  if (err) throw err;
  console.log("Database has bees succesfully connected!");
});

function departmentsList() {
    let departmentsArr = [];
    db.query("SELECT * FROM departments", (err, res) => {
        if (err) {
            throw err;
        }
        for (let i = 0; i < res.length; i++) {
            departmentsArr.push(res[i].name);
        };
        return departmentsArr;
    });
}

function rolesList() {
    let rolesArr = [];
    db.query("SELECT * FROM roless", (err, res) => {
        if (err) {
            throw err;
        }
        for (let i = 0; i < res.length; i++) {
            rolesArr.push(res[i].name);
        };
        return rolesArr;
    });
}

function managersList() {
    let managersArr = [];
    db.query("SELECT first_name, last_name FROM employees", (err, res) => {
        if (err) {
            throw err;
        }
        for (let i = 0; i < res.length; i++) {
            managersArr.push(res[i].name);
        };
        return managersArr;
    });
}


function addADepartment() {
    prompt([
        {
            type: "input",
            name: "department",
            message: "New department name",
        },
    ]).then((answers) => {
        db.query("INSERT INTO departments VALUES (?)", 
        [answers.department],
        (err) => {
            if (err) {
                throw err;
            };
            console.log(`Succesfully added ${answers.department} to the database`);
            main();
        })
    })
};


function addArole(){
    db.query("SELECT * FROM departments", (err, res) => {
        if (err) {
            throw err;
        }
        prompt([
            {
                type: "input",
                name: "title",
                message: "WHat is the name of this new role?",
            },
            {
                type: "input",
                name: "salary",
                message: "WHat is the salry for this new role?",
            },
            {
                type: "list",
                name: "department",
                message: "WHat department is this new role in?",
                choices: departmentsList(),
            },
        ]).then((answers => {
            let choiceNumber = departmentsList().indexOf(answers.choice) + 1;
            db.query("INSERT INTO roles SET ?", 
            {
                title: answers.title,
                salary: answers.salary,
                department_id: choiceNumber,
            },
            function(err){
                if (err) {
                    throw err;
                }
                console.log(`${answers.title} was succesfully added as a new role`)
                main();
            });
        }));
    });
};


function addAnEmployee(){
    prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employees first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the new employees last name?",
        },
        {
            type: "list",
            name: "role",
            message: "What is the role of this new employees?",
            choices: rolesList(),
        },
        {
            type: "input",
            name: "employeesManager",
            message: "What is the new employees first name?",
            choices: managersList(),
        },
    ]).then((answers) => {
        let roleSelection = rolesList().indexOf(answers.role) + 1;
        let managerSelection = managersList().indexOf(answers.employeesManager) + 1;

        db.query("INSERT INTO employee set ?", 
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: roleSelection,
            manager_id: managerSelection,
        },
        function(err) {
            if (err) {
                throw err;
            }
            console.log(`${answers.firstName} was succesfully added as a new employee`);
            main();
        })
    })
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
        db.end();
    }
  });
};

main();
