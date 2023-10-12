const express = require("express");
const router = express.Router();

const customerController = require("../../controllers/customer-controller");

const { authentificate, isValidId } = require("../../middleWares");

router.get(
  "/:customerId",
  authentificate,
  isValidId,
  customerController.getOneCustomer
);

module.exports = router;
