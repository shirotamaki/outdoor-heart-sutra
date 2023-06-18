import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api'
import { useRouter } from 'next/router'
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
  img: string
  link: string
}

type AllMapsProps = {
  markerLocations: MarkerLocation[]
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
    if (map && markerLocations.length > 0) {
      map.panTo(markerLocations[0])
    }
  }, [map, markerLocations])

  if (!mapsApiKey) {
    return <div>Google Maps APIキーが設定されていません</div>
  }

  return (
    <div className='z-0'>
      <LoadScriptNext googleMapsApiKey={mapsApiKey} onLoad={() => setIsLoaded(true)}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={handleMapLoad}
        >
          {isLoaded &&
            markerLocations.map((location, index) => (
              <MarkerF
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                icon={{
                  url: location.img,
                  scaledSize: new google.maps.Size(25, 25),
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
