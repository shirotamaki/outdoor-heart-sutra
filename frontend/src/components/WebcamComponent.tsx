import Image from 'next/image'
import { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'

type FacingModeType = string | { exact: string }

const frontCamera: FacingModeType = 'user'
const rearCamera: FacingModeType = { exact: 'environment' }

const WebcamComponent = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(true)
  const webcamRef = useRef<Webcam>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<FacingModeType>(rearCamera)

  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: facingMode,
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setUrl(imageSrc)
    }
  }, [webcamRef])

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === frontCamera ? rearCamera : frontCamera))
  }

  return (
    <>
      <h1>撮影モード</h1>
      {isCaptureEnable && (
        <>
          <div>
            <Webcam
              audio={false}
              width={360}
              height={360}
              style={{ borderRadius: '50px' }}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              videoConstraints={videoConstraints}
              playsInline
            />
          </div>
          <button
            onClick={() => {
              capture(), setCaptureEnable(false)
            }}
          >
            撮影する
          </button>
          <button onClick={toggleCamera}>カメラを切り替える</button>
        </>
      )}
      {url && (
        <>
          <div>
            <Image
              src={url}
              alt='Screenshot'
              width={360}
              height={360}
              style={{ borderRadius: '50px' }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                setUrl(null), setCaptureEnable(true)
              }}
            >
              削除する
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default WebcamComponent
