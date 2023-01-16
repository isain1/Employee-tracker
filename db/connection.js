const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'i.ibarra12',
        database: 'employee_db'
    },
    console.log("You are connected to the employee_db database")
);

db.connect(function (err) {
    if (err) throw err;
});

module.exports = db
