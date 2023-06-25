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

    const confirmation = window.confirm('アカウントを削除しますか？')

    if (!confirmation) {
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
      <button
        onClick={() => handleDeleteUser()}
        className='hover:opacity-50 transition-all duration-100 text-base bg-red-500 hover:bg-red-700 text-white font-notoSans py-2 px-4 rounded-full'
      >
        アカウントを削除する
      </button>
    )
  }
  return null
}

export default DeleteUser
