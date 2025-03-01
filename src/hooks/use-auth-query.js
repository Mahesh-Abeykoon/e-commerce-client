import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth.context';
import { LoadingPage } from '../pages/loading-page';

/**
 * Custom hook for handling authenticated queries with token refreshing.
 * @param {Object} query - The query configuration object.
 * @returns {Object|React.Component} The query result or a loading component.
 */
export const useAuthQuery = (query) => {
  const { refreshUserSession, isTokenRefreshing, setIsTokenRefreshing } = useAuth();
  const [loading, setLoading] = useState(false);

  const res = useQuery({
    ...query,
    enabled: !isTokenRefreshing, // Enable query only if not refreshing
  });

  useEffect(() => {
    if (res.data?.statusCode === 401) {
      const refreshAndRefetch = async () => {
        setIsTokenRefreshing(true);
        await refreshUserSession() // Trigger session refresh
        res.refetch() // Refetch the query after refreshing
        setIsTokenRefreshing(false)
      }
      refreshAndRefetch()
    }

    if (res.isFetching) {
      setLoading(true)
    } else {
      setLoading(false) // Set loading to false when refetching is complete
    }
  }, [res.data, refreshUserSession, res, setIsTokenRefreshing])

  if (loading) {
    return <LoadingPage />
  }

  return res
}