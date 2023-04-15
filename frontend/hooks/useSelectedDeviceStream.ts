import { useState, useEffect } from 'react'

const useSelectedDeviceStream = (selectedDeviceId: string | null) => {
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    if (selectedDeviceId) {
      const constraints = {
        video: {
          width: 360,
          height: 360,
          deviceId: selectedDeviceId,
        },
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          setStream(stream)
        })
        .catch((err) => {
          console.error('Error', err)
        })
    }

    return () => {
      setStream((currentStream) => {
        if (currentStream) {
          currentStream.getTracks().forEach((track) => {
            track.stop()
          })
        }
        return null
      })
    }
  }, [selectedDeviceId])

  return stream
}

export default useSelectedDeviceStream
