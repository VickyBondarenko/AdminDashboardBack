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
  const result = await Supplier.find();
  res.status(200).json(result);
};

const editSupplierById = async (req, res) => {
  const { name, address, suppliers, date, amount, status } = req.body;

  if (!name && !address && !suppliers && !date && !amount && !status) {
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
};
