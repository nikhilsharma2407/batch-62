import React, { useContext } from "react";
import { REQUEST_TYPES, axiosInstance } from "./apiUtils";
import { UserContext } from "./UserContextProvider";

const useApi = (url, type = REQUEST_TYPES.GET) => {
  const {
    isLoading,
    message,
    success,
    userData,
    setSuccess,
    setIsLoading,
    setMessage,
    setUserData,
  } = useContext(UserContext);

  const makeRequest = async (payload) => {
    try {
      setIsLoading(true);
      setMessage(null);
      const apiData = (await axiosInstance[type](url, payload)).data;
      const { data, message, success } = apiData;
      setSuccess(success)
      setMessage(message);
      if (data) {
        setUserData(data);
      }
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };

  return { makeRequest, isLoading, message, success, userData };
};

export default useApi;
