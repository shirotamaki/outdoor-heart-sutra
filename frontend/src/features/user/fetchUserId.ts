import axios from 'axios'
import { railsApiUrl } from '@/config/index'

const fetchUserId = async (email: string): Promise<number | null> => {
  try {
    const response = await axios.get(`${railsApiUrl}/api/v1/users/find`, {
      params: { email },
    })

    if (response.status === 200) {
      return response.data.user_id
    }
  } catch (error) {
    console.error('Error fetching user id', error)
  }

  return null
}

export default fetchUserId
