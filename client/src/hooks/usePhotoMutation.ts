import { useMutation } from "@tanstack/react-query";
import {
  addPhoto,
  deletePhoto,
  updatePhoto,
} from "../services/api/photoServices";
import queryClient from "../app/queryClient";
import { UpdatePhoto } from "../types";

export interface FormDetails {
  title: string;
  location?: string;
  date?: Date | null;
  description: string;
}

export const usePhotoMutation = () => {
  const addPhotoMutation = useMutation({
    mutationFn: async ({ file, data }: { file: File; data: AddFormDetails }) =>
      await addPhoto(file, data),
    mutationKey: ["addPhoto"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.error("Error adding photo:", error);
    },
  });

  const updatePhotoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePhoto }) =>
      await updatePhoto(id!, data),
    mutationKey: ["updatePhoto"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.error("Error updating photo:", error);
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: async (id: string) => await deletePhoto(id),
    mutationKey: ["deletePhoto"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.error("Error deleting photo:", error);
    },
  });

  return { addPhotoMutation, updatePhotoMutation, deletePhotoMutation };
};
