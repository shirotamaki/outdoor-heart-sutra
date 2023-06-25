import { LocationProps } from '@/types/types'

const useCurrentLocation = () => {
  const fetchCurrentLocation = async () => {
    try {
      const currentLocation = await new Promise<LocationProps | null>((resolve, reject) => {
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
      return currentLocation
    } catch (error) {
      console.error(error)
      return null
    }
  }

  return { fetchCurrentLocation }
}

export default useCurrentLocation
