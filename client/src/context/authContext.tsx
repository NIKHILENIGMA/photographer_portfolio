import { FC, ReactNode, useEffect, useState } from "react";
import AuthService from "./../services/api/authServices";
import { User } from "../types";
import { AuthContext } from "../hooks/useAuthContext";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(AuthService.getToken());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AuthService.getProfile(token as string);
        setUser(userData.data);
      } catch (error) {
        setUser(null);
        setToken(null);
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false); // No token, no need to fetch user
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
