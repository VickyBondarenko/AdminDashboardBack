const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/user");
const { validateBody } = require("../../utils");
const { authentificate } = require("../../middleWares");

const authControllers = require("../../controllers/auth-controllers");

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   authControllers.googleAuth
// );

// router.post(
//   "/register",
//   validateBody(schemas.userRegistrSchema),
//   authControllers.register
// );

router.post(
  "/login",
  validateBody(schemas.userLoginSchema),
  authControllers.login
);

router.get("/user-info", authentificate, authControllers.getCurrent);

router.get("/logout", authentificate, authControllers.logout);

module.exports = router;
