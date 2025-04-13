import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/authService';

export function useUserRole() {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: () => authService.getUserRole(),
  });
} 