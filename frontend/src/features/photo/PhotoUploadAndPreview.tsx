import Image from 'next/image'
import { useState, useEffect } from 'react'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import useExif from '@/hooks/useExif'

const PhotoUploadAndPreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { exifLocation, fetchExif } = useExif()
  const { currentLocation, getCurrentLocation } = useCurrentLocation()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0]

      await fetchExif(file)

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

  const location = exifLocation || currentLocation

  return (
    <div>
      <input type='file' accept='image/jpeg, image/png, image/heic' onChange={handleFileChange} />
      {previewUrl && <Image src={previewUrl} alt='preview' width={480} height={480} />}
      {location && (
        <div>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
    </div>
  )
}

export default PhotoUploadAndPreview
