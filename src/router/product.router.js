// Import product controller
let productController = require("../controller/product.controller");
const authJwt = require("../middleware/authJwt");

module.exports = function (router) {
  router
    .route("/products")
    .get(productController.index)
    .post([authJwt.verifyToken, authJwt.isAdmin], productController.new);
  router
    .route("/products/:product_id")
    .get(productController.view)
    .patch([authJwt.verifyToken, authJwt.isAdmin], productController.update)
    .put([authJwt.verifyToken, authJwt.isAdmin], productController.update)
    .delete([authJwt.verifyToken, authJwt.isAdmin], productController.delete);
};
