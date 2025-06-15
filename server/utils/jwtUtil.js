const { sign, verify } = require("jsonwebtoken");
const { errorCreator } = require("./responseHandler");

const SECRET_KEY = "MY_SECRET_KEY";

const generateToken = (userdata, time = "1h") => {
  const { username } = userdata;
  //   $2b$10$iuoEkFhZo4Y8dOGuIsyPc.
  const token = sign({ username }, SECRET_KEY, {
    expiresIn: time,
  });

  return token;
};

const verifyToken = (token) => {
  if (!token) {
    errorCreator("Token Missing, Please Login to continue", 401);
  }
  return verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
