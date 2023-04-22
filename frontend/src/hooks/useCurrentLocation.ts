import { useState, useEffect } from 'react'

const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const getCurrentLocation = async () => {
    try {
      const location = await new Promise<{ lat: number; lng: number } | null>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
            },
            (error) => {
              reject(`エラー: ${error.code}`)
            },
          )
        } else {
          reject('ブラウザがサポートされていません')
        }
      })
      setCurrentLocation(location)
      return location
    } catch (error) {
      console.error(error)
      return null
    }
  }
  return { currentLocation, getCurrentLocation }
}

export default useCurrentLocation
