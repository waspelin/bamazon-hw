// need inquirer
var inquirer = require("inquirer");
// need mysql
var mysql = require("mysql");

// connect to mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "#1Justin",
    database: "bamazon"
});
//test the mysql connection - if connection is success, proceed
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    
});

// start function
// user inquirer to prompt user
// 1) id of product they'd like to buy
// 2) ask how many units theyd like to buy
// query database, list the items available to buy
// inquirer to prompt the items they'd like to buy
// ask how many they'd like
// after taking in amount, verify if we have enough
// products on hand, if not say insufficient quantity
// if i have enough products, i should update
// mysql database, show customer total cost
// multiplication needed