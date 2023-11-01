const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/supplier");
const { validateBody } = require("../../utils");
const suppliersControllers = require("../../controllers/suppliers-controllers");
const { authentificate, isValidId } = require("../../middleWares");

router.post(
  "/",
  authentificate,
  validateBody(schemas.supplierAddSchema),
  suppliersControllers.addSuppliers
);

router.get("/", authentificate, suppliersControllers.getSuppliers);

router.post("/filter", authentificate, suppliersControllers.searchSuppliers);

router.put(
  "/:id",
  authentificate,
  isValidId,
  suppliersControllers.editSupplierById
);

module.exports = router;
