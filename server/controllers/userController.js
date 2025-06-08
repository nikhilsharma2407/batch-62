const UserModel = require("../models/UserModel");

// const UserModel = require()
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findUser(username);
    const { password: userPassword, ...userData } = user;

    if (userPassword === password) {
      res.status(200);
      res.send({
        success: true,
        message: `${username} logged in successfully`,
        data: userData,
      });
    } else {
      res.status(401);
      res.send({
        success: false,
        message: "Incorrect Password!!!",
      });
    }
  } catch (error) {
    if (error.status){
      res.status(error.status);
    }
    res.send({ success: false, message: error.message });
  }
};

const signupController = async (req, res) => {
  const userData = req.body;
  const user = await UserModel.createUser(userData);
  if (user) {
    res.status(201);
    res.send({
      success: true,
      message: `account for user - ${user.username} created successfully!!!`,
      data: user,
    });
  }
};

module.exports = {
  loginController,
  signupController,
};
