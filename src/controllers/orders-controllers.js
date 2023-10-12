const { Order } = require("../models/order");
const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const { cloudinary } = require("../utils");

const searchOrders = async (req, res) => {
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

  const allData = await Order.aggregate([
    {
      $match: searchQuery,
    },
  ]);

  const totalPages = Math.ceil(allData.length / limit);

  const data = await Order.aggregate([
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

  if (data.length === 0) {
    throw HttpError(404);
  }

  res.status(200).json({ totalPages, data });
};

const getOrders = async (req, res) => {
  const result = await Order.find();
  res.status(200).json(result);
};

const editOrderById = async (req, res) => {
  const { name, address, products, price, status } = req.body;

  // if (!name && !address && !products && !price && !status ) {
  //   throw HttpError(400, "Provide all necessary fields");
  // }

  const data = {
    name,
    address,
    products,
    price,
    status,
  };

  await Order.findByIdAndUpdate(req.params.orderId, data);

  res.json({
    data,
  });
};

module.exports = {
  searchOrders: ctrlWrapper(searchOrders),
  getOrders: ctrlWrapper(getOrders),
  editOrderById: ctrlWrapper(editOrderById),
};
