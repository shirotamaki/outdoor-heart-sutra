type EditPhotoProps = {
  setEditMode: (value: boolean) => void
}

const EditPhoto = ({ setEditMode }: EditPhotoProps) => {
  return <button onClick={() => setEditMode(true)}>写真を再選択</button>
}
export default EditPhoto
