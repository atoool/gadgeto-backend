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
  const {
    title,
    desc,
    price,
    priceSymbol,
    img,
    url,
    category,
    category_id,
    country,
  } = req.body;
  var product = new Product({
    title: title ? title : "",
    desc,
    price,
    priceTip: req.body?.priceTip ?? "",
    priceSymbol,
    img,
    url,
    category,
    category_id,
    country,
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
  Product.find({ country: req.params.product_id }, function (err, product) {
    if (err) res.json({ message: err, status: 500 });
    res.json({
      message: "Product details loading..",
      data: product,
    });
  });
};
// Handle update product info
exports.update = function (req, res) {
  Product.findById(req.params.product_id, function (err, product) {
    if (err) res.json({ message: err, status: 500 });
    const {
      title,
      desc,
      price,
      priceSymbol,
      img,
      category,
      category_id,
      url,
      country,
    } = req.body;
    product.title = title ? title : product.title;
    product.desc = desc;
    product.price = price;
    product.priceTip = req.body?.priceTip ?? "";
    product.priceSymbol = priceSymbol;
    product.img = img;
    product.url = url;
    product.category = category;
    product.category_id = category_id;
    product.country = country;
    // save the product and check for errors
    product.save(function (er) {
      if (er) res.json(er);
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
      _id: req.params.product_id,
    },
    function (err, product) {
      console.log(product);
      if (err) res.send(err);
      else if (product.deletedCount === 0)
        res.json({
          status: "error",
          message: "Found no product with the id requested",
        });
      else
        res.json({
          status: "success",
          message: "Product deleted",
        });
    }
  );
};
