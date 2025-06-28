const express = require("express");
const {
  signupController,
  loginController,
  loginWithToken,
  resetPassword,
  logout,
} = require("../controllers/userController");
const userRouter = express.Router();

// login signup
userRouter.post("/signup", signupController);

userRouter.post("/login", loginController);

userRouter.get("/login", loginWithToken);

userRouter.get("/logout", logout);

userRouter.patch("/resetPassword", resetPassword);


module.exports = userRouter;
