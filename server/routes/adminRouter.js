const express = require("express");
const {
  signupController,
  loginController,
  loginWithToken,
  resetPassword,
  logout,
  updateOnboardingStatus,
} = require("../controllers/adminController");
const { getAllMerchants } = require("../controllers/adminController");
const authController = require("../controllers/authController");
const adminAuthController = require("../controllers/adminAuthController");
const AdminModel = require("../models/AdminModel");
const adminRouter = express.Router();

// login signup
adminRouter.post("/signup", signupController);

adminRouter.post("/login", loginController);

adminRouter.get("/login", loginWithToken);

adminRouter.get("/logout", logout);

adminRouter.patch("/resetPassword", resetPassword);

adminRouter.get(
  "/getMerchantsInfo",
  (req, res, next) => {
    authController(req, res, next, AdminModel);
  },
  adminAuthController,
  getAllMerchants
);

// "/onboarding-status-update/approve",
// "/onboarding-status-update/reject",
adminRouter.patch(
  "/onboarding-status-update",
  (req, res, next) => {
    authController(req, res, next, AdminModel);
  },
  adminAuthController,
  updateOnboardingStatus
);

adminRouter.all('/*splat',(req,res)=>{
  console.log('Wildcard Route');
  res.status(404);
  res.send({success:false, message:'Invalid Route'})
})

module.exports = adminRouter;
