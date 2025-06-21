const express = require("express");
const {
  addToCart,
  removeFromCart,
  increment,
  decrement,
  clearCart,
  getCartItems,
} = require("../controllers/cartController");
const authController = require("../controllers/authController");
const { errorCreator } = require("../utils/responseHandler");
const cartRouter = express.Router();

cartRouter.post("/add", authController, addToCart);
cartRouter.post("/remove", authController, removeFromCart);
cartRouter.patch("/increment", authController, increment);
cartRouter.patch("/decrement", authController, decrement);
cartRouter.put("/clearCart", authController, clearCart);
cartRouter.get("/getCartItems", authController, getCartItems);

cartRouter.all("/*splat", (req, res) => {
  console.log("Cart Wildcard Route");
  errorCreator("Inavlid Route", 404);
});

module.exports = cartRouter;
