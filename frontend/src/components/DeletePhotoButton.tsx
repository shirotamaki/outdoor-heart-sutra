type Props = {
  onRemove: () => void
  disabled?: boolean
}

const DeletePhotoButton = ({ onRemove, disabled = false }: Props) => {
  return (
    <button onClick={onRemove} disabled={disabled}>
      削除する
    </button>
  )
}

export default DeletePhotoButton
