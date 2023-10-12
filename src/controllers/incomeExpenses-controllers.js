const { IncomeExpens } = require("../models/income-expens");
const { ctrlWrapper } = require("../utils");

const getOneOperation = async (req, res) => {
  const data = await IncomeExpens.findById(req.params.operationId);

  res.json({
    data,
  });
};

module.exports = {
  getOneOperation: ctrlWrapper(getOneOperation),
};
