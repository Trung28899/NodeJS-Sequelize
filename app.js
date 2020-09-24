const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/*
  An user can offer to sell products 
  therefore, products belong to users

  2nd argument defines how this Association 
  (relation) will be managed, this is optional

  onDelete: "CASCADE" means, if a User is 
  deleted, the Products belong to that User will
  be deleted also
*/
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
// This one is optional
User.hasMany(Product);

/*
  {force: true} will overwrite our table 
  WE DONT USE THIS IN PRODUCTION

  we use this here because we established new
  association between 'product' table and the new
  'user' table. 
  
  Therefore we have to force the program
  to create two new table that are related
*/
sequelize
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
