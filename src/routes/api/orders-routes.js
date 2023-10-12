const express = require("express");
const router = express.Router();

const ordersControllers = require("../../controllers/orders-controllers");

const {
  authentificate,

  //   isValidId,
} = require("../../middleWares");

router.post("/filter", authentificate, ordersControllers.searchOrders);

router.get("/", authentificate, ordersControllers.getOrders);

router.put(
  "/:orderId",
  authentificate,
  // isValidId,
  ordersControllers.editOrderById
);

module.exports = router;
