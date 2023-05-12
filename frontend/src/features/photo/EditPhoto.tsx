type EditPhotoProps = {
  setEditMode: (value: boolean) => void
}

const EditPhoto = ({ setEditMode }: EditPhotoProps) => {
  return <button onClick={() => setEditMode(true)}>編集</button>
}
export default EditPhoto
