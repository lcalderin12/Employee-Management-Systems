var mysql = require("mysql");
var inquirer = require("inquirer");

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
  startManaging();
});

function startManaging(){
  inquirer
    .prompt({
      name: "selections",
      type:"list",
      questions: "what would you like to do?",
      choices:[
        "view departments",
        "view roles",
        "view employees",
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

        case "view employees":
          viewEmp();
          break;

        case "add departments":
          addDept();
          break;

        case "add roles":
          addRoles();
          break;

        case "add employees":
          addEmp();
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
    console.log(res);
    connection.end();
  });
}

function viewRoles(){
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function viewEmp(){
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
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
    console.log(res);
    startManaging();
    })
  })
}

function addRoles(){
  inquirer
    .prompt([{
      name: "title",
      type: "list",
      message: "title?",
      choices:[
        "manager",
        "engineer",
        "inter"
      ]
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
    console.log(res);
    startManaging();
    })
  })
}

function addEmp(){
  inquirer
    .prompt([{
      name: "first",
      type: "input",
      message: "input first name"
    },
    {
      name:"last",
      type:"input",
      message:"input last name"
    }]).then(answer => {
  //let sql = "insert into department SET ?";
  connection.query("insert into employee SET ?",{ first_name: answer.first, last_name: answer.last}, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    startManaging();
    })
  })
}
//=======================================================================

//updating roles
//=======================================================================
function updateEmpRole(){
  viewRoles();
  inquirer
    .prompt([{
      name: "role" ,
      type: "input",
      message: "which role would you like to update?"
    }]).then(answer=>{
    connection.query()

  connection.query("update role set ? where name ?", {title: answer.title, salary:answer.salary, name}, function(err,res){
  if(err) throw err;
    })
  })
}
