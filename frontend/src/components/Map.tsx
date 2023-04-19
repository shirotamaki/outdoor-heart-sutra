import useCurrentLocation from '@hooks/useCurrentLocation'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '600px',
  height: '600px',
}

const center = {
  lat: 35.69575,
  lng: 139.77521,
}

const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const Map = () => {
  const currentLocation = useCurrentLocation()

  if (!mapsApiKey) {
    return <div>Google Maps APIキーが設定されていません</div>
  }

  return (
    <LoadScript googleMapsApiKey={mapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        {currentLocation && (
          <Marker position={currentLocation} />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
