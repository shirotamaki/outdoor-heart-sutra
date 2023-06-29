import { EditPhotoProps } from '@/types/types'

const EditPhoto = ({ setEditMode }: EditPhotoProps) => {
  return <button onClick={() => setEditMode(true)}>写真を再選択</button>
}
export default EditPhoto
