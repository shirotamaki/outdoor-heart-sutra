import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import ActionButton from '@/components/ActionButton'
import { railsApiUrl } from '@/config/index'
import cropImage from '@/features/photo/cropImage'
import fetchUserId from '@/features/user/fetchUserId'
import useFetchLocation from '@/hooks/useFetchLocation'
import useReverseGeocode from '@/hooks/useReverseGeocode'

type PhotoUploadAndPreviewProps = {
  sutraId: number
  photoId: number | null
}

type Point = {
  x: number
  y: number
}

type Area = {
  width: number
  height: number
  x: number
  y: number
}

const PhotoUploadAndPreview = ({ sutraId, photoId }: PhotoUploadAndPreviewProps) => {
  const router = useRouter()

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const [isSelectedImage, setSelectedImage] = useState(false)
  const [previewImage, setPreviewUrl] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const { data: session } = useSession()
  const { location, fetchLocation } = useFetchLocation()
  const reverseGeocodeResult = useReverseGeocode(location)
  const address = reverseGeocodeResult || null

  // デバッグ用で一時的に追加
  useEffect(() => {
    console.log('Location updated:', location)
  }, [location])

  const onCropComplete = useCallback(async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(true)

    if (event.target.files !== null) {
      const file = event.target.files[0]

      await fetchLocation({ file })

      try {
        const heic2any = (await import('heic2any')).default
        if (file.type === 'image/heic') {
          const convertedImage = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.01,
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

  const handleCropConfirm = useCallback(async () => {
    if (!previewImage || !croppedAreaPixels) return
    const croppedImage = await cropImage(previewImage, croppedAreaPixels)
    setCroppedImage(croppedImage)
  }, [previewImage, croppedAreaPixels])

  const handleFileCancel = () => {
    setSelectedImage(false)
    setPreviewUrl(null)
  }

  const handleFileReSelecte = () => {
    setCroppedImage(null)
  }

  const savePhotoData = async () => {
    if (previewImage && croppedImage && session?.user?.email && location && address) {
      let success = false

      const imageUrl: string = previewImage
      const croppedImageUrl: string = croppedImage
      const latitudeData: number = location.lat
      const longitudeData: number = location.lng
      const addressData: string = address
      const currentUserId: number | null = await fetchUserId(session.user.email)
      const currentSutraId: number = sutraId

      try {
        if (photoId) {
          await axios.patch(`${railsApiUrl}/api/v1/photos/${photoId}`, {
            imageUrl,
            croppedImageUrl,
            latitudeData,
            longitudeData,
            addressData,
            currentUserId,
            currentSutraId,
          })
        } else {
          await axios.post(`${railsApiUrl}/api/v1/photos`, {
            imageUrl,
            croppedImageUrl,
            latitudeData,
            longitudeData,
            addressData,
            currentUserId,
            currentSutraId,
          })
        }
        console.log('写真が保存されました')
        alert('写真が保存されました') //最終的にはトーストにする
        success = true
      } catch (error) {
        console.error('写真の保存に失敗しました:', error)
        alert('写真の保存に失敗しました') //最終的にはトーストにする
      }
      if (success) {
        await router.reload()
      }
    } else {
      console.log('写真の保存に失敗しました')
      alert('写真の保存に失敗しました') //最終的にはトーストにする
    }
  }

  return (
    <div>
      {previewImage && isSelectedImage && (
        <div className='crop-container'>
          <Cropper
            image={previewImage}
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
            restrictPosition={true}
            minZoom={0.5}
            maxZoom={5}
          />
        </div>
      )}

      <div>
        {previewImage && croppedImage && isSelectedImage && (
          <Image src={croppedImage} alt='CroppedImage' width={200} height={200} />
        )}
      </div>

      <div>
        {previewImage && isSelectedImage && !croppedImage && (
          <div>
            <div>
              <ActionButton onClick={handleCropConfirm} text='決定' />
            </div>
            <div>
              <ActionButton onClick={handleFileCancel} text='ファイルを再選択' />
            </div>
          </div>
        )}

        {previewImage && isSelectedImage && croppedImage && (
          <div>
            <div>
              <ActionButton onClick={handleFileReSelecte} text='キャンセル' />
            </div>

            <div>
              <ActionButton onClick={savePhotoData} text='保存' />
            </div>
          </div>
        )}
      </div>

      <div>
        {!isSelectedImage && (
          <input
            type='file'
            accept='image/jpeg, image/png, image/heic'
            onChange={handleFileChange}
          />
        )}
      </div>
    </div>
  )
}

export default PhotoUploadAndPreview
