import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/api/authServices";
import { useNavigate } from "react-router";
import { LoginPayload } from "../types";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { setToken } = useAuthContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate the form data if needed
    if (!loginForm.email || !loginForm.password) {
      console.error("Email and password are required.");
      return;
    }
    const loginPayload = {
      email: loginForm.email,
      password: loginForm.password,
    };

    // Call the login mutation
    const token = await loginMutation.mutateAsync(loginPayload);

    // Store the token in memory 
    setToken(token);

    // After successful login, redirect to the dashboard
    navigate("/admin/dashboard/", { replace: true });
  };

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginPayload) => {
      const response = await AuthService.login(data);
      return response.data.access_token; // Adjust based on your API response structure
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error("Login failed:", error);
    },
  });

  return {
    loginForm,
    handleInputChange,
    handleFormSubmit,
    loginMutation,
  };
};
