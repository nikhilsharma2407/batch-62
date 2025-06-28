const UserModel = require("../models/UserModel");
const { generateToken, verifyToken } = require("../utils/jwtUtil");
const { generatePassword, verifyPassword } = require("../utils/passwordUtil");
const { errorCreator, responseCreator } = require("../utils/responseHandler");
const { generateQRcode, verifyOTP } = require("../utils/totpUtil");

// const UserModel = require()
const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findUser(username);
    const { password: passwordHash, secret, ...userData } = user;

    if (await verifyPassword(password, passwordHash)) {
      // res.send({
      //   success: true,
      //   message: `${username} logged in successfully`,
      //   data: userData,
      // });
      const token = generateToken(userData);
      res.status(200);
      res.cookie("authToken", token, { maxAge: 3600_000, httpOnly: true });
      res.send(responseCreator(`${username} logged in successfully`, userData));
    } else {
      // const err = new Error("username doesn't exist!!!");
      // err.status = 404;
      // throw err;
      errorCreator("Incorrect Password", 401);
    }
  } catch (error) {
    next(error);
  }
};

const signupController = async (req, res, next) => {
  try {
    const userData = req.body;
    const { username, password } = userData;
    const hashedPwd = await generatePassword(password);
    userData.password = hashedPwd;
    const { qrCode, secret } = await generateQRcode(username);
    const user = await UserModel.createUser({ ...userData, secret });
    if (user) {
      res.status(201);
      res.send(
        responseCreator(
          `account for user - ${username} created successfully!!!`,
          qrCode
        )
      );
      // res.send(`
      // <section>
      //   <h1>Two Factor Auth Setup</h1>
      //   <img src=${qrCode} />
      //   </section>`);
    }
  } catch (error) {
    next(error);
  }
};

const loginWithToken = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    // console.log("🚀 ~ loginWithToken ~ req.headers:", req.headers);
    // const { authorization } = req.headers;
    // const [, token] = authorization.split(" ");
    console.log("🚀 ~ loginWithToken ~ authToken:", authToken);
    const data = verifyToken(authToken);
    if (data) {
      const { username } = data;
      const user = await UserModel.findUser(username);

      res.send(responseCreator("logged in successfully, with token!!!", user));
    }
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { username, password, otp } = req.body;
    const { secret } = await UserModel.findUser(username);

    const isOTPValid = verifyOTP(secret, otp);
    if (isOTPValid) {
      const pwdHash = await generatePassword(password);
      const message = await UserModel.updatePassword(username, pwdHash);
      res.send(responseCreator(message));
    } else {
      errorCreator("Invalid OTP", 401);
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.clearCookie("authToken");
  res.send(responseCreator("Logged out Successfully!!!"));
};

module.exports = {
  loginController,
  signupController,
  loginWithToken,
  resetPassword,
  logout,
};
