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
		userInput();
	})
}


function userInput(){
	inquirer.prompt([{
		name: "item_id",
		type: "input",
		message: "What product ID you want to buy?"
	},
	{
		name: "quantity",
		type: "input",
		message: "How many units you want to buy?"
	}]).then(function(answer){
		console.log(answer.item_id);
		console.log(answer.quantity);



		var sql = `select stock_quantity from products where item_id = ${answer.item_id}`;
		connection.query(sql, function(err,rows){
			console.log(rows[0].stock_quantity);
			var stock_quantity = rows[0].stock_quantity;

			if(stock_quantity < answer.quantity)
				console.log("Insufficient quantity!");

			else
				updateDB(answer.item_id, answer.quantity);


		})

	})

}


function updateDB(item_id,quantity){

	var sql = `update products set stock_quantity = stock_quantity - ${quantity} where item_id = ${item_id}`;

	connection.query(sql,function(err,rows){
		console.log(rows.affectedRows + " bamazon updated");
		
		var select = `SELECT item_id,product_name,price,stock_quantity FROM products where item_id = ${item_id}`;
		
		connection.query(select, function(err, results) {
			if (err) throw err;
			console.log("Item_id|product_name|price");
			console.log(results[0].item_id + "------|----" + results[0].product_name  + "-----|" + results[0].price + "-----|" + results[0].stock_quantity);
			
			var product = results[0].product_name;
			var cost = results[0].price * quantity;
			console.log("Your total cost for " + product + " is $ " + parseFloat(cost,2));
		})


		connection.end();
	
	});

	

}