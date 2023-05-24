import axios from 'axios'
import { useSession, signOut } from 'next-auth/react'
import { railsApiUrl } from '@/config/index'

const DeleteUser = () => {
  const { data: session } = useSession()

  const handleDeleteUser = async () => {
    if (!session || !session.user) {
      console.error('セッションが存在しません')
      return
    }

    try {
      const response = await axios.delete(`${railsApiUrl}/users/${session.user.email}`)

      if (response.status === 204) {
        signOut({
          callbackUrl: `/`,
        })
      } else {
        console.error('アカウント削除に失敗しました')
      }
    } catch (error) {
      console.error('エラーだよ全員集合！', error)
    }
  }

  if (session) {
    return (
      <div>
        <button onClick={() => handleDeleteUser()}>アカウントを削除する</button>
      </div>
    )
  }
  return null
}

export default DeleteUser
