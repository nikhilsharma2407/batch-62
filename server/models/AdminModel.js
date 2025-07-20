const {
  Schema,
  model,
  Types: { Decimal128 },
} = require("mongoose");
const { generatePassword } = require("../utils/passwordUtil");
const MerchantModel = require("./MerchantModel");

const adminSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username is mandatory!!!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is mandatory!!!"],
    },
    name: {
      type: String,
      required: [true, "name is mandatory!!!"],
    },
    password: {
      type: String,
      required: [true, "password is mandatory!!!"],
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    secret: {
      type: String,
    },
    actions: {
      type: [Object],
    },
  },
  {
    toObject: { getters: true },
  }
);

adminSchema.statics.findUser = async (username) => {
  const user = (
    await AdminModel.findOne({ username }, { _id: 0, __v: 0 })
  )?.toObject();
  if (!user) {
    const err = new Error("admin doesn't exist!!!");
    err.status = 404;
    throw err;
  }
  return user;
};

adminSchema.statics.getAllAdminEmails = async () => {
  const admins = await AdminModel.find({}, { email: 1 });
  console.log("🚀 ~ adminSchema.statics.getAllAdminEmails= ~ admins:", admins);
  if (!admins.length) {
    const err = new Error("no admin doesn't exist!!!");
    err.status = 404;
    throw err;
  }
  return admins;
};

adminSchema.statics.onboardingStatusUpdate = async (
  username,
  action,
  merchantUsername
) => {
  const date = new Date();

  const merchantData = await MerchantModel.updateOnboardingStatus(
    merchantUsername,
    action,
    date,
    username
  );
  console.log("🚀 ~ merchantData:", merchantData);
  const payload = { username, action, merchantUsername, date };
  const data = await AdminModel.updateOne(
    { username },
    {
      $push: { actions: payload },
    }
  );

  return merchantData;
};

const AdminModel = model("admins", adminSchema);

module.exports = AdminModel;
