import { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import CaptureButton from '@/components/CaptureButton'
import CapturedImage from '@/components/CapturedImage'
import DeletePhotoButton from '@/components/DeletePhotoButton'
import DeviceSelector from '@/components/DeviceSelector'
import Map from '@/components/Map'
import useCurrentLocation from '@hooks/useCurrentLocation'
import useVideoDeviceList from '@hooks/useVideoDeviceList'

const Camera = () => {
  const [isCaptureEnable, setCaptureEnable] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [selectedDevice, setSelectedDevice] = useState('')

  const { devices } = useVideoDeviceList()
  const currentLocation = useCurrentLocation()
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

  const capture = useCallback(async () => {
    if (webcamRef.current && !isProcessing) {
      setIsProcessing(true)
      const imageSrc = webcamRef.current.getScreenshot()
      setUrl(imageSrc)
      setCaptureEnable(false)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setIsProcessing(false)
      setMarkerLocation(currentLocation)
    }
  }, [webcamRef, isProcessing, currentLocation])

  const handleRemove = useCallback(async () => {
    if (!isProcessing) {
      setIsProcessing(true)
      setUrl(null)
      setCaptureEnable(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setIsProcessing(false)
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
          <CaptureButton onClick={capture} disabled={isProcessing} />
          <DeviceSelector devices={devices} onSelectDevice={handleDeviceChange} />
        </>
      )}

      {url && (
        <>
          <CapturedImage url={url} width={360} height={360} borderRadius='50px' />
          <DeletePhotoButton onRemove={handleRemove} disabled={isProcessing} />
          <Map markerLocation={markerLocation} />
        </>
      )}
    </>
  )
}

export default Camera
