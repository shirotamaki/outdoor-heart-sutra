import axios from 'axios'
import { useState } from 'react'
import { railsApiUrl } from '@/config/index'

const useFetchUserId = async (email: string): Promise<number | null> => {
  const [userId, setUserId] = useState<number | null>(null)

  try {
    const response = await axios.get(`${railsApiUrl}/api/v1/users/find`, {
      params: { email },
    })

    if (response.status === 200) {
      const fetchedUserId = response.data.user_id
      setUserId(fetchedUserId)
    }
  } catch (error) {
    console.error('Error fetching user id', error)
    setUserId(null)
  }
  return null
}

export default useFetchUserId
