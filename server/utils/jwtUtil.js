const { sign, verify } = require("jsonwebtoken");

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
  return verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
