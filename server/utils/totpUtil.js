const speakeasy = require("speakeasy");
const QRcode = require("qrcode");

const generateQRcode = async (username) => {
  const { base32: secret, otpauth_url } = speakeasy.generateSecret({
    issuer: "GeeksForGeeks",
    name: username,
  });
  console.log("🚀 ~ generateQRcode ~ otpauth_url:", otpauth_url)
  const qrCode = await QRcode.toDataURL(otpauth_url);
  return { secret, qrCode };
};

const verifyOTP = (secret, otp) => {
  const isVerified = speakeasy.totp.verify({
    secret,
    token: otp,
    encoding: "base32",
  });
  return isVerified;
};

// const secret = speakeasy.generateSecret({});
// base64 - A-Za-z0-9+/
// base32 - A-Z2-7

module.exports = { generateQRcode, verifyOTP };
