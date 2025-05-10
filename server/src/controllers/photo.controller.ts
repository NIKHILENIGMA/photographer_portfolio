import { Request, Response } from "express";
import { AppRequest } from "../types/app-request";
import { ApiError, ApiResponse } from "../util";
import {
  addPhotoSchema,
  updatePhotoSchema,
} from "../validators/photo.validator";
import { PhotoService } from "../services/photo.service";
import { removeFromCloudinary } from "../util/Cloudinary";

export class PhotoController {
  static async addImageToPhoto(req: AppRequest, res: Response) {
    try {
      const photoFile = req.file as Express.Multer.File; // Assuming the image is sent in the request body
      if (!photoFile) {
        throw new ApiError("Image not found", 400);
    }
      
      const validateData = addPhotoSchema.parse(req.body); // Validate the request body

      const successMessage: string = await PhotoService.addImageToPhoto(
        photoFile.path,
        validateData
      );

      if (successMessage === null) {
        throw new ApiError("Photo not found", 404);
      }

      res
        .status(200)
        .json(ApiResponse.successResponse(successMessage, {}, 200));
    } catch (error) {
      if (error instanceof Error) {
        const errMessage = error.message;
        if (errMessage.includes("Photo not found")) {
          throw new ApiError(errMessage, 404);
        }
      }

      throw new ApiError((error as Error).message, 500);
    }
  }

  static async updatePhoto(req: AppRequest, res: Response) {
    try {
      const photoId: string  = req.params.photoId;
      const photoFile = req.file as Express.Multer.File; // Assuming the image is sent in the request body
      if (!photoFile) {
        throw new ApiError("Image not found", 400);
      }


      const validateData = updatePhotoSchema.parse(req.body);

      const successMessgae = await PhotoService.updatePhoto(
        photoId,
        validateData
      );

      res.status(200).json(ApiResponse.successResponse(successMessgae, 200));
    } catch (error) {
      if (error instanceof Error) {
        const errMessage = error.message;
        if (errMessage.includes("Photo not found")) {
          throw new ApiError(errMessage, 404);
        }
      }

      throw new ApiError("Error updating photo", 500, error);
    }
  }

  static async deletePhoto(req: AppRequest, res: Response) {
    try {
      const { photoId } = req.params;

      const public_id: string = await PhotoService.findPublicId(photoId); // Find the public ID of the photo

      await removeFromCloudinary(public_id);

      const successMessgae = await PhotoService.deletePhoto(photoId);

      res.status(200).json(ApiResponse.successResponse(successMessgae, 200));
    } catch (error) {
      if (error instanceof Error) {
        const errMessage = error.message;
        if (errMessage.includes("Photo not found")) {
          throw new ApiError(errMessage, 404);
        }
      }

      throw new ApiError("Error deleting photo", 500, error);
    }
  }

  static async getPhotoDetails(req: AppRequest, res: Response) {
    try {
      const { photoId } = req.params;

      const photoDetails = await PhotoService.getPhotoDetails(photoId);

      if (photoDetails === null) {
        throw new ApiError("Photo not found", 404);
      }

      res
        .status(200)
        .json(
          ApiResponse.successResponse(
            "Photo fetch successfully ",
            photoDetails,
            200
          )
        );
    } catch (error) {
      if (error instanceof Error) {
        const errMessage = error.message;
        if (errMessage.includes("Photo not found")) {
          throw new ApiError(errMessage, 404);
        }
      }

      throw new ApiError("Error fetching photo details", 500, error);
    }
  }

  static async getPhotos(req: AppRequest, res: Response) {
    try {
      const { take, page } = req.query;

      const skip = (Number(page) - 1) * Number(take) || 0;

      const photos = await PhotoService.getPhotos(
        Number(take) || 10,
        Number(skip) || 0
      );

      res
        .status(200)
        .json(
          ApiResponse.successResponse(
            "Photos fetched successfully ",
            photos,
            200
          )
        );
    } catch (error) {
      if (error instanceof Error) {
        const errMessage = error.message;
        throw new ApiError(errMessage, 500);
      }

      throw new ApiError("Error fetching photos", 500, error);
    }
  }
}
