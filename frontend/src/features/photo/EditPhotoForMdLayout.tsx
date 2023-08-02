import { EditPhotoProps } from '@/types/types'

const EditPhotoForMdLayout = ({ setEditMode }: EditPhotoProps) => {
  return (
    <button
      data-testid='reselection-file-input-after-saving-photo-button-md-layout'
      onClick={() => setEditMode(true)}
    >
      写真を再選択
    </button>
  )
}
export default EditPhotoForMdLayout
