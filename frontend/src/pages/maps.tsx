import { GoogleMap, LoadScript } from "@react-google-maps/api"

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: 35.693377849778024, // 緯度
  lng: 139.7494393926594, // 経度
}

const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const MyComponent = () => {
  return (
    <LoadScript googleMapsApiKey={mapsApiKey || ''}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}></GoogleMap>
    </LoadScript>
  )
}

export default MyComponent
