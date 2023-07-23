import axios from 'axios'
import fetchUserId from '@/features/user/fetchUserId'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('@/config/index', () => ({
  railsApiUrl: 'http://localhost:3000',
}))

describe('fetchUserId', () => {
  let consoleError: typeof console.error

  beforeEach(() => {
    consoleError = console.error
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = consoleError
    jest.clearAllMocks()
  })

  it('returns the user id when the request is successful', async () => {
    const mockResponse = { data: { user_id: 1 }, status: 200 }
    mockedAxios.get.mockResolvedValueOnce(mockResponse)

    const userId = await fetchUserId('test@example.com')

    expect(userId).toBe(1)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://localhost:3000/api/v1/users/find`, {
      params: { email: 'test@example.com' },
    })
  })

  it('returns null when the request is unsuccessful', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Request failed'))

    const userId = await fetchUserId('test@example.com')

    expect(userId).toBe(null)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://localhost:3000/api/v1/users/find`, {
      params: { email: 'test@example.com' },
    })
  })
})
