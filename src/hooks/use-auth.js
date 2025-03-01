import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, logout, fetchUserProfile } from '../api/auth';
import { handleError } from '../utils/error-handler';
import { useNavigate } from 'react-router-dom';

/**
 * Log in a user.
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem('authToken', data.token);
        queryClient.invalidateQueries(['user']);
        navigate('/home');
      }
    },
    onError: (error) => {
      handleError(error, 'Login error:');
    },
  });
};

/**
 * Log out a user.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('authToken');
      queryClient.clear();
      navigate('/login');
    },
    onError: (error) => {
      handleError(error, 'Logout error:');
    },
  });
};

/**
 * Fetch the user's profile.
 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
};
