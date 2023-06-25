import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { mapsApiKey } from '@/config/index'

const containerStyle = {
  width: '360px',
  height: '360px',
}

const center = {
  lat: 35.693905085681585,
  lng: 139.74912823866393,
}

type MarkerLocation = {
  markerLocation?: {
    lat: number
    lng: number
    img: string
  }
}

const Map = ({ markerLocation }: MarkerLocation) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const [currentMarkerLocation, setCurrentMarkerLocation] = useState<{
    lat: number
    lng: number
    img: string
  } | null>(null)

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance)
    setIsLoaded(true)
  }

  useEffect(() => {
    if (map && markerLocation && markerLocation.lat && markerLocation.lng && markerLocation.img) {
      map.panTo(markerLocation)
      setCurrentMarkerLocation(markerLocation)
    }
  }, [map, markerLocation])

  if (!mapsApiKey) {
    return <div>Google Maps APIキーが設定されていません</div>
  }

  return (
    <LoadScriptNext googleMapsApiKey={mapsApiKey} onLoad={() => setIsLoaded(true)}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={handleMapLoad}
      >
        {isLoaded && currentMarkerLocation && (
          <MarkerF
            position={{ lat: currentMarkerLocation.lat, lng: currentMarkerLocation.lng }}
            icon={{
              url: currentMarkerLocation.img,
              scaledSize: new google.maps.Size(30, 30),
            }}
          />
        )}
      </GoogleMap>
    </LoadScriptNext>
  )
}

export default Map
