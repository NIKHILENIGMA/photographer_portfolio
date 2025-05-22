import { useMutation } from '@tanstack/react-query';
import AuthService from '../services/api/authServices';

export const useRefreshToken = () => {
  const tokenMutation = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: async () => {
      const response = await AuthService.refreshToken();
      return response;
    },
    onSuccess: () => {
      // Handle successful login, e.g., redirect or show a success message
      
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error('token refresh failed:', error);
    },
  });

  return tokenMutation;
}
