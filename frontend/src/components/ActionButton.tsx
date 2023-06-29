import { ActionButtonProps } from '@/types/types'

const ActionButton = ({ onClick, disabled = false, text }: ActionButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}

export default ActionButton
