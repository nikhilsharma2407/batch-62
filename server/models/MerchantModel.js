const {
  Schema,
  model,
  Types: { Decimal128 },
} = require("mongoose");

const productSchema = new Schema({
  id: { type: String },
  title: { type: String },
  price: { type: Decimal128 },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: {
    rate: Number,
    count: Number,
  },
  PaymentMethods: {
    type: [String],
  },
  discountedPrice: {
    // take it as percent
    type: Decimal128,
  },
  productAlerts: [String],
});

const merchantSchema = new Schema(
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
    secret: {
      type: String,
    },
    promotionalBanner: String,
    onboarding: {
      status: { type: String, default: "Pending" },
      lastUpdateDate: Date,
      requestDate: Date,
      statusUpdatedBy: String,
    },

    products: [productSchema],
  },
  {
    toObject: { getters: true },
  }
);

const sanitizeUserData = (userData) => {
  const { id, secret, password, __v, _id, ...data } = userData?.toObject();

  return data;
};

merchantSchema.statics.createMerchant = async (userdata) => {
  const data = await MerchantModel.create(userdata);
  return data;
};

merchantSchema.statics.findUser = async (username) => {
  const user = (
    await MerchantModel.findOne({ username }, { _id: 0, __v: 0 })
  )?.toObject();
  if (!user) {
    const err = new Error("username doesn't exist!!!");
    err.status = 404;
    throw err;
  }
  return user;
};

merchantSchema.statics.updatePassword = async (username, password) => {
  const updateData = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: { password },
    },
    { new: true }
  );
  if (updateData) {
    return `Password reset succesfully for ${username}`;
  }
};

merchantSchema.statics.getAllMerchantsInfo = async () => {
  const merchants = await MerchantModel.find({}, { products: 0 });

  return merchants.map(sanitizeUserData);
};

merchantSchema.statics.updateOnboardingStatus = async (
  merchantUsername,
  action,
  lastUpdateDate,
  adminUsername
) => {
  const data = await MerchantModel.findOneAndUpdate(
    { username: merchantUsername },
    {
      $set: {
        onboarding: {
          status: action,
          lastUpdateDate,
          statusUpdatedBy: adminUsername,
        },
      },
    },
    { new: true }
  );

  return data;
};

const MerchantModel = model("merchants", merchantSchema);

module.exports = MerchantModel;
