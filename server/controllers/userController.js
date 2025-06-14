const UserModel = require("../models/UserModel");
const { generateToken, verifyToken } = require("../utils/jwtUtil");
const { generatePassword, verifyPassword } = require("../utils/passwordUtil");
const { errorCreator, responseCreator } = require("../utils/responseHandler");

// const UserModel = require()
const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findUser(username);
    const { password: passwordHash, ...userData } = user;

    if (await verifyPassword(password, passwordHash)) {
      // res.send({
      //   success: true,
      //   message: `${username} logged in successfully`,
      //   data: userData,
      // });
      const token = generateToken(userData);
      res.status(200);
      res.send(
        responseCreator(`${username} logged in successfully`, {
          ...userData,
          token,
        })
      );
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
    const { password } = userData;
    const hashedPwd = await generatePassword(password);
    userData.password = hashedPwd;
    const user = await UserModel.createUser(userData);
    if (user) {
      res.status(201);
      res.send({
        success: true,
        message: `account for user - ${user.username} created successfully!!!`,
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

const loginWithToken = async (req, res, next) => {
  try {
    console.log("🚀 ~ loginWithToken ~ req.headers:", req.headers);
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    console.log("🚀 ~ loginWithToken ~ token:", token);
    const data = verifyToken(token);
    if (data) {
      const { username } = data;
      const user = await UserModel.findUser(username);

      res.send(responseCreator("logged in successfully, with token!!!", user));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
  signupController,
  loginWithToken,
};
