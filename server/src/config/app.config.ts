import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// PORT
export const PORT = process.env.PORT || 3000;

// Environment
export const NODE_ENV = process.env.NODE_ENV || "development";

// JWT
export const ACCESS_TOKEN_SECRET =
  String(process.env.ACCESS_TOKEN_SECRET) || "";

export const ACCESS_TOKEN_EXPIES_IN =
  process.env.ACCESS_TOKEN_EXPIES_IN ? parseInt(process.env.ACCESS_TOKEN_EXPIES_IN) : 86400;

export const REFRESH_TOKEN_SECRET =
  String(process.env.REFRESH_TOKEN_SECRET) || "";
export const REFRESH_TOKEN_EXPIES_IN = process.env.REFRESH_TOKEN_EXPIES_IN
  ? parseInt(process.env.REFRESH_TOKEN_EXPIES_IN)
  : 43200000;
