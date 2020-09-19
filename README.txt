I. Tools Used: 

    - $ npm install 
    - $ npm install --save express
    - $ npm install --save body-parser
    - $ npm install --save ejs pug express-handlebars
    - $ npm install --save express-handlebars@3.0
    - $ npm install --save mysql2

    - https://www.mysql.com/
        MySQL Community Server
        https://dev.mysql.com/downloads/mysql/
        > download DMG file

        MySQL Workbench: 
        https://dev.mysql.com/downloads/workbench/
        
        Go to /Desktop/Trung/Programs > open workbench

        setup video > video 138

    - $ npm install --save sequelize


II. Core Concepts: 

    1. Introduction to Sequelize: 

        a. What is Sequelize ?
            - 3rd party package
            - It is an Object Relational Mapping library
                > This means It does all the SQL code behind the 
                scene for us and maps it with Javascript
                > So we never has to write SQL code on our own
            - Here is an example picture: 
            https://drive.google.com/file/d/11uznA6zS_L6T9BAMBVq6dTSyKJfkBW8_/view?usp=sharing

        b. What does Sequelize do ? 
            - Model, Instances, Queries, Associations
            - See demonstration image: 
            https://drive.google.com/file/d/1AWcbPDUxF4Q5JpBJ5NWAqUfa7WfSDgQr/view?usp=sharing

III. Module Notes: 

    1. Setting up: 
        - All see 2nd Commit
        Remember to install all the packages listed above

        a. Database Utility Set Up:
            - Creating Sequilize Instance
            - Creating connection pool to MySQL 
            - See ./util/database.js
            
        b. Sequelize Model Set Up: 
            - Defining Model for Data Operations
            - See ./models/product.js
        
        c. Sequilize Sync Set Up: 
            - Create Tables in Database
            - Make Tables Relations
            - See app.js

    2. Basic Operations: 
        a. Inserting data (Record) to table: 
            - Code in 3rd Commit
            - See ./controllers/admin.js: under postAddProduct()
            to see how to add a Record

            > At this point, only http://localhost:3000/admin/add-product
            works so you can add products to the database
        
        b. Retrieving all Records: 
            - Code in 5th Commit
            - See ./controllers/shop.js: under getIndex() for '/' route
            and getProducts() for '/products' route
        
        c. Retrieving limited Record using where and by ID: 
            - Code in 6th Commit
            - See ./controllers/shop.js: under getProduct()
                2 approach demonstrated here: 
                findByPk(): find by ID
                findAll({where})
IV. Other Notes: 
    This module contain: 
        