type Props = {
  devices: MediaDeviceInfo[]
  onSelectDevice: (deviceId: string) => void
}

const DeviceSelector = ({ devices, onSelectDevice }: Props) => {
  return (
    <select onChange={(e) => onSelectDevice(e.target.value)}>
      {devices.map((v) => (
        <option key={v.deviceId} value={v.deviceId}>
          {v.label}
        </option>
      ))}
    </select>
  )
}

export default DeviceSelector
