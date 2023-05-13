type EditPhotoProps = {
  setEditMode: (value: boolean) => void
}

const EditPhoto = ({ setEditMode }: EditPhotoProps) => {
  return <button onClick={() => setEditMode(true)}>写真を撮り直す</button>
}
export default EditPhoto
