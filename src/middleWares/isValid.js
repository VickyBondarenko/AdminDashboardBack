const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id, customerId } = req.params;
  if (id === "category") {
    throw HttpError(404);
  }

  const idReq = id ? id : customerId;
  if (!isValidObjectId(idReq)) {
    next(HttpError(404, `${idReq} is not valid id`));
  }
  next();
};

module.exports = isValidId;
