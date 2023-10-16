const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/api/auth-routes");
const customersRoutes = require("./src/routes/api/customers-routes");
const ordersRoutes = require("./src/routes/api/orders-routes");
const suppliersRoutes = require("./src/routes/api/suppliers-routes");
const productsRoutes = require("./src/routes/api/products-routes");
const customerRoutes = require("./src/routes/api/customer-rout");
const incomeExpensRoutes = require("./src/routes/api/incomeExpense-rout");
const dashboardRoutes = require("./src/routes/api/dashboard-rout");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.json("public"));

app.use("/api/user", authRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/operation", incomeExpensRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
