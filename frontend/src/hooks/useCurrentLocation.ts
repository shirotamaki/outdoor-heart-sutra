import { LocationProps } from '@/types/types'

const useCurrentLocation = () => {
  const fetchCurrentLocation = () =>
    new Promise<LocationProps | null>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('ブラウザがサポートされていません'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (error) => reject(new Error(`エラー: ${error.code}`)),
      )
    }).catch((error) => {
      console.error(error)
      return null
    })

  return { fetchCurrentLocation }
}

export default useCurrentLocation
