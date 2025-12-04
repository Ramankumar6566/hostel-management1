import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  function login({ username }) {
    const u = { username, role: "admin" };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  }
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
