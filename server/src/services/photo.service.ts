import { Photo } from "@prisma/client";
import { prisma } from "../config";
import { addPhotoData, updatePhotoData } from "../types/base.types";
import { uploadOnCloudinary } from "../util/Cloudinary";
import { getFullPath } from "../util/getFullPath";

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

      // Update the database with the image details
      await prisma.photo.create({
        data: {
          title: addPhotoData.title,
          description: addPhotoData.description,
          imageUrl: url,
          photoPublicId: publicId,
        },
      });

      // Get the full path of the image
      return "Image added successfully";
    } catch (error) {
      if (error instanceof Error) {
        const errMessage = error.message;
        if (errMessage.includes("Photo not found")) {
          throw new Error(errMessage);
        }
      }
      throw new Error("An error occurred while adding the image to the photo");
    }
  }

  static async updatePhoto(
    photoId: string,
    payload: updatePhotoData,
    newFilePath?: string
  ): Promise<string> {
    const photo = await this.getPhotoByPhotoId(photoId)!; // Check if the photo exists

    if (!photo) {
      throw new Error("Photo not found");
    }

    if (newFilePath) {
      const newPhotoUrl: string = await uploadOnCloudinary(newFilePath, {
        folder: "photos",
        overwrite: true,
        public_id: photo?.photoPublicId || "", // Use the existing public ID to overwrite
      });
      payload.imageUrl = newPhotoUrl;
    }

    await prisma.photo.update({
      where: { id: photoId },
      data: payload,
    });

    return "Photo updated successfully";
  }

  static async deletePhoto(photoId: string): Promise<string> {
    const photo = await this.getPhotoByPhotoId(photoId); // Check if the photo exists

    if (!photo) {
      throw new Error("Photo not found");
    }

    await prisma.photo.delete({
      where: { id: photoId },
    });

    return "Photo deleted successfully";
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
