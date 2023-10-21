const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/customer");
const { validateBody } = require("../../utils");

const customersControllers = require("../../controllers/customers-controllers");

const {
  authentificate,

  isValidId,
} = require("../../middleWares");

router.post(
  "/",
  authentificate,
  validateBody(schemas.customerAddSchema),
  customersControllers.addCustomer
);

router.get("/", authentificate, customersControllers.getCustomers);

router.post("/filter", authentificate, customersControllers.searchCustomers);

router.put(
  "/:id",
  authentificate,
  isValidId,
  customersControllers.updateCustomerById
);

router.delete(
  "/:id",
  authentificate,
  isValidId,
  customersControllers.deleteCustomer
);

module.exports = router;
