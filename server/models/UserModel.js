const { Schema, model } = require("mongoose");

const userSchema = new Schema({
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
  cart: {
    type: [Object],
  },
  totalCount: {
    type: Number,
  },
  totalValue: {
    type: Number,
  },
});

const sanitizeUserData = (userData) => {
  const { secret, password, __v, _id, ...data } = userData?.toObject();

  return data;
};

userSchema.statics.createUser = async (userdata) => {
  const data = await UserModel.create(userdata);
  console.log("🚀 ~ userSchema.statics.createUser= ~ user:", data);
  return data;
};

userSchema.statics.findUser = async (username) => {
  const user = (
    await UserModel.findOne({ username }, { _id: 0, __v: 0 })
  )?.toObject();
  if (!user) {
    const err = new Error("username doesn't exist!!!");
    err.status = 404;
    throw err;
  }
  return user;
};

userSchema.statics.updatePassword = async (username, password) => {
  const updateData = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: { password },
    },
    { new: true }
  );
  console.log(
    "🚀 ~ userSchema.statics.updatePassword= ~ updateData:",
    updateData
  );
  if (updateData) {
    return `Password reset succesfully for ${username}`;
  }
};

// {
//   "id": 1,
//   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   "price": 109.95,
//   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   "category": "men's clothing",
//   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   "rating": {
//     "rate": 3.9,
//     "count": 120
//   }
// }

// https://fakestoreapi.com/products

userSchema.statics.addToCart = async (username, product) => {
  const userData = await UserModel.findOneAndUpdate(
    { username },
    {
      $push: { cart: { ...product, quantity: 1 } },
      $inc: { totalCount: 1, totalValue: product.price },
    },
    { new: true }
  );

  return sanitizeUserData(userData);
};

const UserModel = model("users", userSchema);

module.exports = UserModel;
