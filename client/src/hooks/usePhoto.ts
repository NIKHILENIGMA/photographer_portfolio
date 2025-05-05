import { useQuery } from "@tanstack/react-query";
import {  getPhotos } from "../services/api/photoServices";

const DRAFT_STALE_TIME = 1000 * 60 * 15; // 15 minutes
const DRAFT_GC_TIME = 1000 * 60 * 60; // 1 hour

export const usePhotoQuery = () => {
  const photosQuery = useQuery({
    queryKey: ["photos"],
    queryFn: async () => await getPhotos(),
    refetchOnWindowFocus: false,
    staleTime: DRAFT_STALE_TIME,
    gcTime: DRAFT_GC_TIME,
  });

  // const getPhotoQuery = useQuery({
  //   queryKey: ["photo", id],
  //   queryFn: async () => await getPhoto(id!),
  //   refetchOnWindowFocus: false,
  //   staleTime: DRAFT_STALE_TIME,
  //   gcTime: DRAFT_GC_TIME,
  // });

  return {
    photosQuery,
    // getPhotoQuery,
  };
};
