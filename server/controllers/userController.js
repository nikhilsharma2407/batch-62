const UserModel = require("../models/userModel");


const loginController = (req, res) => {
  const { username, password } = req.body;
  const user = UserModel.users.find((user) => user.username === username);

  if (!user) {
    res.status(404);
    res.send({ success: false, message: "Username doesn't exist" });
  } else {
    if (user.password === password) {
      res.status(200);
      res.send({
        success: true,
        message: `${username} logged in successfully`,
        data: user,
      });
    } else {
      res.status(401);
      res.send({
        success: false,
        message: "Incorrect Password!!!",
      });
    }
  }
};

const signupController = (req, res) => {
  const userData = req.body;
  // check if username already exists
  if (UserModel.users.find(({ username }) => username === userData.username)) {
    res.status(403);
    res.send({ success: false, message: "Username already exists" });
  } else {
    UserModel.users.push(userData);
    res.status(201);
    res.send({
      success: true,
      message: `account for user - ${userData.username} created successfully!!!`,
    });
  }
};

module.exports = {
  loginController,
  signupController,
};
