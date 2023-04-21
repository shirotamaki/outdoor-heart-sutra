import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { mapsApiKey } from '@/config/index'

const containerStyle = {
  width: '600px',
  height: '600px',
}

const center = {
  lat: 26.592227888952923,
  lng: 127.96974014071095,
}

type MarkerLocation = {
  markerLocation?: { lat: number; lng: number } | null
}

const Map = ({ markerLocation }: MarkerLocation) => {
  if (!mapsApiKey) {
    return <div>Google Maps APIキーが設定されていません</div>
  }

  return (
    <LoadScript googleMapsApiKey={mapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
        {markerLocation && <Marker position={markerLocation} />}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
