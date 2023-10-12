const express = require("express");
const router = express.Router();

const dashboardController = require("../../controllers/dashboard-controllers");

const { authentificate } = require("../../middleWares");

router.get(
  "/",
  authentificate,

  dashboardController.getDashboardInfo
);

module.exports = router;
