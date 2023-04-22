import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { mapsApiKey } from '@/config/index'
import { useEffect, useState } from 'react'

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: 35.693905085681585,
  lng: 139.74912823866393,
}

type MarkerLocation = {
  markerLocation?: { lat: number; lng: number } | null
}

const Map = ({ markerLocation }: MarkerLocation) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance)
  }

  useEffect(() => {
    if (map && markerLocation) {
      map.panTo(markerLocation)
    }
  }, [map, markerLocation])

  if (!mapsApiKey) {
    return <div>Google Maps APIキーが設定されていません</div>
  }

  return (
    <LoadScript googleMapsApiKey={mapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8} onLoad={handleMapLoad}>
        {markerLocation && <Marker position={markerLocation} />}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
