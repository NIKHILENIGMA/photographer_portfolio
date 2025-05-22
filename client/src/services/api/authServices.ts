import { AUTHENTICATION_URL } from "../../app/constants";
import { AuthResponse, LoginPayload, RegisterPayload, User } from "../../types";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

interface GetUserResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
  statusCode: number;
}

class AuthService {
  private static instance: AuthService;
  private token: string | null;

  private constructor() {
    this.token = localStorage.getItem("access_token");
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private setToken(token: string) {
    this.token = token;
    localStorage.setItem("access_token", token);
  }

  private clearToken() {
    this.token = null;
    localStorage.removeItem("access_token");
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("access_token");
    }
    return this.token;
  }

  async login({ email, password }: LoginPayload) {
    try {
      const response = await fetch(`${API_URL}/${AUTHENTICATION_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      this.setToken(data.data.access_token);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async getProfile(token: string): Promise<GetUserResponse> {
    try {
      const response = await fetch(`${API_URL}/${AUTHENTICATION_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      return await response.json();
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/${AUTHENTICATION_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      return await response.json();
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/${AUTHENTICATION_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      this.setToken(data.accessToken);
      return data;
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${AUTHENTICATION_URL}/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      this.clearToken();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}

export default AuthService.getInstance();
