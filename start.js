var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password and must run database first
  password: "",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //afterConnection();
  viewEmp();
  startManaging();
});

function startManaging(){
  inquirer
    .prompt({
      name: "selections",
      type:"list",
      questions: "what would you like to do?",
      choices:[
        "view employee's full info",
        "view departments",
        "view roles",
        "add departments",
        "add roles",
        "add employees",
        "update employee's role"
      ]
    }).then(answer => {
      switch (answer.selections){
        case "view departments":
          viewDept();
          break;

        case "view roles":
          viewRoles();
          break;

        case "view employee's full info":
          viewEmp();
          break;

        case "add departments":
          addDept();
          break;

        case "add roles":
          addRoles();
          break;

        case "add employees":
          addEmployee();
          break;

        case "update employee's role":
          updateEmpRole();
          break;
      }
    })
};
//for reading choices 
//=======================================================================
function viewDept() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log('/n');
    console.table(res);
    //connection.end();
    startManaging()
  });
}

function viewRoles(){
  var query =
  `SELECT r.id, r.title as roles, r.salary
  FROM employee e
  LEFT JOIN role r
  ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id`
  //GROUP BY d.id, d.name`
  connection.query(query, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log('\n');
    console.table(res);
   // connection.end();
   startManaging()
  });
}

function viewEmp(){
  var query =
  `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
  ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
  ON m.id = e.manager_id`

  connection.query(query, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log('/n');
    console.table(res);
    // connection.end();
    startManaging();
  });
}
//=======================================================================

//for creating by inserting 
//=======================================================================

function addDept(){
  inquirer
    .prompt({
      name: "dept",
      type: "input",
      message: "add department"
    }).then(answer => {
  //let sql = "insert into department SET ?";
  connection.query("insert into department SET ?",{ name: answer.dept}, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    startManaging();
    })
  })
}

function addRoles(){
  inquirer
    .prompt([{
      name: "title",
      type: "input",
      message: "title?"
    },
    {
      name: "salary",
      type: "input",
      mesage: "salary?"
    }]).then(answer => {
  //let sql = "insert into department SET ?";
  connection.query("insert into role SET ?",{ title: answer.title, salary: answer.salary}, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    startManaging();
    })
  })
}


function addEmployee(){
  var query =
    `SELECT r.id, r.title, r.salary 
      FROM role r`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));

    console.table(res);
    addEmp(roleChoices);
  }); 
}

  function addEmp(){
    inquirer
    .prompt([{
      type: "input",
      message: "input first name",
      name: "first"
    },
    {
      name:"last",
      type:"input",
      message:"input last name"
    },
    {
      name: "roleID",
      type: "input",
      message: "input role id"
    },
    {
      name:"managerID",
      type:"input",
      message:"input last manager ID"
    }
  ]).then(answer => {
      connection.query("insert into employee SET ?",
       { 
        first_name: answer.first, 
        last_name: answer.last, 
        role_id: answer.roleId, 
        manager_id: answer.managerID
      },
      function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
         startManaging();
    })
  })
}
//=======================================================================

//updating roles
//=======================================================================
// function updateEmpRole(){
//   viewRoles();
//   inquirer
//     .prompt([{
//       name: "role" ,
//       type: "input",
//       message: "which role would you like to update?"
//     }]).then(answer=>{
//     connection.query()

//   connection.query("update role set ? where name ?", {title: answer.title, salary:answer.salary, name}, function(err,res){
//   if(err) throw err;
//     })
//   })
// }

function updateEmpRole() { 
  employeeArray();

}

function employeeArray() {
  console.log("Updating an employee");

  var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);
    console.log("employeeArray To Update!\n")

    roleArray(employeeChoices);
  });
}

function roleArray(employeeChoices) {
  console.log("Updating an role");

  var query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`      
    }));

    console.table(res);
    console.log("roleArray to Update!\n")

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices, roleChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employee SET role_id = ? WHERE id = ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Updated successfully!");

          startManaging();
        });
    });
}

