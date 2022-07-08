// Initialize express router
const router = require("express").Router();
require("./auth.router")(router);
require("./product.router")(router);
require("./user.router")(router);
// Export API routes
module.exports = router;
