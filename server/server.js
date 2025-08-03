const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
require("./dbConnection");
const router = require("./routes/router");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");
const errorHandler = require("./utils/errorHandler");
const adminRouter = require("./routes/adminRouter");
const merchantRouter = require("./routes/merchantRouter");
const stripeRouter = require("./routes/stripeRouter");
const app = express();

// we configure the middleware

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// enable our server to parse the request body
app.use(express.json());
app.use(cookieParser());

app.get("/checkServer/:id", (req, res) => {
  console.log("🚀 ~ app.get ~ req.path:", req.path);
  console.log("🚀 ~ app.get ~ req.params.id:", req.params.id);
  console.log("🚀 ~ app.get ~ req.query:", req.query);

  console.log("🚀 ~ app.get ~ req.body:", req.body);

  res.status(200);
  res.send({ sucess: true, message: "Successful response from server!!!" });
});

app.use("/router", router);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/merchant", merchantRouter);

app.use("/stripe", stripeRouter);

app.use("/", express.static(path.join(__dirname, "build")));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.clear();
  console.log(`Server running on PORT - ${PORT}`);
});
