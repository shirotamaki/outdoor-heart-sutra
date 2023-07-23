import { renderHook, act, waitFor } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import useReverseGeocode from '@/hooks/useReverseGeocode'

fetchMock.enableMocks()
const mockLocation = { lat: 35.69334, lng: 139.7497 }
const mockAddress = '東京都千代田区北の丸公園２−３'

describe('useReverseGeocode', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should return address if location is provided', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: 'OK',
        results: [{ formatted_address: `日本、〒102-8321 ${mockAddress}` }],
      }),
    )

    const { result } = renderHook(() => useReverseGeocode(mockLocation))

    await waitFor(() => expect(result.current).toEqual(mockAddress))
  })
})
