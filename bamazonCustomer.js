var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n")
  start();
  connection.end();
});

function start() {
  showItems();
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer.prompt([{
      name: "choice",
      type: "input",
      message: "What is the product ID of the item you would like to purchase?"
    }, {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?"
    }])
      .then(function (answer) {
        var selection = answer.choice - 1;
        if (answer.quantity > results[selection].stock_quantity) {
          console.log('boobzzz')
        } else {
          let newQuantity = results[selection].stock_quantity - answer.quantity;
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: answer.choice
              }
            ],
            function (error) {
              if (err) throw err;
              console.log("Order placed successfully!");
              console.log(results[selection].stock_quantity)
              // start();

            }
          );
        };

      });
  });
};

function showItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].price}`);
    }
    console.log("-----------------------------------");
  })
}