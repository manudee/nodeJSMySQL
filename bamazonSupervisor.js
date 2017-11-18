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
	showOptions();
});


function showOptions(){

	inquirer.prompt([{
		name: "option",
		type: "list",
		message: "What would you like to do?",
		choices: [
		"View Product Sales by Department",
		"Create New Department"]
	}]).then(function(answer){
		console.log(answer.option);

		switch(answer.option){
			case "View Product Sales by Department":
			viewSaleByDepartment();
			break;

			case "Create New Department":
			createNewDepartment();
			break;
		}

	})
}

function viewSaleByDepartment(){

	var table = new Table({
		chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
		, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
		, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
		, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
	});

	var sql = "select d.department_id, d.department_name,d.over_head_costs, sum(product_sales) as product_sales, (sum(product_sales) - d.over_head_costs) as total_profit from departments d inner join products p	on d.department_name = p.department_name group by d.department_name";
	connection.query(sql, function(err, results) {
		if (err) throw err;
		console.log(" Sale by Department ");
		//console.log("Item_id|product_name|price|Quantity");
		table.push(["department_id","department_name","over_head_costs","product_sales","total_profit"]);

		for (var i = 0; i < results.length; i++) {
			//console.log(results[i].item_id + "------|----" + results[i].product_name  + "-----|" + results[i].price + "-----|" + results[i].stock_quantity);
			table.push([results[i].department_id,results[i].department_name,results[i].over_head_costs,results[i].product_sales,results[i].total_profit]);

		}
		console.log(table.toString());
		showOptions();
	})

	//connection.end();

}



function createNewDepartment(){
	var table = new Table({
		chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
		, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
		, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
		, 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
	});

	inquirer
	.prompt([
		{
		name: "department_name",
		type: "input",
		message: "What department_name would you like to add?",
	},
	{
		name: "over_head_costs",
		type: "input",
		message: "What is the over_head_costs for this department?",
	}
	]).then(function(answer){


		

		console.log(answer.department_name);
		console.log(answer.over_head_costs);


		var insert = `INSERT INTO departments (department_name, over_head_costs)
		VALUES ('${answer.department_name}','${answer.over_head_costs}')`;

		connection.query(insert, function(err,results){
			if (err) throw err;
			//console.log(results);
			var select = `SELECT * FROM departments`;

			connection.query(select, function(err, results) {
				if (err) throw err;
				table.push(["department_name","over_head_costs"]);
				//console.log("Item_id|product_name|price|Quantity");

				for (var i = 0; i < results.length; i++) {
					//console.log(results[i].item_id + "------|----" + results[i].product_name  + "-----|" + results[i].price + "-----|" + results[i].stock_quantity);
					table.push([results[i].department_name,results[i].over_head_costs]);
				}
				console.log(table.toString());
				showOptions();
			})

			// connection.end();

		})


	})

}