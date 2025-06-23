import React from "react";
import { createContext, useState } from "react";

const emptyFn = () => {};

export const UserContext = createContext({
    userData: null,
    message: null,
    success: null,
    isLoading: null,
    setUserData: emptyFn,
    setMessage: emptyFn,
    setSuccess: emptyFn,
    setIsLoading: emptyFn,

});

const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    return (
        <UserContext.Provider value={{
            userData, setUserData, message, setMessage, success,
            setSuccess, isLoading, setIsLoading
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider