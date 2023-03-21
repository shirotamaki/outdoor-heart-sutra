import Head from 'next/head'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function () {
  return (
    <>
      <Head>
        <title>アウトドア般若心経 | welcome</title>
      </Head>
      <div>
        <h1>アウトドア般若心経</h1>
        <p>自分探しならぬ、自分なくしの旅へ</p>
        {login()}
      </div>
    </>
  )
}

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
        <button onClick={() => signIn('google')}>Googleでログイン</button>
      </div>
    )
  }
}
