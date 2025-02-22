import { useAuth } from '@/contexts/auth.context'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LoadingPage } from '../pages/loading-page'

export const useAuthQuery = query => {
  const { refreshUserSession, isTokenRefreshing, setIsTokenRefreshing } = useAuth()

  const res = useQuery({
    ...query,
    enabled: !isTokenRefreshing, // Enable query if not refreshing but should-refetching
  })

  const [loading, setLoading] = useState(false) // Add a new state variable to track loading

  useEffect(() => {
    if (res.data?.statusCode === 401) {
      const refreshAndRefetch = async () => {
        await refreshUserSession() // Trigger session refresh
        res.refetch() // Refetch the query after refreshing
      }
      setIsTokenRefreshing(true)
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