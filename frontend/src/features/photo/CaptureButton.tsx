type Props = {
  onClick: () => void
  disabled?: boolean
}

const CaptureButton = ({ onClick, disabled = false }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      撮影する
    </button>
  )
}

export default CaptureButton
