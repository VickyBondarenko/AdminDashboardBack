const { ObjectId } = require("mongodb");
const { Customer } = require("../models/customer");
const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");

const addCustomer = async (req, res) => {
  const { email, name, spent } = req.body;

  let image = "";

  const { _id } = await Customer.create({
    email,
    name,
    spent,
  });

  res.status(201).json({
    _id,
    email,
    name,
    spent,
    image,
  });
};

const getCustomers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  if (page < 1 || limit < 1) {
    throw HttpError(400, "Invalid page or limit value");
  }
  const result = await Customer.find();
  const totalPages = Math.ceil(result.length / limit);

  const data = await Customer.aggregate([
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

const searchCustomers = async (req, res) => {
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

  const allData = await Customer.aggregate([
    {
      $match: searchQuery,
    },
  ]);

  const totalPages = Math.ceil(allData.length / limit);

  const data = await Customer.aggregate([
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

  res.status(200).json({ totalPages, data });
};

const deleteCustomer = async (req, res) => {
  const deletedCustomer = await Customer.findByIdAndRemove(
    req.params.customerId
  );

  if (!deletedCustomer) {
    throw HttpError(
      404,
      `Recipe with id "${req.params.customerId}" is missing`
    );
  }
  res.status(204).send();
};

const updateCustomerById = async (req, res) => {
  const { name } = req.body;
  // const { name, image } = await Customer.findById(req.params.customerId);

  // if (!name && !req.file) {
  //   throw HttpError(400, "Provide all necessary fields");
  // }

  // let imageUrl;

  // if (req.file) {
  //   imageUrl = cloudinary.url(req.file.filename);
  // }

  const data = {
    name: name,
    // image: imageUrl,
  };

  await Customer.findByIdAndUpdate(req.params.customerId, data);

  res.json({
    data,
  });
};

module.exports = {
  addCustomer: ctrlWrapper(addCustomer),
  getCustomers: ctrlWrapper(getCustomers),
  deleteCustomer: ctrlWrapper(deleteCustomer),
  updateCustomerById: ctrlWrapper(updateCustomerById),
  searchCustomers: ctrlWrapper(searchCustomers),
};
