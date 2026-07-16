import { useMutation } from '@tanstack/react-query';
import { authRepository, LoginPayload, AuthResponse } from '../repositories/AuthRepository';

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: async (credentials: LoginPayload) => {
      const response = await authRepository.login(credentials);

      const allowedRoles = ['Gram Panchayat Officer', 'System Administrator'];
      const userRole = response?.data?.user?.role;

      if (!userRole || !allowedRoles.includes(userRole)) {
        throw new Error('Access denied. You are not authorized person to access this control panel.');
      }

      return response;
    },
    onSuccess: (response) => {
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem('auth_token', token);
      }
    },
  });
}
