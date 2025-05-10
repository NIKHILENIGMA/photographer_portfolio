import { title } from "process";
import { z } from "zod";

export const addPhotoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().optional(),
  date: z.coerce.date().optional(),
});

export const updatePhotoSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  location: z.string().optional(),
  date: z.coerce.date().optional(),
  imageUrl: z.string().optional(),
  photoPublicId: z.string().optional(),
});
