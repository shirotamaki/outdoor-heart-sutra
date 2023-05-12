import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useRef, useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import { railsApiUrl } from '@/config/index'
import reverseGeocode from '@/features/map/reverseGeocode'
import CapturedImage from '@/features/photo/CapturedImage'
import DeviceSelector from '@/features/photo/DeviceSelector'
import PhotoActionButton from '@/features/photo/PhotoActionButton'
import fetchUserId from '@/features/user/fetchUserId'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import useVideoDeviceList from '@/hooks/useVideoDeviceList'

type CameraProps = {
  sutraId: number
  photoId: number | null
  setEditMode: (value: boolean) => void
}

const Camera = ({ sutraId, photoId, setEditMode }: CameraProps) => {
  const { data: session } = useSession()
  const { devices } = useVideoDeviceList()
  const { currentLocation, getCurrentLocation } = useCurrentLocation()
  const webcamRef = useRef<Webcam | null>(null)

  const [isCaptureEnable, setCaptureEnable] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [capturedImageUrl, setUrl] = useState<string | null>(null)
  const [selectedDevice, setSelectedDevice] = useState('')
  const [address, setAddress] = useState<string | null>(null)
  const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const videoConstraints = {
    width: 360,
    height: 360,
    deviceId: selectedDevice,
  }

  const borderRadiusStyle = {
    borderRadius: '50px',
  }

  useEffect(() => {
    if (capturedImageUrl && currentLocation) {
      setMarkerLocation({ lat: currentLocation.lat, lng: currentLocation.lng })
    } else {
      setMarkerLocation(null)
    }
  }, [capturedImageUrl, currentLocation])

  const capture = useCallback(async () => {
    if (webcamRef.current && !isProcessing) {
      setIsProcessing(true)
      setIsLoading(true)
      const imageSrc = webcamRef.current.getScreenshot()
      setUrl(imageSrc)
      setCaptureEnable(false)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsProcessing(false)
      try {
        const location = await getCurrentLocation()
        if (location) {
          setMarkerLocation({ lat: location.lat, lng: location.lng })
          const fetchedAddress = await reverseGeocode(location.lat, location.lng)
          if (fetchedAddress) {
            const fixAddress = fetchedAddress.replace(/日本、〒\d{3}-\d{4}\s/g, '')
            setAddress(fixAddress)
          } else {
            setAddress(null)
          }
        } else {
          setMarkerLocation(null)
        }
      } catch (error) {
        console.error(error)
      }
      setIsLoading(false)
    }
  }, [webcamRef, isProcessing, getCurrentLocation])

  const handleRemoveCapturedImage = useCallback(async () => {
    if (!isProcessing) {
      setIsProcessing(true)
      setUrl(null)
      setCaptureEnable(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsProcessing(false)
      setMarkerLocation(null)
    }
  }, [isProcessing])

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(deviceId)
  }

  const saveCapturedData = async () => {
    if (capturedImageUrl && markerLocation && address && session?.user?.email) {
      let success = false

      const photoData = capturedImageUrl
      const latitudeData: number = markerLocation.lat
      const longitudeData: number = markerLocation.lng
      const addressData: string = address
      const currentUserId: number | null = await fetchUserId(session.user.email)
      const currentSutraId: number = sutraId

      try {
        let response
        if (photoId) {
          response = await axios.patch(`${railsApiUrl}/api/v1/photos/${photoId}`, {
            photoData,
            latitudeData,
            longitudeData,
            addressData,
            currentUserId,
            currentSutraId,
          })
        } else {
          response = await axios.post(`${railsApiUrl}/api/v1/photos`, {
            photoData,
            latitudeData,
            longitudeData,
            addressData,
            currentUserId,
            currentSutraId,
          })
        }

        if (response.status === 200) {
          console.log('保存が成功しました')
          success = true
        } else {
          console.error('保存に失敗しました')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('保存できません')
        } else {
          console.error('必要なデータが揃っていません')
        }
      }
      if (success) {
        setEditMode(false)
        await router.push(`/sutras/${currentSutraId}`)
      }
    }
  }

  return (
    <>
      {isCaptureEnable && (
        <>
          <Webcam
            audio={false}
            height={videoConstraints.height}
            width={videoConstraints.width}
            style={borderRadiusStyle}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
          />
          <PhotoActionButton onClick={capture} disabled={isProcessing} text='撮影' />
          <DeviceSelector devices={devices} onSelectDevice={handleDeviceChange} />
        </>
      )}
      {capturedImageUrl && (
        <>
          <CapturedImage
            capturedImageUrl={capturedImageUrl}
            width={360}
            height={360}
            borderRadius='50px'
          />
          <div>
            <PhotoActionButton
              onClick={handleRemoveCapturedImage}
              disabled={isProcessing || isLoading}
              text='撮り直す'
            />
          </div>
          <div>
            {isLoading ? <div>処理中...</div> : <button onClick={saveCapturedData}>保存</button>}
          </div>
        </>
      )}
    </>
  )
}

export default Camera
