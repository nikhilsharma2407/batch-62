import { useContext } from "react";
import { UserContext } from "./UserContextProvider";

export const useIsLoggedIn = () => {
  const { userData } = useContext(UserContext);
  return !!userData?.username
};
