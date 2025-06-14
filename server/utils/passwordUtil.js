const { compare, genSalt, hash } = require("bcrypt");

const generatePassword = async (password) => {
  const salt = await genSalt();
  const hashedPwd = await hash(password, salt);
  return hashedPwd;
};

const verifyPassword = async (password, hash) => {
  const isPasswordSame = await compare(password, hash);
  return isPasswordSame;
};

module.exports = { generatePassword, verifyPassword };
