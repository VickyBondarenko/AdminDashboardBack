const { Supplier } = require("../models/supplier");
const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");

const addSuppliers = async (req, res) => {
  const { name, address, suppliers, date, amount, status } = req.body;

  const { _id } = await Supplier.create({
    name,
    address,
    suppliers,
    date,
    amount,
    status,
  });

  res.status(201).json({
    _id,
    name,
    address,
    suppliers,
    date,
    amount,
    status,
  });
};

const getSuppliers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  if (page < 1 || limit < 1) {
    throw HttpError(400, "Invalid page or limit value");
  }
  const result = await Supplier.find();
  const totalPages = Math.ceil(result.length / limit);

  const data = await Supplier.aggregate([
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

const searchSuppliers = async (req, res) => {
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

  const allData = await Supplier.aggregate([
    {
      $match: searchQuery,
    },
  ]);

  const totalPages = Math.ceil(allData.length / limit);

  const data = await Supplier.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
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

const editSupplierById = async (req, res) => {
  const { name, address, suppliers, date, amount, status } = req.body;

  if (!name || !address || !suppliers || !date || !amount || !status) {
    throw HttpError(400, "Provide all necessary fields");
  }

  const data = {
    name,
    address,
    suppliers,
    date,
    amount,
    status,
  };

  await Supplier.findByIdAndUpdate(req.params.supplierId, data);

  res.json({
    data,
  });
};

module.exports = {
  addSuppliers: ctrlWrapper(addSuppliers),
  getSuppliers: ctrlWrapper(getSuppliers),
  editSupplierById: ctrlWrapper(editSupplierById),
  searchSuppliers: ctrlWrapper(searchSuppliers),
};
