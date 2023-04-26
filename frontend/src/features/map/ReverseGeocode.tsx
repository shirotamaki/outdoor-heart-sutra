import { geocodingApiUrl, geocodingApiKey } from '@/config/index'

const reverseGeocode = async (lat: number, lng: number): Promise<string | null> => {
  const url = new URL(geocodingApiUrl)
  const params = new URLSearchParams({
    latlng: `${lat},${lng}`,
    key: geocodingApiKey,
  })

  url.search = params.toString()
  const response = await fetch(url.toString())
  const data = await response.json()

  if (data.status === 'OK') {
    const result = data.results[0]
    return result.formatted_address
  } else {
    console.error('Geocoding API Error:', data.status)
    return null
  }
}

export default reverseGeocode
