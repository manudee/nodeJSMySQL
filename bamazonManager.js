var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "123456",
	database: "bamazon_db"
});


connection.connect(function(err) {
	if (err) throw err;
	showOptions();
});


function showOptions(){

	inquirer.prompt([{
		name: "option",
		type: "list",
		message: "What would you like to do?",
		choices: [
		"View Products for sale",
		"View Low Inventory",
		"Add to Inventory",
		"Add New Product"
		]
	}]).then(function(answer){
		console.log(answer.option);

		switch(answer.option){
			case "View Products for sale":
			viewSale();
			break;

			case "View Low Inventory":
			viewLowInventory();
			break;

			case "Add to Inventory":
			addToInventory();
			break;

			case "Add New Product":
			addNewProducts();
			break;
		}

	})
}

function viewSale(){

	var sql = "SELECT item_id,product_name,price, stock_quantity FROM products";
	connection.query(sql, function(err, results) {
		if (err) throw err;
		console.log("Item_id|product_name|price|Quantity");

		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + "------|----" + results[i].product_name  + "-----|" + results[i].price + "-----|" + results[i].stock_quantity);
		}
		showOptions();
	})

	// connection.end();

}


function viewLowInventory(){

	var sql = "SELECT item_id,product_name,price, stock_quantity FROM products where stock_quantity < 5";
	connection.query(sql, function(err, results) {
		if (err) throw err;
		console.log("Item_id|product_name|price|Quantity");

		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + "------|----" + results[i].product_name  + "-----|" + results[i].price + "-----|" + results[i].stock_quantity);
		}
		showOptions();
	})

	// connection.end();


}


function addToInventory(){


	inquirer.prompt([{
		name: "item_id",
		type: "input",
		message: "What product ID you want to add"
	},
	{
		name: "quantity",
		type: "input",
		message: "How many units you want to add?"
	}]).then(function(answer){
		console.log(answer.item_id);
		console.log(answer.quantity);
		viewSale();

		var sql = `UPDATE products SET stock_quantity = stock_quantity + ${answer.quantity} where item_id = ${answer.item_id}`;
		connection.query(sql, function(err,rows){
			console.log(rows.affectedRows);

			var select = `SELECT item_id,product_name,price,stock_quantity FROM products`;

			connection.query(select, function(err, results) {
				if (err) throw err;
				console.log("Item_id|product_name|price|Quantity");

				for (var i = 0; i < results.length; i++) {
					console.log(results[i].item_id + "------|----" + results[i].product_name  + "-----|" + results[i].price + "-----|" + results[i].stock_quantity);
				}
				showOptions();
			})

			// connection.end();
		});



	});

}


function addNewProducts(){

	inquirer
	.prompt([
	{
		name: "product_name",
		type: "input",
		message: "What product_name you would like to add??"
	},
	{
		name: "department_name",
		type: "input",
		message: "What department_name would you like to add?",
	},
	{
		name: "price",
		type: "input",
		message: "What price would you like to add?",
	},
	{
		name: "stock_quantity",
		type: "input",
		message: "What stock_quantity would you like to add?",
	}
	]).then(function(answer){


		console.log(answer.item_id);
		console.log(answer.product_name);
		console.log(answer.department_name);
		console.log(answer.price);
		console.log(answer.stock_quantity);

		var insert = `INSERT INTO products (product_name, department_name, price, stock_quantity)
		VALUES ('${answer.product_name}','${answer.department_name}','${answer.price}','${answer.stock_quantity}')`;

		connection.query(insert, function(err,results){
			if (err) throw err;
			console.log(results);
			var select = `SELECT item_id,product_name,price,stock_quantity FROM products`;

			connection.query(select, function(err, results) {
				if (err) throw err;
				console.log("Item_id|product_name|price|Quantity");

				for (var i = 0; i < results.length; i++) {
					console.log(results[i].item_id + "------|----" + results[i].product_name  + "-----|" + results[i].price + "-----|" + results[i].stock_quantity);
				}
				showOptions();
			})

			// connection.end();

		})


	})

}