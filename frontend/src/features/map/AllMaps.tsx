import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { mapsApiKey } from '@/config/index'
import { AllMapsProps } from '@/types/types'

const containerStyle = {
  width: '100%',
  height: '100%',
}

// 長野県付近
const center = {
  lat: 36.2048,
  lng: 138.2529,
}

const AllMaps = ({ markerLocations }: AllMapsProps) => {
  const router = useRouter()
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance)
    setIsLoaded(true)
  }

  useEffect(() => {
    if (map) {
      map.panTo(center)
    }
  }, [map])

  if (!mapsApiKey) {
    return <div>Google Maps APIキーが設定されていません</div>
  }

  return (
    <div className='z-0 flex flex-grow h-full' style={{ height: '100%' }}>
      <LoadScriptNext googleMapsApiKey={mapsApiKey} onLoad={() => setIsLoaded(true)}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5.0}
          onLoad={handleMapLoad}
        >
          {isLoaded &&
            markerLocations.map((location, index) => (
              <MarkerF
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                icon={{
                  url: location.img,
                  scaledSize: new google.maps.Size(30, 30),
                }}
                onClick={() => router.push(location.link)}
              />
            ))}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  )
}

export default AllMaps
