const { Product } = require("../models/product");
const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");

const addProducts = async (req, res) => {
  const { name, suppliers, stock, price, category } = req.body;
  const id = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  const { _id } = await Product.create({
    id,
    name,
    suppliers,
    stock,
    price,
    category,
  });

  res.status(201).json({
    _id,
    id,
    name,
    suppliers,
    stock,
    price,
    category,
  });
};

const getProducts = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  if (page < 1 || limit < 1) {
    throw HttpError(400, "Invalid page or limit value");
  }
  const result = await Product.find();
  const totalPages = Math.ceil(result.length / limit);
  const data = await Product.aggregate([
    {
      $skip: Number(skip),
    },
    {
      $limit: Number(limit),
    },
  ]);

  res.status(200).json({ totalPages, data });
};

const searchProducts = async (req, res) => {
  const { name, page = 1, limit = 5 } = req.query;

  let searchQuery = "";

  const skip = (page - 1) * limit;
  if (page < 1 || limit < 1) {
    throw HttpError(400, "Invalid page or limit value");
  }

  const regex = /[.*+?^${}()|[\]#\\]/g;
  if (regex.test(name)) {
    throw HttpError(400);
  }

  if (name) {
    searchQuery = { name: { $regex: new RegExp(name, "i") } };
  }

  const allData = await Product.aggregate([
    {
      $match: searchQuery,
    },
  ]);

  const totalPages = Math.ceil(allData.length / limit);

  const data = await Product.aggregate([
    {
      $match: searchQuery,
    },
    {
      $skip: Number(skip),
    },
    {
      $limit: Number(limit),
    },
  ]);

  // if (data.length === 0) {
  //   throw HttpError(404);
  // }

  res.status(200).json({ totalPages, data });
};

const editProductById = async (req, res) => {
  const { name, suppliers, stock, price, category } = req.body;

  if (!name || !suppliers || !stock || !price || !category) {
    throw HttpError(400, "Provide all necessary fields");
  }

  const data = {
    name,
    suppliers,
    stock,
    price,
    category,
  };

  await Product.findByIdAndUpdate(req.params.productId, data);

  res.json({
    data,
  });
};

const deleteProductById = async (req, res) => {
  const deletedProduct = await Product.findByIdAndRemove(req.params.productId);

  if (!deletedProduct) {
    throw HttpError(
      404,
      `Product with id "${req.params.customerId}" is missing`
    );
  }
  res.status(204).send();
};

module.exports = {
  addProducts: ctrlWrapper(addProducts),
  getProducts: ctrlWrapper(getProducts),
  searchProducts: ctrlWrapper(searchProducts),
  editProductById: ctrlWrapper(editProductById),
  deleteProductById: ctrlWrapper(deleteProductById),
};
