import axios from 'axios'
import { railsApiUrl } from '@/config/index'

const fetchPhotoId = async (
  currentSutraId: number,
  currentUserId: number,
): Promise<number | null> => {
  try {
    const response = await axios.get(`${railsApiUrl}/api/v1/photos/find`, {
      params: {
        sutraId: currentSutraId,
        userId: currentUserId,
      },
    })

    if (response.status === 200) {
      return response.data.photo_id
    } else {
      return null
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching photo id:', error.message, error.response)
    } else if (error instanceof Error) {
      console.error('Error fetching photo id:', error.message)
    } else {
      console.error('Error fetching photo id:', error)
    }
    return null
  }
}

export default fetchPhotoId
