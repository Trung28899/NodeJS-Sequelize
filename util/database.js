const Sequelize = require("sequelize");

/*
  db name, username, password, config object
  This will create a connection pool just like
  the SQL approach we used in the NodeJS-SQL Module
*/
const sequelize = new Sequelize("node-complete", "root", "trungtrinh38", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
