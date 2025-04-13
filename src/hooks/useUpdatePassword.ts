import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from '@/services/authService';

export function useUpdatePassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (password: string) => authService.updatePassword(password),
    onSuccess: () => navigate('/'),
  });
} 