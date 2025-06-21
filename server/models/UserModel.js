const {
  Schema,
  model,
  Types: { Decimal128 },
} = require("mongoose");

const userSchema = new Schema(
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
    cart: {
      type: [Object],
    },
    totalCount: {
      type: Number,
    },
    totalValue: {
      type: Decimal128,
      set: (value) => new Decimal128(value.toFixed(2)),
      get: (value) => parseFloat(value),
      default: 0,
    },
  },
  {
    toObject: { getters: true },
  }
);

const sanitizeUserData = (userData) => {
  const { id, secret, password, __v, _id, ...data } = userData?.toObject();

  return data;
};

userSchema.statics.createUser = async (userdata) => {
  const data = await UserModel.create(userdata);
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
//   },
//  quantity: 1
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

userSchema.statics.removeFromCart = async (username, product) => {
  const userData = await UserModel.findOneAndUpdate(
    { username },
    {
      $pull: { cart: { id: product.id } },
      $inc: {
        totalCount: -product.quantity,
        totalValue: -product.quantity * product.price,
      },
    },
    { new: true }
  );

  return sanitizeUserData(userData);
};

userSchema.statics.increment = async (username, product) => {
  const userData = await UserModel.findOneAndUpdate(
    {
      username,
      "cart.id": product.id,
    },
    {
      $inc: {
        totalCount: 1,
        totalValue: product.price,
        "cart.$.quantity": 1,
      },
    },
    { new: true }
  );

  return sanitizeUserData(userData);
};

userSchema.statics.decrement = async (username, product) => {
  if (product.quantity === 1) {
    return UserModel.removeFromCart(username, product);
  }
  const userData = await UserModel.findOneAndUpdate(
    {
      username,
      "cart.id": product.id,
    },
    {
      $inc: {
        totalCount: -1,
        totalValue: -product.price,
        "cart.$.quantity": -1,
      },
    },
    { new: true }
  );

  return sanitizeUserData(userData);
};

userSchema.statics.clearCart = async (username) => {
  const userData = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: {
        cart: [],
        totalCount: 0,
        totalValue: 0,
      },
    },
    { new: true }
  );
  return sanitizeUserData(userData);
};

userSchema.statics.getCartItems = async (username, product) => {
  const cartItems = await UserModel.findOne(
    { username },
    { cart: 1, totalCount: 1, totalValue: 1 }
  );

  return sanitizeUserData(cartItems);
};

const UserModel = model("users", userSchema);

module.exports = UserModel;
