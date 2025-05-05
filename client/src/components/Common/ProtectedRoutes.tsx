import { FC, ReactNode, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router";

const ProtectedRoutes: FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Return null or a fallback UI while navigating
  }

  return <div>{children}</div>;
};

export default ProtectedRoutes;
