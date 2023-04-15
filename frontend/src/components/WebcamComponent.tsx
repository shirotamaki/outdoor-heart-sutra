import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import useSelectedDeviceStream from '@hooks/useSelectedDeviceStream'
import useVideoDeviceList from '@hooks/useVideoDeviceList'

const WebcamComponent = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(true)
  const webcamRef = useRef<Webcam>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const { devices } = useVideoDeviceList()
  const getDevice =
    (devices && selectedDevice && devices.find((v) => v.deviceId === selectedDevice)) || null

  const stream = useSelectedDeviceStream(selectedDevice)

  // 選択されたメディアストリームが変更されたら、WebcamコンポーネントのsrcObjectを更新する
  useEffect(() => {
    if (webcamRef.current && stream) {
      const video = webcamRef.current.video as HTMLVideoElement
      if (video.srcObject !== stream) {
        video.srcObject = stream
      }
    }
  }, [stream])

  // 利用デバイスの初期設定
  useEffect(() => {
    devices && devices[0] && setSelectedDevice(devices[0].deviceId)
  }, [devices])

  // キャプチャ用
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setUrl(imageSrc)
    }
  }, [webcamRef])

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
              videoConstraints={{
                width: 360,
                height: 360,
                deviceId: getDevice?.deviceId || undefined,
              }}
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
          <select onChange={(e) => setSelectedDevice(e.target.value)}>
            {devices.map((v) => (
              <option key={v.deviceId} value={v.deviceId}>
                {v.label}
              </option>
            ))}
          </select>
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
