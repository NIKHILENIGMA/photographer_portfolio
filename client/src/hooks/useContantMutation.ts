import queryClient from "@/app/queryClient";
import { deleteContact } from "@/services/api/contactServices";
import { useMutation } from "@tanstack/react-query";

export const useContactMutation = () => {
  const deleteContactMutation = useMutation({
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

  return {
    deleteContactMutation,
  };
};
