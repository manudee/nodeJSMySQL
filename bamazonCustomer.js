var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var table = new Table({
		chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
		, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
		, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
		, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
	});


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
		console.log(" Existing Products Database "); 
		table.push(["itemId","productName","price"]);


		//console.log("Item_id|product_name|price");

		for (var i = 0; i < results.length; i++) {
			//console.log(results[i].item_id + "------|----" + results[i].product_name  + "-----|" + results[i].price);
			table.push([results[i].item_id,results[i].product_name,results[i].price]);

		}

		console.log(table.toString());
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
		console.log(" Item id: " + answer.item_id);
		console.log(" Number of units: " + answer.quantity);



		var sql = `select stock_quantity from products where item_id = ${answer.item_id}`;
		connection.query(sql, function(err,rows){

			table.push(["stock_quantity"]);
			table.push([rows[0].stock_quantity]);
			//console.log(rows[0].stock_quantity);
			var stock_quantity = rows[0].stock_quantity;

			if(stock_quantity < answer.quantity)
				console.log("Insufficient quantity!");

			else
				updateDB(answer.item_id, answer.quantity);


		})

	})

}


function updateDB(item_id,quantity){
	var table = new Table({
		chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
		, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
		, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
		, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
	});


	var sql = `update products set stock_quantity = stock_quantity - ${quantity} where item_id = ${item_id}`;

	connection.query(sql,function(err,rows){
		console.log(" Updates to DB:  " + rows.affectedRows + " Record in bamazon updated");
		
		var select = `SELECT item_id,product_name,price,stock_quantity FROM products where item_id = ${item_id}`;
		
		connection.query(select, function(err, results) {
			if (err) throw err;
			console.log(" Updated Products Database");
			table.push(["itemId","productName","unit price","cost"]);

			var product = results[0].product_name;
			var cost = results[0].price * quantity;
			console.log(" Your total cost for " + product + " is $ " + parseFloat(cost,2));


			//console.log("Item_id|product_name|price");
			table.push([results[0].item_id,results[0].product_name,results[0].price,cost]);
			
			//console.log(results[0].item_id + "------|----" + results[0].product_name  + "-----|" + results[0].price + "-----|" + results[0].stock_quantity);
			console.log(table.toString());
			
		})


		connection.end();

	});

	

}