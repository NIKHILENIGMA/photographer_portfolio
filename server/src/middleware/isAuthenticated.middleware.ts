import { NextFunction, Request, Response } from "express";
import { ACCESS_TOKEN_SECRET } from "../config/app.config";
import { AdminService } from "../services/admin.service";
import { ApiError } from "../util";
import { verifyToken } from "../util/JWT";
import { AppRequest } from "../types/app-request";

function extractTokenFromHeader(header: string): string | null {
  if (!header || header === "") return null;
  const parts = header.split(" ");
  return parts.length === 2 ? parts[1] : null;
}

export const isAuthenticated = async (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  let accessToken;
  if (req.headers.authorization) {
    accessToken = extractTokenFromHeader(req.headers.authorization);
  } else if (req.cookies) {
    const cookies = req.cookies as Record<string, string>; // Check if the token is in cookies
    accessToken = cookies["access_token"]; // Adjust the cookie name as needed
  }

  if (!accessToken) {
    throw new ApiError("Authentication token is missing", 401);
  }

  try {
    const decoded = verifyToken(accessToken, ACCESS_TOKEN_SECRET);

    if (!decoded) {
      throw new ApiError("Invalid token", 401);
    }

    if (!decoded?.sub) {
      throw new ApiError("Invalid token payload", 401);
    }
    const user = await AdminService.findUserById(decoded?.sub); // Ensure the user exists in the database

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    req.user = user; // Attach the decoded token to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    throw new ApiError("User is not authenticated!", 401);
  }
};
