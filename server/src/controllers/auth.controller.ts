import { Request, Response } from "express";
import { ApiError, ApiResponse } from "../util";
import { AuthenticationServices } from "../services/auth.service";
import { loginSchema, signupSchema } from "../validators/auth.validators";
import { z } from "zod";
import { AppRequest } from "../types/app-request";
import { Authenticated } from "../types/base.types";

export class AuthenticationController {
  static async signup(req: Request, res: Response) {
    try {
      const validateData = signupSchema.parse(req.body);

      const successMessage = await AuthenticationServices.register(
        validateData
      );

      if (!successMessage) {
        throw new ApiError("Service failed to register", 403);
      }

      res
        .status(200)
        .json(ApiResponse.successResponse(successMessage, {}, 201));
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiError(error.errors.map((e) => e.message).join(", "), 400);
      } else if (error instanceof Error) {
        const errMessage = error.message;

        if (errMessage.includes("already exist")) {
          throw new ApiError(errMessage, 409);
        } else if (errMessage.includes("Failed to register")) {
          throw new ApiError(errMessage, 400);
        }
      }

      throw new ApiError("An unexpected error occurred while signup", 500);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const validateData = loginSchema.parse(req.body);

      const tokens = await AuthenticationServices.login(validateData);

      if (!tokens) {
        throw new ApiError("Invalid email or password", 401);
      }

      res.cookie("access_token", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res
        .status(200)
        .json(
          ApiResponse.successResponse("User login successfully", tokens, 200)
        );
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }

      throw new ApiError("An unexpected error occurred while login", 500);
    }
  }

  static async logout(req: AppRequest, res: Response) {
    try {
      const userId = req.user?.id; // Get user ID from the request object
      const { refresh_token } = req.cookies;

      if (!refresh_token) {
        throw new ApiError("No refresh token provided", 401);
      }

      await AuthenticationServices.logout(userId, refresh_token);

      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      });

      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
      });

      res
        .status(200)
        .json(ApiResponse.successResponse("User logged out", {}, 200));
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }

      throw new ApiError("An unexpected error occurred while logout", 500);
    }
  }

  // todo : implement reset password
  static async resetPassword() {
    try {
      // Logic for resetting password
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }

      throw new ApiError(
        "An unexpected error occurred while resetting password",
        500
      );
    }
  }

  static async refreshToken(req: AppRequest, res: Response) {
    try {
      const tokens = req.cookies as Authenticated;
      const userId = req.user?.id; // Get user ID from the request object

      // If the access token is present in the cookies, return it
      if (tokens.access_token) {
        res
          .status(200)
          .json(
            ApiResponse.successResponse(
              "Token refreshed successfully",
              tokens,
              200
            )
          );

        return;
      }

      // If the refresh token is present in the cookies, use it to refresh the access token
      if (!tokens.refresh_token) {
        throw new ApiError("No refresh token provided", 401);
      }

      const newTokens = await AuthenticationServices.refreshToken(
        userId,
        tokens.refresh_token
      );

      if (!newTokens) {
        throw new ApiError("Failed to refresh token", 401);
      }

      res.cookie("access_token", newTokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.cookie("refresh_token", newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res
        .status(200)
        .json(
          ApiResponse.successResponse(
            "Token refreshed successfully",
            tokens,
            200
          )
        );
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }

      throw new ApiError(
        "An unexpected error occurred while refreshing token",
        500
      );
    }
  }

  static getProfile(req: AppRequest, res: Response) {
    const user = req.user; // Get user ID from the request object
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    res
      .status(200)
      .json(ApiResponse.successResponse("User profile", user, 200));
  }
}
