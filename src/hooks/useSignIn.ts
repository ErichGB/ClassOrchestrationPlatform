import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from '@/services/authService';

interface SignInData {
  email: string;
  password: string;
}

export function useSignIn() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignInData) => authService.signIn(data),
    onSuccess: () => navigate('/'),
  });
} 