import { Request, Response } from "express";
import { ApiError, ApiResponse } from "../util";
import { removeFromCloudinary, uploadOnCloudinary } from "../util/Cloudinary";
// import { PublishPhoto } from "../types";
import { AppRequest } from "../types/app-request";
import { AdminService } from "../services/admin.service";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "../validators/admin.validator";

export class AdminController {
  static async updateProfile(req: AppRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        throw new ApiError("Unauthorized User", 401);
      }
      const userId = user.id;
      const validateData = updateProfileSchema.parse(req.body);

      // Check if the user exists
      const updatedUser = await AdminService.updateUserProfile(
        userId,
        validateData
      );

      if (!updatedUser) {
        throw new ApiError("Failed to update profile", 500);
      }

      res
        .status(200)
        .json(
          ApiResponse.successResponse("Profile updated successfully", {}, 200)
        );
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }

      throw new ApiError(
        "An unexpected error occurred while updating profile",
        500
      );
    }
  }

  static async changePassword(req: AppRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        throw new ApiError("Unauthorized User", 401);
      }
      const userId = user.id;

      const validateData = changePasswordSchema.parse(req.body);

      // Check if the user exists
      const updatedUser = await AdminService.updateUserProfile(userId, {
        password: validateData.newPassword,
      });

      if (!updatedUser) {
        throw new ApiError("Failed to update password", 500);
      }

      res
        .status(200)
        .json(
          ApiResponse.successResponse("Password updated successfully", {}, 200)
        );
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }

      throw new ApiError(
        "An unexpected error occurred while updating password",
        500
      );
    }
  }

  public static async addAvatar(req: AppRequest, res: Response) {
    try {
      const user = req.user;

      if (!user) {
        throw new ApiError("Unauthorized User", 401);
      }
      const userId = user.id;
      const avatarFile = req.file as Express.Multer.File;
      const avatarFilePath: string = avatarFile?.path;

      if (!avatarFilePath) {
        throw new ApiError("File is not available", 400);
      }

      const avatarUrl = await uploadOnCloudinary(avatarFilePath, {
        folder: "avatars",
        overwrite: true,
      });

      if (!avatarUrl) {
        throw new ApiError("Failed to upload image on cloudinary", 500);
      }

      // Update the user's avatar in the database
      const updatedUser = await AdminService.addAvatar(userId, avatarUrl);

      if (!updatedUser) {
        throw new ApiError("Failed to update profile", 500);
      }

      res
        .status(200)
        .json(
          ApiResponse.successResponse("Avatar added successfully", {}, 200)
        );
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }

      throw new ApiError(
        "An unexpected error occurred while adding avatar",
        500
      );
    }
  }

  static async removeAvatar(req: AppRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        throw new ApiError("Unauthorized User", 401);
      }
      const userId: string = user.id;

      // Check if public_id exists in the database
      const public_id: string = await AdminService.findPublicId(userId);

      if (!public_id) {
        throw new ApiError("Public ID not found", 404);
      }

      await removeFromCloudinary(public_id);

      // Remove the user's avatar from Cloudinary
      const removedAvatar = await AdminService.removeAvatar(userId);

      if (!removedAvatar) {
        throw new ApiError("Failed to remove avatar", 500);
      }

      res
        .status(200)
        .json(
          ApiResponse.successResponse("Avatar removed successfully", {}, 200)
        );
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }

      throw new ApiError(
        "An unexpected error occurred while removing avatar",
        500
      );
    }
  }

  static async getProfile(req: AppRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        throw new ApiError("Unauthorized User", 401);
      }

      const userId = user.id;
      const userProfile = await AdminService.findUserById(userId);

      if (!userProfile) {
        throw new ApiError("User not found", 404);
      }

      res
        .status(200)
        .json(
          ApiResponse.successResponse(
            "User profile fetched successfully",
            { user: userProfile },
            200
          )
        );
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }

      throw new ApiError(
        "An unexpected error occurred while fetching profile",
        500
      );
    }
  }
}
