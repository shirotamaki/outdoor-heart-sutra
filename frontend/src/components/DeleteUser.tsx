import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import axios from 'axios'

const DeleteUser = () => {
  const { data: session } = useSession()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const handleDeleteUser = async () => {
    if (!session || !session.user) {
      console.error('セッションが存在しません')
      return
    }

    try {
      const response = await axios.delete(`${apiUrl}/users/${session.user.email}`)

      if (response.status === 204) {
        signOut()
      } else {
        console.error('アカウント削除に失敗しました')
      }
    } catch (error) {
      console.log('エラーだよ全員集合！', error)
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
