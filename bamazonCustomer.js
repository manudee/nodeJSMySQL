var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "123456",
	database: "bamazon_db"
});


connection.connect(function(err) {
	if (err) throw err;
	start();
});


function start(){
	var sql = "SELECT item_id,product_name,price FROM products";
	connection.query(sql, function(err, results) {
		if (err) throw err;
		console.log("Item_id|product_name|price");
		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + "------|----" + results[i].product_name  + "-----|" + results[i].price);
		}

	})



	inquirer.prompt([{
		name: "productID",
		type: "input",
		message: "What product ID you want to buy?"
	},
	{
		name: "quantity",
		type: "input",
		message: "How many units you want to buy?"
	}]).then(function(answer){
		console.log(answer.productID);
		console.log(answer.quantity);
	})

}
