import { useState, useEffect, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Area, Point } from 'react-easy-crop/types'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import useExifLocation from '@/hooks/useExifLocation'

const PhotoUploadAndPreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [latitudeData, setlatitudeData] = useState<number | null>(null)
  const [longitudeData, setlongitudeData] = useState<number | null>(null)

  const { exifLocation, fetchExifLocation } = useExifLocation()
  const { currentLocation, getCurrentLocation } = useCurrentLocation()

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0]

      await fetchExifLocation(file)

      try {
        const heic2any = (await import('heic2any')).default
        if (file.type === 'image/heic') {
          const convertedImage = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.2,
          })
          if (Array.isArray(convertedImage)) {
            throw new Error('Unexpected multiple blobs')
          }
          setPreviewUrl(URL.createObjectURL(convertedImage))
        } else {
          setPreviewUrl(URL.createObjectURL(file))
        }
      } catch (error) {
        console.error('Error converting image: ', error)
      }
    } else {
      return
    }
  }

  useEffect(() => {
    if (!exifLocation) {
      getCurrentLocation()
    }
  }, [exifLocation, getCurrentLocation])

  useEffect(() => {
    const location = exifLocation || currentLocation

    if (location !== null) {
      setlatitudeData(location.lat)
      setlongitudeData(location.lng)
    } else {
      setlatitudeData(null)
      setlongitudeData(null)
    }
  }, [exifLocation, currentLocation])

  return (
    <div>
      <input type='file' accept='image/jpeg, image/png, image/heic' onChange={handleFileChange} />
      {previewUrl && (
        <Cropper
          image={previewUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropSize={{
            width: 200,
            height: 200,
          }}
        />
      )}
      {latitudeData && longitudeData && (
        <div>
          <p>Latitude: {latitudeData}</p>
          <p>Longitude: {longitudeData}</p>
        </div>
      )}
    </div>
  )
}

export default PhotoUploadAndPreview
