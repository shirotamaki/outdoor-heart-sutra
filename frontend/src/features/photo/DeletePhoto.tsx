import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { railsApiUrl } from '@/config/index'
import { DeletePhotoProps } from '@/types/types'

const DeletePhoto = ({ photoId }: DeletePhotoProps) => {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmation = window.confirm('写真、位置情報、メモを削除しますか？')

    if (!confirmation) {
      return
    }

    try {
      await axios.delete(`${railsApiUrl}/api/v1/photos/${photoId}`)
      router.reload()
    } catch (error) {
      console.error('Error deleting photo:', error)
      toast.error('写真の削除に失敗しました')
    }
  }

  return <button onClick={handleDelete}>削除する</button>
}

export default DeletePhoto
