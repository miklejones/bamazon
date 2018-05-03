var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.logo("connected as id " + connection.threadId + "\n")
    shwItems();
    connection.end();
});

function start() {
    showItems();
    inquirer
        .prompt({
            name: "pickId",
            type: "rawlist",
            message: "Select the product you wish to purchase by ID.",
        })
}

function showItems() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].price}`); 
        }
        console.log("-----------------------------------");
    })
}