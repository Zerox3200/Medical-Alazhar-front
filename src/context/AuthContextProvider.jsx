import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    return {
      accessToken: token,
      user,
      isLoggedIn: !!token,
    };
  });

  const updateAuth = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setAuthState({
      accessToken: data.accessToken,
      user: data.user,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setAuthState({ accessToken: null, user: null, isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ authState, updateAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
