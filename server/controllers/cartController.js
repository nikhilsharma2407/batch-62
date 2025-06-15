const { response } = require("express");
const UserModel = require("../models/UserModel");
const { responseCreator } = require("../utils/responseHandler");
const addToCart = async (req, res, next) => {
  try {
    const { username } = res.locals.user;
    const product = req.body;

    const data = await UserModel.addToCart(username, product);

    res.send(responseCreator(`${product.title} is added to cart`, data));
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCart };
