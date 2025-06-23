import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});
console.log(
  "🚀 ~ process.env.REACT_APP_SERVER_URL:",
  process.env.REACT_APP_SERVER_URL
);

export const ENDPOINTS = {
  USER: {
    SIGNUP: "user/signup",
    LOGIN: "user/login",
    RESET_PASSWORD: "/user/resetPassword",
  },
  CART: {
    ADD: "cart/add",
    REMOVE: "cart/remove",
    INCREMENT: "cart/increment",
    DECREMENT: "cart/decrement",
    CLEAR_CART: "cart/clearCart",
    GET_CART_ITEMS: "cart/getCartItems",
  },
};

export const REQUEST_TYPES = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};
