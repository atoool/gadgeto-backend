// Import product model
const Product = require("../model/product.model");

// Handle index actions
exports.index = function (req, res) {
  Product.get(function (err, products) {
    if (err) {
      res.json({
        status: 404,
        message: err,
      });
    }
    res.json({
      status: 200,
      message: "Products retrieved successfully",
      data: products,
    });
  });
};
// Handle create product actions
exports.new = function (req, res) {
  //   if (req.headers.authorization === "token") {
  //     res.json({
  //       status: 401,
  //       message: "Unauthorized access",
  //     });
  //   }
  const {
    title,
    desc,
    price,
    priceTip,
    priceSymbol,
    img,
    url,
    category,
    category_id,
  } = req.body;
  var product = new Product({
    title: title ? title : "",
    desc,
    price,
    priceTip,
    priceSymbol,
    img,
    url,
    category,
    category_id,
  });
  // save the product and check for errors
  product.save(function (err) {
    if (err) {
      res.json({
        status: 404,
        message: err,
      });
    }
    res.json({
      message: "New product created!",
      data: product,
    });
  });
};
// Handle view product info
exports.view = function (req, res) {
  Product.findById(req.params.product_id, function (err, product) {
    if (err) res.send(err);
    res.json({
      message: "Product details loading..",
      data: product,
    });
  });
};
// Handle update product info
exports.update = function (req, res) {
  Product.findById(req.params.category_id, function (err, product) {
    if (err) res.send(err);
    const { title, desc, price, priceTip, priceSymbol, img, url } = req.body;
    product = {
      title: title ? title : product.title,
      desc,
      price,
      priceTip,
      priceSymbol,
      img,
      url,
      category,
      category_id,
    };
    // save the product and check for errors
    product.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Product Info updated",
        data: product,
      });
    });
  });
};
// Handle delete product
exports.delete = function (req, res) {
  Product.deleteOne(
    {
      title: req.params.product_id,
    },
    function (err, product) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Product deleted",
      });
    }
  );
};
