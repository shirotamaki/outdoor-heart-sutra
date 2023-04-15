import { useState, useEffect, useCallback } from 'react'

const useVideoDeviceList = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

  const refreshDevices = useCallback(async () => {
    await navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === 'videoinput')
        setDevices(videoDevices)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    refreshDevices()
    navigator.mediaDevices.addEventListener('devicechange', refreshDevices)
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', refreshDevices)
    }
  }, [refreshDevices])

  return { devices }
}

export default useVideoDeviceList
