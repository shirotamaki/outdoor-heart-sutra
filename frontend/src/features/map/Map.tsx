import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { mapsApiKey } from '@/config/index'
import useCurrentLocation from '@/hooks/useCurrentLocation'

const containerStyle = {
  width: '600px',
  height: '600px',
}

const center = {
  lat: 35.69575,
  lng: 139.77521,
}

type Props = {
  markerLocation?: { lat: number; lng: number } | null
}

const Map = ({ markerLocation }: Props) => {
  const currentLocation = useCurrentLocation()

  if (!mapsApiKey) {
    return <div>Google Maps APIキーが設定されていません</div>
  }

  return (
    <LoadScript googleMapsApiKey={mapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        {markerLocation && <Marker position={markerLocation} />}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
