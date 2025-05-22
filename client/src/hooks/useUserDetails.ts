import queryClient from "@/app/queryClient";
import { updateDetails } from "@/services/api/adminServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/admin/profile",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateDetailsMutation = () => {
  return useMutation({
    mutationKey: ["updateDetails"],
    mutationFn: (formDetails: {
      firstName: string;
      lastName: string;
      email: string;
    }) => updateDetails(formDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      console.log("Details updated successfully");
    },
    onError: (error) => {
      console.error("Error updating details", error);
    },
  });
};
