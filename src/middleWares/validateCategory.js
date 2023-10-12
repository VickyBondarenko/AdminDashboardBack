const { HttpError } = require("../helpers");
const Product = require("../models/product");

const isValidCategory = async (req, res, next) => {
  const { category } = req.params;
  const data = await Product.findOne({ category: category });
  if (!data) {
    next(HttpError(404, `${category} is not valid category`));
  }
  next();
};

module.exports = isValidCategory;
