/*
  THIS CONTROLLER WILL BE IMPORTED IN ./routes/ file
*/

const Product = require("../models/product");
const Cart = require("../models/cart");

// click Products > '/products'
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

// click Products > '/products/productId'
exports.getProduct = (req, res, next) => {
  const prodID = req.params.productId;
  Product.findById(prodID)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

// main page > "/"
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

// click Cart > "/cart" => GET
exports.getCart = (req, res, next) => {
  // rendering ./views/shop/cart.ejs
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductsData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductsData) {
          cartProducts.push({
            productData: product,
            qty: cartProductsData.qty,
          });
        }
      }

      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

// click Cart > "/cart" => POST
exports.postCard = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

// click Orders > "/orders"
exports.getOrders = (req, res, next) => {
  // rendering ./views/shop/orders.ejs
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

// "/checkout"
exports.getCheckout = (req, res, next) => {
  // rendering ./views/shop/checkout.ejs
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
