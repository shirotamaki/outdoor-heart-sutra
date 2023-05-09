import axios from 'axios'
import { useRouter } from 'next/router'
import { railsApiUrl } from '@/config/index'

type DeletePhotoProps = {
  photoId: number
}

const DeletePhoto = ({ photoId }: DeletePhotoProps) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await axios.delete(`${railsApiUrl}/api/v1/photos/${photoId}`)
      alert('写真が削除されました') //最終的にはトーストにする
      router.reload()
    } catch (error) {
      console.error('Error deleting photo:', error)
      alert('写真の削除に失敗しました') //最終的にはトーストにする
    }
  }

  return <button onClick={handleDelete}>写真を削除する</button>
}

export default DeletePhoto
