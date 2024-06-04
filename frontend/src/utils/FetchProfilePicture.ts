import { useEffect, useState } from 'react'
import { OpenAPI } from '../api'
import { useAuth } from '../context/AuthContext'

interface FetchState {
  isProfilePicLoading: boolean
  profilePicUrl: string
  profilePicError: Error | null
}

function useProfilePicFetch(url: string | undefined): FetchState {
  const [isProfilePicLoading, setIsProfilePicLoading] = useState(true)
  const [profilePicUrl, setProfilePicUrl] = useState<string>('')
  const [profilePicError, setProfilePicError] = useState<Error | null>(null)
  const { getToken } = useAuth()

  useEffect(() => {
    if (!url) {
      return
    }
    let isMounted = true

    const fetchData = async () => {
      try {
        const token = await getToken()
        const res = await fetch(OpenAPI.BASE + url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.blob()
        if (isMounted) {
          setProfilePicUrl(URL.createObjectURL(data))
          setIsProfilePicLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setProfilePicError(err as Error)
          setIsProfilePicLoading(false)
        }
      }
    }

    void fetchData()

    return () => {
      isMounted = false
    }
  }, [url, getToken])

  return { isProfilePicLoading, profilePicUrl, profilePicError }
}

export default useProfilePicFetch
