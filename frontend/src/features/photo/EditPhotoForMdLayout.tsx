import { EditPhotoProps } from '@/types/types'

const EditPhotoForMdLayout = ({ setEditMode }: EditPhotoProps) => {
  return (
    <button
      data-testid='reselect-file-input-after-saving-photo-button-for-md-layout'
      onClick={() => setEditMode(true)}
      className='w-300 bg-buttonBlack hover:opacity-50 transition-all duration-100 font-notoSans text-base text-white font-extrabold rounded-md text-center py-2'
    >
      写真を再選択
    </button>
  )
}
export default EditPhotoForMdLayout
