const { Order } = require("../models/order");
const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");

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
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: Number(skip),
    },
    {
      $limit: Number(limit),
    },
  ]);

  res.status(200).json({ totalPages, data });
};

const getOrders = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  if (page < 1 || limit < 1) {
    throw HttpError(400, "Invalid page or limit value");
  }
  const result = await Order.find();
  const totalPages = Math.ceil(result.length / limit);

  const data = await Order.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: Number(skip),
    },
    {
      $limit: Number(limit),
    },
  ]);
  res.status(200).json({ totalPages, data });
};

const editOrderById = async (req, res) => {
  const { name, address, products, price, status } = req.body;

  if (!name || !address || !products || !price || !status) {
    throw HttpError(400, "Provide all necessary fields");
  }

  const data = {
    name,
    address,
    products,
    price,
    status,
  };

  await Order.findByIdAndUpdate(req.params.id, data);

  res.json({
    data,
  });
};

module.exports = {
  searchOrders: ctrlWrapper(searchOrders),
  getOrders: ctrlWrapper(getOrders),
  editOrderById: ctrlWrapper(editOrderById),
};
