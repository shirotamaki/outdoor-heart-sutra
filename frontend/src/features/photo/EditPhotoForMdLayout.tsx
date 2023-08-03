import { EditPhotoProps } from '@/types/types'

const EditPhotoForMdLayout = ({ setEditMode }: EditPhotoProps) => {
  return (
    <button
      data-testid='reselect-file-input-after-saving-photo-button-for-md-layout'
      onClick={() => setEditMode(true)}
    >
      写真を再選択
    </button>
  )
}
export default EditPhotoForMdLayout
