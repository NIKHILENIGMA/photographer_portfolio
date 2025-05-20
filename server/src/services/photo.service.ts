import { Photo } from "@prisma/client";
import { prisma } from "../config";
import { addPhotoData, updatePhotoData } from "../types/base.types";
import { uploadOnCloudinary } from "../util/Cloudinary";
import { getFullPath } from "../util/getFullPath";
import {
  DatabaseError,
  InternalServerError,
  NotFoundError,
  StandardError,
} from "../util";

export class PhotoService {
  static async addImageToPhoto(
    imagePath: string,
    userId: string,
    addPhotoData: addPhotoData
  ): Promise<string> {
    try {
      //  Generate a unique public ID for the image
      const publicId: string = `photo_${userId}_${Date.now()}`;

      // Upload the image to Cloudinary
      const url: string = await uploadOnCloudinary(imagePath, {
        folder: "photos",
        overwrite: true,
        public_id: publicId, // Generate a unique public ID
      });

      if (!url) {
        throw new InternalServerError("Failed to upload Image on cloudinary, please try again");
        
      }

      // Update the database with the image details
      await prisma.photo.create({
        data: {
          title: addPhotoData.title,
          description: addPhotoData.description,
          location: addPhotoData?.location,
          date: addPhotoData?.date ,
          imageUrl: url,
          photoPublicId: publicId,
        },
      });

      // Get the full path of the image
      return "Image added successfully";
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }
      throw new InternalServerError("An error occurred while adding the image to the photo");
    }
  }

  static async updatePhotoDetails(
    photoId: string,
    payload: updatePhotoData
  ): Promise<string> {
    try {
      const photo = await this.getPhotoByPhotoId(photoId)!; // Check if the photo exists

      if (!photo) {
        throw new NotFoundError("Photo not found");
      }

      // Check if the image URL is being updated
      const updatedPhoto = await prisma.photo.update({
        where: { id: photoId },
        data: payload,
      });
      
      if (!updatedPhoto) {
        throw new DatabaseError("Failed to update photo");
      }

      return "Photo updated successfully";
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while updating the photo"
      );
    }
  }

  static async updateImage(
    photoId: string,
    newFilePath: string
  ): Promise<string> {
    try {
      const photo = await this.getPhotoByPhotoId(photoId); // Check if the photo exists

      if (!photo) {
        throw new NotFoundError("Photo not found");
      }

      const newPhotoUrl: string = await uploadOnCloudinary(newFilePath, {
        folder: "photos",
        overwrite: true,
        public_id: photo?.photoPublicId || "", // Use the existing public ID to overwrite
      });

      if (!newPhotoUrl) {
        throw new InternalServerError("Failed to upload image on Cloudinary");
      }

      await prisma.photo.update({
        where: { id: photoId },
        data: { imageUrl: newPhotoUrl },
      });

      return "Image updated successfully";
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while updating the image"
      );
    }
  }

  static async deletePhoto(photoId: string): Promise<string> {
    try {
      const photo = await this.getPhotoByPhotoId(photoId); // Check if the photo exists
  
      if (!photo) {
        throw new NotFoundError("Photo not found");
      }
  
      await prisma.photo.delete({
        where: { id: photoId },
      });
  
      return "Photo deleted successfully";
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }
  
      throw new InternalServerError(
        "An unexpected error occurred while deleting the photo"
      );
      
    }
  }

  static async findPublicId(photoId: string): Promise<string> {
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
      select: { photoPublicId: true },
    });

    if (!photo) {
      throw new Error("Photo not found");
    }

    return photo.photoPublicId!;
  }

  static async getPhotoDetails(photoId: string): Promise<Photo> {
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      throw new Error("Photo not found");
    }

    return photo;
  }

  static async getPhotos(take: number, skip: number): Promise<Photo[]> {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });

    if (!photos) {
      throw new Error("No photos found");
    }

    return photos;
  }

  static async getPhotoByPhotoId(photoId: string): Promise<Photo | null> {
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });

    return photo;
  }
}
