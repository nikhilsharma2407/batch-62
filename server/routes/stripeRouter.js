const express = require("express");
const Stripe = require("stripe");
const authController = require("../controllers/authController");
const UserModel = require("../models/UserModel");
const router = express.Router();
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", authController, async (req, res) => {
  const { cart } = res.locals.user;

  try {
    const lineItems = cart.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100), // price in paise
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://gfg-app.onrender.com/success",
      cancel_url: "https://gfg-app.onrender.com/cancel",
    });
    res.cookie("session_id", session.id, { maxAge: 3600_000, httpOnly: true });
    res.json(session);
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/checkout-session", authController, async (req, res) => {
  const { session_id } = req.cookies;
  const user = res.locals.user;

  if (!user?.cart || user.cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty or missing" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const dbUser = await UserModel.findOne({ username: user.username });
    const order = {
      stripeSessionId: session.id,
      username: user.username,
      amountTotal: session.amount_total / 100,
      currency: session.currency,
      paymentStatus: session.payment_status,
      products: user.cart,
    };

    // Optionally clear cart
    dbUser.cart = [];
    dbUser.totalValue = 0;
    dbUser.totalCount = 0;
    if (!dbUser.orders) {
      dbUser.orders = [];
    }
    dbUser.orders.push(order);
    // await dbUser.save();
    // const { id, secret, password, __v, _id, ...data } = dbUser?.toObject();

    res.status(200).json({ message: "Order saved successfully", data: order });
  } catch (error) {
    console.error("❌ Stripe fetch error:", error);
    res.status(500).json({ error: "Failed to fetch Stripe session" });
  }
});

module.exports = router;
