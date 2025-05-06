import { getContacts } from "@/services/api/contactServices";
import { useQuery } from "@tanstack/react-query";

export const useContactQuery = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { contacts: data, isPending, error };
};
