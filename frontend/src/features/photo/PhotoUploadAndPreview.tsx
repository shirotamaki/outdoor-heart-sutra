import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useState, useCallback, useRef } from 'react'
import Cropper from 'react-easy-crop'
import { toast } from 'react-toastify'
import ActionButton from '@/components/ActionButton'
import { railsApiUrl } from '@/config/index'
import cropImage from '@/features/photo/cropImage'
import fetchUserId from '@/features/user/fetchUserId'
import useFetchLocation from '@/hooks/useFetchLocation'
import useReverseGeocode from '@/hooks/useReverseGeocode'
import { PhotoUploadAndPreviewProps, Point, Area } from '@/types/types'

const PhotoUploadAndPreview = ({ sutraId, photoId, sutra }: PhotoUploadAndPreviewProps) => {
  const router = useRouter()

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const [isSelectedImage, setSelectedImage] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [originalBlob, setOriginalBlob] = useState<Blob | File | null>(null)
  const [croppedBlob, setCroppedBlob] = useState<Blob | File | null>(null)
  const [previewImage, setPreviewUrl] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const { data: session } = useSession()
  const { location, fetchLocation } = useFetchLocation()
  const reverseGeocodeResult = useReverseGeocode(location)
  const address = reverseGeocodeResult || null

  const inputFileRef = useRef<HTMLInputElement>(null)

  const onSelectFile = () => {
    inputFileRef.current?.click()
  }

  const onCropComplete = useCallback(async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const previewSelectedImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
            quality: 0.1,
          })
          if (Array.isArray(convertedImage)) {
            throw new Error('Unexpected multiple blobs')
          }

          setPreviewUrl(URL.createObjectURL(convertedImage))
          setOriginalBlob(convertedImage)
        } else {
          setPreviewUrl(URL.createObjectURL(file))
          setOriginalBlob(file)
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
    const croppedBlob = await cropImage(previewImage, croppedAreaPixels)
    const croppedImageUrl = URL.createObjectURL(croppedBlob)
    setCroppedImage(croppedImageUrl)
    setCroppedBlob(croppedBlob)
  }, [previewImage, croppedAreaPixels])

  const handleFileCancel = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage)
      setPreviewUrl(null)
    }
    setSelectedImage(false)
  }

  const handleFileReSelecte = () => {
    if (croppedImage) {
      URL.revokeObjectURL(croppedImage)
      setCroppedImage(null)
    }
  }

  const savePhotoData = async () => {
    if (isSaving) return
    setIsSaving(true)

    try {
      if (originalBlob && croppedBlob && session?.user?.email && location && address) {
        let success = false

        const currentUserId: number | null = await fetchUserId(session.user.email)
        const currentSutraId: number = sutraId

        const formData = new FormData()
        formData.append('image', originalBlob)
        formData.append('croppedImage', croppedBlob, 'croppedImage.jpeg')
        formData.append('latitudeData', String(location.lat))
        formData.append('longitudeData', String(location.lng))
        formData.append('addressData', address)
        formData.append('currentUserId', String(currentUserId))
        formData.append('currentSutraId', String(currentSutraId))

        try {
          if (photoId) {
            await axios.patch(`${railsApiUrl}/api/v1/photos/${photoId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
          } else {
            await axios.post(`${railsApiUrl}/api/v1/photos`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
          }
          console.log('写真が保存されました')
          toast.success('写真が保存されました')
          success = true
        } catch (error) {
          console.error('写真の保存に失敗しました:', error)
          toast.error('写真の保存に失敗しました')
        }
        if (success) {
          setTimeout(async () => {
            await router.reload()
          }, 2000)
        } else {
          console.log('写真の保存に失敗しました')
          toast.error('写真の保存に失敗しました')
        }
      }
    } finally {
      setTimeout(async () => {
        await setIsSaving(false)
      }, 4000)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-5xl text-sutraBlack font-kinuta my-12'>{sutra.kanji}</h1>

      {!isSelectedImage && (
        <div className='flex justify-center mb-8'>
          <button
            onClick={onSelectFile}
            className='bg-fileSelectButton hover:opacity-50 transition-all duration-100 font-notoSans text-base text-white rounded-md py-3 px-7'
          >
            <div className='flex items-cneter'>
              <FontAwesomeIcon
                icon={faCamera}
                style={{
                  color: '#ffffff',
                  width: '18px',
                  height: '18px',
                }}
                className='mt-1'
              />
              <span className='ml-3'>写真を撮る/アップロード</span>
            </div>
          </button>
          <input
            ref={inputFileRef}
            className='hidden'
            role='button'
            data-testid='file-input'
            type='file'
            accept='image/jpeg, image/png, image/heic'
            onChange={previewSelectedImage}
          />
        </div>
      )}

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
            maxZoom={10}
          />
        </div>
      )}

      {previewImage && croppedImage && isSelectedImage && (
        <div className='flex justify-center content-between mt-16 mb-8'>
          <Image
            src={croppedImage}
            alt='CroppedImage'
            width={100}
            height={100}
            className='rounded'
          />
        </div>
      )}

      {previewImage && isSelectedImage && !croppedImage && (
        <div className='flex justify-center content-between'>
          <div
            data-testid='reselect-file-input-button'
            className='bg-blue-300 hover:bg-blue-200 text-gray-700 rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'
          >
            <ActionButton onClick={handleFileCancel} text='写真を再選択' />
          </div>
          <div
            data-testid='file-input-confirm-button'
            className=' bg-blue-500 hover:bg-blue-400 text-white rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'
          >
            <ActionButton onClick={handleCropConfirm} text='決定' />
          </div>
        </div>
      )}

      {previewImage && isSelectedImage && croppedImage && (
        <div className='flex justify-center content-between'>
          <div
            data-testid='cancel-photo-button'
            className=' bg-gray-400 hover:bg-gray-300 text-white rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'
          >
            <ActionButton onClick={handleFileReSelecte} text='キャンセル' />
          </div>
          <div
            data-testid='save-photo-button'
            className={
              isSaving
                ? 'bg-gray-500 text-white rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'
                : 'bg-blue-500 hover:bg-blue-400 text-white rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'
            }
          >
            <ActionButton onClick={savePhotoData} text={isSaving ? '保存中...' : '保存'} />
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoUploadAndPreview
