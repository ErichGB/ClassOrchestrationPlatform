import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';

export function useResetPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.resetPassword(email),
  });
} 