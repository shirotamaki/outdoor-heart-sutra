import { EditPhotoProps } from '@/types/types'

const EditPhotoForOverMdLayout = ({ setEditMode }: EditPhotoProps) => {
  return (
    <button
      data-testid='reselect-file-input-after-saving-photo-button-for-over-md-layout'
      onClick={() => setEditMode(true)}
    >
      写真を再選択
    </button>
  )
}
export default EditPhotoForOverMdLayout
