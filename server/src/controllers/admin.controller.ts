import { Request, Response } from "express";
import {
  ApiResponse,
  DatabaseError,
  InternalServerError,
  NotFoundError,
  StandardError,
  UnauthorizedError,
} from "../util";
import { removeFromCloudinary, uploadOnCloudinary } from "../util/Cloudinary";
import { AdminService } from "../services/admin.service";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "../validators/admin.validator";
import { CustomRequest } from "../app-request";

export class AdminController {
  static async updateProfile(req: CustomRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError("Unauthorized User");
    }
    
    const validateData = updateProfileSchema.parse(req.body);
    
    // Check if the user exists
    const updatedUser = await AdminService.updateUserProfile(
      userId,
        validateData
      );
      
      if (!updatedUser) {
        throw new DatabaseError("Failed to update profile");
      }
      
      ApiResponse(req, res, 200, "Profile updated successfully", {
        user: updatedUser,
      });
     
  }

  static async changePassword(req: CustomRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError("Unauthorized User");
    }
    
    const validateData = changePasswordSchema.parse(req.body);
    
    // Check if the user exists
    const updatedUser = await AdminService.updateUserProfile(userId, {
      password: validateData.newPassword,
    });
    
    if (!updatedUser) {
      throw new DatabaseError("Failed to update password");
    }
    
    ApiResponse(req, res, 200, "Password updated successfully", {
      user: updatedUser,
    });
  }

  public static async addAvatar(req: CustomRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError("Unauthorized User");
    }
    
    const avatarFile = req.file as Express.Multer.File;
    const avatarFilePath: string = avatarFile?.path;
    
    if (!avatarFilePath) {
      throw new NotFoundError("File is not available");
    }
    
    const avatarUrl = await uploadOnCloudinary(avatarFilePath, {
      folder: "avatars",
      overwrite: true,
    });
    
    if (!avatarUrl) {
      throw new InternalServerError("Failed to upload avatar to Cloudinary");
    }
    
    // Update the user's avatar in the database
    const updatedUser = await AdminService.addAvatar(userId, avatarUrl);
    
    if (!updatedUser) {
      throw new DatabaseError("Failed to update avatar");
    }
    
    ApiResponse(req, res, 200, "Avatar added successfully", {
      user: updatedUser,
    });
    
  }

  static async removeAvatar(req: CustomRequest, res: Response) {
    try {
      const userId: string | undefined = req.user?.id;
      if (!userId) {
        throw new UnauthorizedError("Unauthorized User");
      };

      // Check if public_id exists in the database
      const public_id: string = await AdminService.findPublicId(userId);

      if (!public_id) {
        throw new NotFoundError("Public ID not found");
      }

      await removeFromCloudinary(public_id);

      // Remove the user's avatar from Cloudinary
      const removedAvatar = await AdminService.removeAvatar(userId);

      if (!removedAvatar) {
        throw new DatabaseError("Failed to remove avatar");
      }

      res
        .status(200)
        .json(ApiResponse(req, res, 200, "Avatar removed successfully", {}));
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while removing avatar"
      );
    }
  }

  static async getProfile(req: CustomRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new UnauthorizedError("Unauthorized User");
      }

      const userProfile = await AdminService.findUserById(userId);

      if (!userProfile) {
        throw new NotFoundError("User not found");
      }

      ApiResponse(req, res, 200, "User profile fetched successfully", {});
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while fetching profile"
      );
    }
  }
}
