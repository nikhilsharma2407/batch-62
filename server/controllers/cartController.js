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

const removeFromCart = async (req, res, next) => {
  try {
    const { username } = res.locals.user;
    const product = req.body;

    const data = await UserModel.removeFromCart(username, product);

    res.send(responseCreator(`${product.title} is removed from cart`, data));
  } catch (error) {
    next(error);
  }
};

const increment = async (req, res, next) => {
  try {
    const { username } = res.locals.user;
    const product = req.body;

    const data = await UserModel.increment(username, product);

    res.send(responseCreator(`1 more ${product.title} added to cart`, data));
  } catch (error) {
    next(error);
  }
};

const decrement = async (req, res, next) => {
  try {
    const { username } = res.locals.user;
    const product = req.body;

    const data = await UserModel.decrement(username, product);

    res.send(responseCreator(`1 ${product.title} removed from cart`, data));
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const { username } = res.locals.user;

    const data = await UserModel.clearCart(username);

    res.send(responseCreator(`cart cleared`, data));
  } catch (error) {
    next(error);
  }
};

const getCartItems = async (req, res, next) => {
  try {
    const { username } = res.locals.user;

    const data = await UserModel.getCartItems(username);

    res.send(responseCreator(`cart items`, data));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  increment,
  decrement,
  clearCart,
  getCartItems,
};
