import { useRef, useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import CaptureButton from '@/features/photo/CaptureButton'
import CapturedImage from '@/features/photo/CapturedImage'
import Map from '@/features/map/Map'
import DeviceSelector from '@/features/photo/DeviceSelector'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import useVideoDeviceList from '@/hooks/useVideoDeviceList'

const Camera = () => {
  const [isCaptureEnable, setCaptureEnable] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [selectedDevice, setSelectedDevice] = useState('')

  const { devices } = useVideoDeviceList()
  const { currentLocation, getCurrentLocation } = useCurrentLocation()
  const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number } | null>(null)

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
  if (url && currentLocation) {
    setMarkerLocation({ lat: currentLocation.lat, lng: currentLocation.lng })
  } else {
    setMarkerLocation(null)
  }
}, [url, currentLocation])

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
        } else {
          setMarkerLocation(null)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [webcamRef, isProcessing, getCurrentLocation, currentLocation])

  const handleRemove = useCallback(async () => {
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

  return (
    <>
      <h1>撮影モード</h1>
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
          <CaptureButton onClick={capture} disabled={isProcessing} text="撮影" />
          <DeviceSelector devices={devices} onSelectDevice={handleDeviceChange} />
        </>
      )}

      {url && (
        <>
          <CapturedImage url={url} width={360} height={360} borderRadius='50px' />
          <CaptureButton onClick={handleRemove} disabled={isProcessing} text="撮り直す" />
          <div>
            位置情報: {markerLocation?.lat}  {markerLocation?.lng}
          </div>
          <Map markerLocation={markerLocation} />
        </>
      )}
    </>
  )
}

export default Camera
