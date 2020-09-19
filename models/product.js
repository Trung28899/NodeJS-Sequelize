/*
  Importing instance from sequelize package
*/
const Sequelize = require("sequelize");
/*
  Importing instance from database utility
*/
const sequelize = require("../util/database");

/*
  Defining product model
  when we import this from other
  modules, we work with promises automatically

  All the methods that comes with Product come from
  Sequelize
*/
const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
