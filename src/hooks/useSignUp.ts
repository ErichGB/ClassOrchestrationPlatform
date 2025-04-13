import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from '@/services/authService';

interface SignUpData {
  email: string;
  password: string;
  name: string;
  role: 'student' | 'teacher';
}

export function useSignUp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignUpData) => authService.signUp(data),
    onSuccess: () => navigate('/'),
  });
} 