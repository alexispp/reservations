import React, { useState, useEffect, useContext, createContext } from "react";
import { login } from "../api/login";

const authContext = createContext();

const baseUrl = process.env.REACT_APP_BASE_URL;

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}> {children} </authContext.Provider>;
};

export const useAuth = () => useContext(authContext);

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  
  
  const signin = async (credentials) => {
    
    const response = await login(credentials)
    setUser(response.user)


    // fetch(baseUrl + "login", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accepts: "application/json",
    //   },
    //   body: JSON.stringify(credentials),
    // })
    //   .then((res) => res.json())
    //   .then((json) => setUser(json.user));
  };
 
  useEffect(() => {
    //check authentication
  }, []);
 
  return {
    user,
    signin,
  };
};
