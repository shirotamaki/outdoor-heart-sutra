import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { mapsApiKey } from '@/config/index'

const containerStyle = {
  width: '720px',
  height: '720px',
}

const center = {
  lat: 35.693905085681585,
  lng: 139.74912823866393,
}

type MarkerLocation = {
  lat: number
  lng: number
}

type AllMapsProps = {
  markerLocations: MarkerLocation[]
}

const AllMaps = ({ markerLocations }: AllMapsProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance)
  }

  useEffect(() => {
    if (map && markerLocations.length > 0) {
      map.panTo(markerLocations[0])
    }
  }, [map, markerLocations])

  if (!mapsApiKey) {
    return <div>Google Maps APIキーが設定されていません</div>
  }
  return (
    <LoadScriptNext googleMapsApiKey={mapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8} onLoad={handleMapLoad}>
        {markerLocations.map((location, index) => (
          <MarkerF key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScriptNext>
  )
}

export default AllMaps
