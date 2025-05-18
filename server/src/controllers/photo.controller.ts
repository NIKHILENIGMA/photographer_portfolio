import { Request, Response } from "express";
import {
  ApiResponse,
  DatabaseError,
  InternalServerError,
  NotFoundError,
  StandardError,
} from "../util";
import {
  addPhotoSchema,
  updatePhotoSchema,
} from "../validators/photo.validator";
import { PhotoService } from "../services/photo.service";
import { removeFromCloudinary } from "../util/Cloudinary";

export class PhotoController {
  static async addImageToPhoto(req: Request, res: Response) {
    try {
      const userId = req.user!.id; // Get the user ID from the request

      const photoFile = req.file as Express.Multer.File; // Assuming the image is sent in the request body

      if (!photoFile) {
        throw new NotFoundError("File not found");
      }

      const validateData = addPhotoSchema.parse(req.body); // Validate the request body

      const successMessage: string = await PhotoService.addImageToPhoto(
        photoFile.path,
        userId,
        validateData
      );

      if (successMessage === null) {
        throw new NotFoundError("Photo not found");
      }

      ApiResponse(req, res, 201, successMessage, {});
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while creating contact"
      );
    }
  }

  static async updatePhoto(req: Request, res: Response) {
    try {
      const photoId: string = req.params.photoId;
      const photoFile = req.file as Express.Multer.File; // Assuming the image is sent in the request body
      if (!photoFile) {
        throw new NotFoundError("File not found");
      }

      const validateData = updatePhotoSchema.parse(req.body);

      const successMessgae = await PhotoService.updatePhoto(
        photoId,
        validateData,
        photoFile.path
      );

      ApiResponse(req, res, 200, successMessgae, {});
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while updating photo"
      );
    }
  }

  static async deletePhoto(req: Request, res: Response) {
    try {
      const { photoId } = req.params;

      const public_id: string = await PhotoService.findPublicId(photoId); // Find the public ID of the photo

      await removeFromCloudinary(public_id);

      const successMessgae = await PhotoService.deletePhoto(photoId);

      ApiResponse(req, res, 200, successMessgae, {});
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while deleting photo"
      );
    }
  }

  static async getPhotoDetails(req: Request, res: Response) {
    try {
      const { photoId } = req.params;

      const photoDetails = await PhotoService.getPhotoDetails(photoId);

      if (photoDetails === null) {
        throw new DatabaseError("Photo not found");
      }

      ApiResponse(req, res, 200, "Photo details fetched successfully", {
        photoDetails,
      });
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while fetching photo details"
      );
    }
  }

  static async getPhotos(req: Request, res: Response) {
    try {
      const { take, page } = req.query;

      const skip = (Number(page) - 1) * Number(take) || 0;

      const photos = await PhotoService.getPhotos(
        Number(take) || 10,
        Number(skip) || 0
      );

      ApiResponse(req, res, 200, "Photos fetched successfully", {
        photos,
      });
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while fetching photos"
      );
    }
  }
}
