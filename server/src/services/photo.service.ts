import { Photo } from "@prisma/client";
import { prisma } from "../config";
import { addPhotoData, updatePhotoData } from "../types/base.types";
import { uploadOnCloudinary } from "../util/Cloudinary";
import { getFullPath } from "../util/getFullPath";

export class PhotoService {
  static async addImageToPhoto(
    imagePath: string,
    addPhotoData: addPhotoData
  ): Promise<string> {
    try {
      const photoUrl: string = await uploadOnCloudinary(imagePath, {
        folder: "photos",
        overwrite: true,
      }); // Upload image to Cloudinary

      const fullPath = getFullPath(photoUrl); // Get the full path of the image

      await prisma.photo.create({
        data: {
          title: addPhotoData.title,
          description: addPhotoData.description,
          imageUrl: photoUrl,
          photoPublicId: fullPath, // Assuming 'photoPublicId' is the field to update
        },
      });

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
    payload: updatePhotoData
  ): Promise<string> {
    const photo = this.getPhotoByPhotoId(photoId); // Check if the photo exists

    if (!photo) {
      throw new Error("Photo not found");
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
