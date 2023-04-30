import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRef, useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import { railsApiUrl } from '@/config/index'
import Map from '@/features/map/Map'
import reverseGeocode from '@/features/map/reverseGeocode'
import CaptureButton from '@/features/photo/CaptureButton'
import CapturedImage from '@/features/photo/CapturedImage'
import DeviceSelector from '@/features/photo/DeviceSelector'
import fetchUserId from '@/features/user/fetchUserId'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import useVideoDeviceList from '@/hooks/useVideoDeviceList'

type Props = {
  sutra_id: number
}

const Camera = ({ sutra_id }: Props) => {
  const { data: session } = useSession()

  const [isCaptureEnable, setCaptureEnable] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [capturedImageUrl, setUrl] = useState<string | null>(null)
  const [selectedDevice, setSelectedDevice] = useState('')

  const { devices } = useVideoDeviceList()
  const { currentLocation, getCurrentLocation } = useCurrentLocation()
  const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number } | null>(null)

  const [address, setAddress] = useState<string | null>(null)

  const videoConstraints = {
    width: 360,
    height: 360,
    deviceId: selectedDevice,
  }

  const borderRadiusStyle = {
    borderRadius: '50px',
  }

  const webcamRef = useRef<Webcam | null>(null)

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
      const photo_data = capturedImageUrl
      const latitude_data: number = markerLocation.lat
      const longitude_data: number = markerLocation.lng
      const address_data: string = address
      const current_user_id: number | null = await fetchUserId(session.user.email)
      const current_sutra_id: number = sutra_id

      try {
        const response = await axios.post(`${railsApiUrl}/api/v1/photos`, {
          photo_data,
          latitude_data,
          longitude_data,
          address_data,
          current_user_id,
          current_sutra_id,
        })
        if (response.status === 200) {
          return true
        } else {
          return false
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('保存できません')
        } else {
          console.error('必要なデータが揃っていません')
        }
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
          <CaptureButton onClick={capture} disabled={isProcessing} text='撮影' />
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
          <CaptureButton
            onClick={handleRemoveCapturedImage}
            disabled={isProcessing}
            text='撮り直す'
          />
          <div>
            位置情報: {markerLocation?.lat} {markerLocation?.lng}
          </div>
          <div>住所： {address}</div>
          <Map markerLocation={markerLocation} />
          <div>
            <button onClick={saveCapturedData}>保存</button>
          </div>
        </>
      )}
    </>
  )
}

export default Camera
