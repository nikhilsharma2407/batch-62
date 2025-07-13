const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.EMAIL_USER_NAME, // gfgnodemail -> google username
    pass: process.env.EMAIL_PASSWORD, // qxsl ohfh ewkw xdum-> qxslohfhewkwxdum
  },
});

const sendEmail = async ({ from, to, subject, text, html }) => {
  // const from = `"Admin" <${process.env.EMAIL_USER_NAME}>`;
  //   to = "rishavkumar7630@gmail.com";
  //   subject = "Admin approval notification";
  //   html = `<h1>Congratulation!!!, your merchant onboarding request is approved by admin</h1>`;
  //   text =
  //     "Congratulation!!!, your merchant onboarding request is approved by admin";
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
    console.log("🚀 ~ sendEmail ~ info:", info);
  } catch (error) {
    console.log("🚀 ~ sendEmail ~ error:", error);
  }
};

module.exports = sendEmail;
