const AdminModel = require("../models/AdminModel");
const MerchantModel = require("../models/MerchantModel");
const { generateToken, verifyToken } = require("../utils/jwtUtil");
const sendEmail = require("../utils/mailUtil");
const { generatePassword, verifyPassword } = require("../utils/passwordUtil");
const { errorCreator, responseCreator } = require("../utils/responseHandler");
const { generateQRcode, verifyOTP } = require("../utils/totpUtil");

const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await MerchantModel.findUser(username);
    const { password: passwordHash, secret, ...userData } = user;

    if (await verifyPassword(password, passwordHash)) {
      const token = generateToken(userData);
      res.status(200);
      res.cookie("authToken", token, { maxAge: 3600_000, httpOnly: true });
      res.send(responseCreator(`${username} logged in successfully`, userData));
    } else {
      errorCreator("Incorrect Password", 401);
    }
  } catch (error) {
    next(error);
  }
};

const signupController = async (req, res, next) => {
  try {
    const merchantUserData = req.body;
    const { username, password } = merchantUserData;
    const hashedPwd = await generatePassword(password);
    merchantUserData.password = hashedPwd;
    const { qrCode, secret } = await generateQRcode(username);
    const merchant = await MerchantModel.createMerchant({
      ...merchantUserData,
      secret,
    });
    if (merchant) {
      res.status(201);
      // trigger email to all admins
      const [adminEmail] = await AdminModel.getAllAdminEmails();
      const info = await sendEmail({
        to: adminEmail.email,
        from: `"${merchantUserData.name}" <${merchantUserData.email}>`,
        subject: `Requesting Admin approval for merchant onboarding`,
        html: `<h1>Dear Admin <br> Kindly review the onboarding information for the merchant - ${merchantUserData.id}</h1>`,
        text: `Dear Admin, 
        Kindly review the onboarding information for the merchant - ${merchantUserData.id}
        `,
      });
      console.log("🚀 ~ signupController ~ info:", info);
      res.send(
        responseCreator(
          `Merchant account for user - ${username} created successfully!!!`,
          qrCode
        )
      );
    }
  } catch (error) {
    next(error);
  }
};

const loginWithToken = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    console.log("🚀 ~ loginWithToken ~ authToken:", authToken);
    const data = verifyToken(authToken);
    if (data) {
      const { username } = data;
      const user = await MerchantModel.findUser(username);

      res.send(responseCreator("logged in successfully, with token!!!", user));
    }
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { username, password, otp } = req.body;
    const { secret } = await MerchantModel.findUser(username);

    const isOTPValid = verifyOTP(secret, otp);
    if (isOTPValid) {
      const pwdHash = await generatePassword(password);
      const message = await MerchantModel.updatePassword(username, pwdHash);
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
