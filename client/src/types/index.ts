export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  createdAt: object;
}
// firstName: "sameer ";
// avatarImage: "";
// cloudinaryPublicId: "";
// createdAt: {
// }
// email: "sameerrocks@gmail.com";
// id: "a0828802-0349-4953-9d7f-4daaa1c02cff";
// lastName: "Matonkar";

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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
  message: string;
  createdAt: string;
  updateAt: string;
}

export interface AddFormDetails {
  photo?: File;
  title: string;
  description: string;
  location?: string;
  date?: Date | null;
}

export interface UpdateFormDetails {
  title?: string;
  description?: string;
  location?: string;
  date?: Date | null;
}
