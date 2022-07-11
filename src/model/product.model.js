var mongoose = require("mongoose");
// Setup schema
var productSchema = new mongoose.Schema({
  title: String,
  desc: String,
  priceTip: String,
  price: Number,
  priceSymbol: String,
  url: String,
  img: Array,
  category: String,
  category_id: Number,
  country: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});
// Export Contact model
const Product = (module.exports = mongoose.model("product", productSchema));
module.exports.get = function (callback, limit) {
  Product.find(callback).limit(limit);
};
