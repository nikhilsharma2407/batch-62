const express = require("express");
const {
  signupController,
  loginController,
  loginWithToken,
  resetPassword,
  logout,
} = require("../controllers/merchantController");
const merchantRouter = express.Router();

// login signup
merchantRouter.post("/signup", signupController);

merchantRouter.post("/login", loginController);

merchantRouter.get("/login", loginWithToken);

merchantRouter.get("/logout", logout);

merchantRouter.patch("/resetPassword", resetPassword);


module.exports = merchantRouter;
