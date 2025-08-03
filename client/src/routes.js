import { lazy } from "react";

const { Parent, Child1, Child2, Child3 } = lazy(()=>import("./Parent")) ;
const Cart = lazy(() => import("./Cart/Cart"));
const Counter = lazy(() => import("./Counter"));
const Flexbox = lazy(() => import("./Flexbox"));
const Products = lazy(() => import("./Products"));
const EditableProductCard = lazy(() =>
  import("./Products/EditableProductCard")
);
const FormikWrapper = lazy(() =>
  import("./Products/EditableProductCard/FormikWrapper")
);
const FuntionalComponent = lazy(() => import("./FuntionalComponent"));
const Login = lazy(() => import("./Login"));
const MerchantOnboardingTable = lazy(() => import("./MerchantOnboardingTable"));
const PaginatedProducts = lazy(() => import("./Products/PaginatedProducts"));
const Routing = lazy(() => import("./Routing"));
const Signup = lazy(() => import("./Signup"));

export const routes = [
  { path: "", element: <PaginatedProducts /> },
  { path: "admin/onboarding", element: <MerchantOnboardingTable /> },
  { path: "products", element: <PaginatedProducts /> },
  { path: "edit", element: <FormikWrapper /> },
  { path: "test", element: <FuntionalComponent /> },
  { path: "flex", element: <Flexbox /> },
  { path: "cart", element: <Cart /> },
  { path: "reducer", element: <Counter /> },
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
