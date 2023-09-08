import { ActionButtonProps } from '@/types/types'

const ActionButton = ({ onClick, disabled = false, text }: ActionButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: '100%', height: '100%' }}>
      {text}
    </button>
  )
}

export default ActionButton
