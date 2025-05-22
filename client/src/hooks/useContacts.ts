import { deleteContact, getContacts } from "@/services/api/contactServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/app/queryClient";

export const useContactQuery = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { data, isPending, error };
};

export const useDeleteContactMutation = () => {
  return useMutation({
    mutationKey: ["deleteContact"],
    mutationFn: async (id: string) => await deleteContact(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      console.error("Error deleting contact:", error);
    },
  });
};
