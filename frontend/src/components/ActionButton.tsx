type Props = {
  onClick: () => void
  disabled?: boolean
  text: string
}

const ActionButton = ({ onClick, disabled = false, text }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default ActionButton
