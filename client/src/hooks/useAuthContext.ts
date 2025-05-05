import { createContext, useContext } from "react";
// import { AuthContext } from "../context/authContext";
import { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined); 

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
