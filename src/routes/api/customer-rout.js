const express = require("express");
const router = express.Router();

const customerController = require("../../controllers/customer-controller");

const { authentificate, isValidId } = require("../../middleWares");

router.get(
  "/:id",
  authentificate,
  isValidId,
  customerController.getOneCustomer
);

module.exports = router;
