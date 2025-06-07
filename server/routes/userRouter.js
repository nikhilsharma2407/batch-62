const express = require('express');
const { signupController, loginController } = require('../controllers/userController');
const userRouter = express.Router()

// login signup
userRouter.post('/signup',signupController);

userRouter.post('/login',loginController);

module.exports = userRouter;