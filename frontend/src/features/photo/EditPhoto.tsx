import { EditPhotoProps } from '@/types/types'

const EditPhoto = ({ setEditMode, is2XlOrBelow }: EditPhotoProps) => {
  return (
    <button
      data-testid={`reselect-file-input-after-saving-photo-button${
        is2XlOrBelow ? '-2XlOrBelow' : '-over2Xl'
      }`}
      onClick={() => setEditMode(true)}
      className='w-300 border border-blue-800  hover:opacity-50 transition-all duration-100 font-notoSans text-base text-blue-800 rounded-md text-center py-2'
    >
      写真を再選択
    </button>
  )
}
export default EditPhoto
