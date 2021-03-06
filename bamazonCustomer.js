// need inquirer
var inquirer = require("inquirer");
// need mysql
var mysql = require("mysql");
require("console.table");

// let queryResults = {};

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
    //if connection is succesful, run the function. have this function commented out until the end
    loadProducts();
    
});

function loadProducts() {
    // var querySQL = "SELECT item_id, product_name, price, stock_quantity FROM products";
    // console.log("loadProducts");
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products",function(error, result){
        if (error) console.log(error);
        // console.log("after error");
        // console.log(result);
        console.table(result);
        // for (var i = 0; i < result.length; i++) {
        //     //[item_id] is acting as my primary key and then using an object literal 
        //     // queryResults[item_id] = {product_name, price, stock_quantity};
        //     console.table(result);
        //     // console.log(queryResults);

        //     // console.log("Item Number: " + result[i].item_id + " || Product Name: " + result[i].product_name + " || Price: " + result[i].price + " || Products Left: " + result[i].stock_quantity);
        // }
        console.log("press the down arrow to continue");
        // connection.end();
    });
    
    runBamazon();

}
// start function
function runBamazon() {
    // user inquirer to prompt user - in this case it would be an input
    inquirer.prompt([
        {
            name: "productID",
            //type should be input
            type: "input",
            message: "What product ID would you like to look up?"

        },

        {
            name: "productAmount",
            // type should be input
            type: "input",
            message: "how many would you like to buy?"
        }
    ]).then(function(answer){
        console.log(answer);
        // var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
        connection.query({
            sql: 'SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = ?', 
            values: [answer.productID, answer.productAmount]
        }, function (error, result){
            if (error) console.log(error);
            
            for (var i = 0; i < result.length; i++) {
                console.log("Item Number: " + result[i].item_id + " || Product Name: " + result[i].product_name + " || Price: " + result[i].price + " || Products Left: " + result[i].stock_quantity);
            }
        });
        console.log(answer.productAmount);
        // connection.end();
        makePurchase(answer.productID, answer.productAmount);
    });   

    function makePurchase(product, quantity) {

        var qInt = parseInt(quantity);
        //update with the quantity you want to buy
        connection.query(
            //uptate query
            "UPDATE products SET stock_quantity=stock_quantity -? WHERE item_id =?",
            //quantity integer and product
            [qInt, product],
            function(error, result){
                if (error) throw error;
                console.log("done");
            }

        );

            


    }
    // 1) id of product they'd like to buy
    // 2) ask how many units theyd like to buy

}


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