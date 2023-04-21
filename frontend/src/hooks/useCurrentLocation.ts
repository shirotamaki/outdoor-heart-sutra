import { useState, useEffect } from 'react'

const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          })
        } else {
          alert('ブラウザがサポートされていません')
        }
      } catch (error) {
        alert(error)
      }
    }
    getCurrentLocation()
  }, [])

  return currentLocation
}

export default useCurrentLocation
