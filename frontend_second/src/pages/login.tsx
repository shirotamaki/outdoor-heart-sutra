import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const login = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>ようこそ、{session.user.name}さん</p>
        <img src={session.user.image} alt='' style={{ borderRadius: '50px' }} />
        <button onClick={() => signOut()}>ログアウト</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>あなたはログインしていません</p>
        <button onClick={() => signIn()}>Googleでログイン</button>
      </div>
    )
  }
}

export default login
