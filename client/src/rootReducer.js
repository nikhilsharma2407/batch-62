import { combineReducers } from "redux";
import { countReducer } from "./Counter/countReducer";

const initialState = {
  name: "abcd",
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "name":
      return { ...state, name: payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  countReducer,
  userReducer,
});

export default rootReducer;
