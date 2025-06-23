const express = require("express");
const {
  signupController,
  loginController,
  loginWithToken,
  resetPassword,
} = require("../controllers/userController");
const userRouter = express.Router();

// login signup
userRouter.post("/signup", signupController);

userRouter.post("/login", loginController);

userRouter.get("/login", loginWithToken);

userRouter.patch("/resetPassword", resetPassword);


module.exports = userRouter;
