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
  markerLocation?: { lat: number; lng: number }
}

const Map = ({ markerLocation }: MarkerLocation) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [currentMarkerLocation, setCurrentMarkerLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance)
  }

  useEffect(() => {
    if (map && markerLocation && markerLocation.lat && markerLocation.lng) {
      map.panTo(markerLocation)
      setCurrentMarkerLocation(markerLocation)
    }
  }, [map, markerLocation])

  if (!mapsApiKey) {
    return <div>Google Maps APIキーが設定されていません</div>
  }

  return (
    <LoadScriptNext googleMapsApiKey={mapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8} onLoad={handleMapLoad}>
        {currentMarkerLocation && <MarkerF position={currentMarkerLocation} />}
      </GoogleMap>
    </LoadScriptNext>
  )
}

export default Map
