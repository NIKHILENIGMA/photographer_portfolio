export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthContextType {
  user: User | null; // Allow user to be null
  token: string | null;
  setUser: (user: User | null) => void; // Allow user to be null
  setToken: (token: string | null) => void; // Allow token to be null
  loading: boolean;
}


export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string; // in case your backend returns it
}

export interface UpdatePhoto {
  title?: string;
  description?: string;
  location?: string;
  date?: Date;
}

export interface IContactDetails {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  companyName: string,
  phone: string,
  message: string,
  createdAt: string,
  updateAt: string,
}