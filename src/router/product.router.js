// Import product controller
var productController = require("../controller/product.controller");

module.exports = function (router) {
  router
    .route("/products")
    .get(productController.index)
    .post(productController.new);
  router
    .route("/products/:product_id")
    .get(productController.view)
    .patch(productController.update)
    .put(productController.update)
    .delete(productController.delete);
};
