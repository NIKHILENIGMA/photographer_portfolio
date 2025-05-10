import { createContext, useContext } from "react";
import { AuthContextType, User } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined); 

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return { ...context, user: context.user as User };
};
