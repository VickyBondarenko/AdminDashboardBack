const express = require("express");
const router = express.Router();

const incomeExpensController = require("../../controllers/incomeExpenses-controllers");

const { authentificate, isValidId } = require("../../middleWares");

router.get(
  "/:operationId",
  authentificate,
  //   isValidId,
  incomeExpensController.getOneOperation
);

module.exports = router;
