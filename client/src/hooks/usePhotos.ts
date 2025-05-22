import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addPhoto,
  deletePhoto,
  getPhotoById,
  getPhotos,
  updatePhotoDetails,
  updatePhotoImage,
} from "../services/api/photoServices";
import queryClient from "@/app/queryClient";
import { AddFormDetails, UpdatePhoto } from "@/types";

const DRAFT_STALE_TIME = 1000 * 60 * 15; // 15 minutes
const DRAFT_GC_TIME = 1000 * 60 * 60; // 1 hour

// ------------------- Query for all photos ------------------- //
// This query is used to fetch all photos.
export const usePhotosQuery = () => {
  const photos = useQuery({
    queryKey: ["photos"],
    queryFn: getPhotos,
    staleTime: DRAFT_STALE_TIME,
    gcTime: DRAFT_GC_TIME,
  });

  return {
    data: photos.data,
    isLoading: photos.isLoading,
    isError: photos.isError,
  };
};

// ------------------- Query for a single photo ------------------- //
// This query is used to fetch a single photo by its ID.
export const usePhotoQuery = (id: string) => {
  const photosQuery = useQuery({
    queryKey: ["photos", id],
    queryFn: () => getPhotoById(id),
    staleTime: DRAFT_STALE_TIME,
    gcTime: DRAFT_GC_TIME,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return {
    photo: photosQuery.data?.data,
    isLoading: photosQuery.isLoading,
    isError: photosQuery.isError,
  };
};

// ------------------- Mutation to add photo ------------------- //
// This mutation is used to add a new photo.
export const useAddPhotoMutation = () => {
  return useMutation({
    mutationKey: ["addPhoto"],
    mutationFn: async (data: AddFormDetails) => await addPhoto(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.error("Mutation error while uploading photo to server: ", error);
    },
  });
};

// ------------------- Mutation to update photo ------------------- //
// This mutation is used to update an existing photo.
export const useUpdatePhotoDetailsMutation = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePhoto }) =>
      await updatePhotoDetails(id!, data),
    mutationKey: ["updatePhoto"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.error("Error updating photo:", error);
    },
  });
};

export const useUpdateImageMutation = () => {
  return useMutation({
    mutationFn: async ({id, photo}: {id: string, photo: File}) =>
      await updatePhotoImage(id, photo),
    mutationKey: ["updatePhotoImage"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.error("Error updating photo image:", error);
    },
  });
};

// ------------------- Mutation to delete photo ------------------- //
// This mutation is used to delete a photo.
export const useDeletePhotoMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deletePhoto(id),
    mutationKey: ["deletePhoto"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.error("Error deleting photo:", error);
    },
  });
};
