import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from '@/services/authService';

export function useSignOut() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => navigate('/login'),
  });
} 