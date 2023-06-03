import { useEffect, useState } from 'react'
import { geocodingApiUrl, geocodingApiKey } from '@/config/index'
import { LocationProps } from '@/types/location'

const useReverseGeocode = (location: LocationProps) => {
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const fetchAddress = async () => {
      if (!location) {
        setAddress(null)
        return
      }
      const params = new URLSearchParams({
        latlng: `${location.lat},${location.lng}`,
        key: geocodingApiKey,
      })

      try {
        const response = await fetch(`${geocodingApiUrl}?${params}`)
        const data = await response.json()

        if (data.status === 'OK') {
          const result = data.results[0]
          const fetchedAddress = result.formatted_address
          const fixAddress = fetchedAddress.replace(/日本、〒\d{3}-\d{4}\s/g, '')
          setAddress(fixAddress)
        } else {
          console.error('Error Geocoding API:', data.status)
          setAddress(null)
        }
      } catch (error) {
        console.error('Unexpected error occurred:', error)
        setAddress(null)
      }
    }
    fetchAddress()
  }, [location])

  return address
}

export default useReverseGeocode
