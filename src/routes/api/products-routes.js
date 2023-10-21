const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/product");
const { validateBody } = require("../../utils");

const productsControllers = require("../../controllers/products-controllers");

const { authentificate, isValidId } = require("../../middleWares");

router.post(
  "/",
  authentificate,

  validateBody(schemas.productAddSchema),
  productsControllers.addProducts
);

router.post("/filter", authentificate, productsControllers.searchProducts);

router.get("/", authentificate, productsControllers.getProducts);

router.put(
  "/:id",
  authentificate,
  isValidId,
  productsControllers.editProductById
);

router.delete(
  "/:id",
  authentificate,
  isValidId,
  productsControllers.deleteProductById
);

module.exports = router;
