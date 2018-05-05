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
});

function start() {
  showItems();
  connection.query("SELECT * FROM products", function (err, res) {
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
        if (answer.quantity > res[selection].stock_quantity) {
          console.log(`Thing is we dont have that much`)
        } else {
          let newQuantity = res[selection].stock_quantity - answer.quantity;
          let totalCost = res[selection].price * answer.quantity;
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
            function (err) {
              console.log(`Your order of ${answer.quantity} ${res[selection].product_name} costs a total of $${totalCost}`);
              console.log("\nOrder placed successfully!");
              toContinue();

            }
          );
        };
      });
  });
};

function toContinue() {
  inquirer.prompt([{
    name: "continue",
    type: "confirm",
    message: "Do you want to buy something else?"
  }])
    .then(function (answer) {
      if (!answer.continue) {
        connection.end();
      } else {
        start();
      }
    });
}

function showItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    console.log(`\n`);

    for (var i = 0; i < res.length; i++) {
      console.log(`ID: ${res[i].item_id} | ${res[i].product_name} | PRICE: $${res[i].price} | QTY: ${res[i].stock_quantity}`);
    }
    console.log("-----------------------------------");
  })
}