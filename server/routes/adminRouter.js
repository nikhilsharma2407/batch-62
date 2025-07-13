const express = require("express");
const {
  signupController,
  loginController,
  loginWithToken,
  resetPassword,
  logout,
} = require("../controllers/merchantController");
const adminRouter = express.Router();

// login signup
adminRouter.post("/signup", signupController);

adminRouter.post("/login", loginController);

adminRouter.get("/login", loginWithToken);

adminRouter.get("/logout", logout);

adminRouter.patch("/resetPassword", resetPassword);


module.exports = adminRouter;
