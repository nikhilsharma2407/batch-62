import Flexbox from "./Flexbox";
import FuntionalComponent from "./FuntionalComponent";
import Login from "./Login";
import Parent, { Child1, Child2, Child3 } from "./Parent";
import Products from "./Products";
import EditableProductCard from "./Products/EditableProductCard";
import FormikWrapper from "./Products/EditableProductCard/FormikWrapper";
import Routing from "./Routing";
import Signup from "./Signup";

export const routes = [
  { path: "", element: <Products /> },
  { path: "edit", element: <FormikWrapper /> },
  { path: "test", element: <FuntionalComponent /> },
  { path: "flex", element: <Flexbox /> },
  {
    path: "routing/:productId",
    element: <Routing />,
  },
  {
    path: "parent",
    element: <Parent />,
    children: [
      { path: "child1", element: <Child1 /> },
      { path: "child2", element: <Child2 /> },
      { path: "child3", element: <Child3 /> },
    ],
  },
  { path: "abcd", element: <h1>abcd</h1> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
];
