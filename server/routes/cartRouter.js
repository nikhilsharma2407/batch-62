const express = require("express");
const { addToCart } = require("../controllers/cartController");
const authController = require("../controllers/authController");
const cartRouter = express.Router();

cartRouter.post("/add", authController, addToCart);

module.exports = cartRouter;
