const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  /*
    This is Sequelize associate function
    This allow us to add record to product 
    database with correct user (userId)

    req.user is passed in a model in app.js
  */
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      userId: req.user.id,
    })
    .then((result) => {
      console.log("Created Product");
      // console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Handling Edit-Product
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  /*
    Getting edit details of all the products of a user
    (passed in request in app.js)
    with a corresponding product ID > get a single product

    This use Sequelize Association
  */
  req.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/*
  Action for editing product
*/
exports.postEditProduct = (req, res, next) => {
  // Get it from the hidden input in edit-product.ejs
  const prodId = req.body.productId;

  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;

      return product.save();
    })
    .then((result) => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Hit Admin Products > '/admin/products'
exports.getProducts = (req, res, next) => {
  /*
    Getting all the products in products table
    with corresponding user (using sequelize 
      association functions)
  */
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/*Action for deleting product*/
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      // This is how we delete product
      return product.destroy();
    })
    .then(() => {
      console.log("Destroy Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.deleteById(prodId);
};
