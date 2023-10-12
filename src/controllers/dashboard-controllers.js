const { Customer } = require("../models/customer");
const { IncomeExpens } = require("../models/income-expens");
const { Supplier } = require("../models/supplier");
const { Product } = require("../models/product");
const { ctrlWrapper } = require("../utils");

const getDashboardInfo = async (req, res) => {
  const customersData = await Customer.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  const productsData = await Product.find();

  const suppliersData = await Supplier.find();

  const allCustomers = customersData.length;
  const allProducts = productsData.length;
  const allSuppliers = suppliersData.length;

  const operationData = await IncomeExpens.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  const data = {
    allCustomers,
    allProducts,
    allSuppliers,
    recentCustomers: customersData,
    recentOperations: operationData,
  };

  res.json({
    data,
  });
};

module.exports = {
  getDashboardInfo: ctrlWrapper(getDashboardInfo),
};
