import { EditPhotoProps } from '@/types/types'

const EditPhotoForMdLayout = ({ setEditMode }: EditPhotoProps) => {
  return (
    <button
      data-testid='reselect-file-input-after-saving-photo-button-for-md-layout'
      onClick={() => setEditMode(true)}
      className='w-280 bg-blue-300 hover:bg-blue-200 text-gray-700 rounded-full font-notoSans text-sm mx-4 mt-8 px-4 py-2'
    >
      写真を再選択
    </button>
  )
}
export default EditPhotoForMdLayout
