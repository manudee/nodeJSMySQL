# bamazon application

This is a CLI Node app which includes mysql database for storing a product inventory for Bamazon!.
The database files can be found in 
  * customerView.sql

Database is called Bamazon with a products table to hold all the different products available in the inventory.
It also includes a a table to hold list of all the departments.

Javascript files for each type of user role(either customer/manager) are found below
  * bamazonCustomer.js
  * bamazonManager.js
  * bamazonSupervisor.js

Based on the various user roles, the application provides different options to the user, so appropriate action can be taken on the database.


# Functionality 
Below are some screenshots to go over the application functionality for each user role.

## User Role: Customer
 ### Positive case transaction
 ![GitHub Logo](/images/bamazonCustomer.png)

 ### Negative case transaction
 ![GitHub Logo](/images/bamazonCustomerNegativeCase.png)


## User Role: bamazon Manager
 ### ViewSale
 ![GitHub Logo](/images/bamazonManagerViewSale.PNG)

 ### ViewLowInventory
 ![GitHub Logo](/images/bamazonManagerViewLowInventory.PNG)

 ### AddtoInventory
 ![GitHub Logo](/images/bamazonManagerAddToInventory.PNG)


 ### AddNewProduct
 ![GitHub Logo](/images/bamazonManagerAddNewProduct.PNG)


## User Role: bamazon Supervisor

  ### View Sale by department
  ![GitHub Logo](/images/bamazonSupervisorViewSale.PNG)

  ### Add new department
  ![GitHub Logo](/images/bamazonSupervisorCreateNewDepartment.PNG)
