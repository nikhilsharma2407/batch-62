const UserModel = require("../models/UserModel");
const { verifyToken } = require("../utils/jwtUtil");

const authController = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    const data = verifyToken(authToken);
    if (data) {
      const { username } = data;
      const { secret, passowrd, ...user } = await UserModel.findUser(username);
      //   res.locals -> placeholder for sending data across controller;
      res.locals.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
