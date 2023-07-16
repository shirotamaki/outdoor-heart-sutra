import axios from 'axios'
import { railsApiUrl } from '@/config/index'
import fetchPhotoId from '@/features/photo/fetchPhotoId'

const expectedPhotoId = 123

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ status: 200, data: { photo_id: expectedPhotoId } })),
}))

describe('fetchPhotoId', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetches photo id successfully', async () => {
    const sutraId = 1
    const userId = 1

    const result = await fetchPhotoId(sutraId, userId)

    expect(axios.get).toHaveBeenCalledWith(`${railsApiUrl}/api/v1/photos/find`, {
      params: {
        sutraId: sutraId,
        userId: userId,
      },
    })
    expect(result).toEqual(expectedPhotoId)
  })
})
