const { Customer } = require("../models/customer");
const { ctrlWrapper } = require("../utils");

const getOneCustomer = async (req, res) => {
  const data = await Customer.findById(req.params.id);

  res.json({
    data,
  });
};

module.exports = {
  getOneCustomer: ctrlWrapper(getOneCustomer),
};
