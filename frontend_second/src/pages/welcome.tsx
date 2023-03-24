import Head from 'next/head'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>アウトドア般若心経 | welcome</title>
      </Head>
      <div>
        <h1>アウトドア般若心経</h1>
        <p>自分探しならぬ、自分なくしの旅へ</p>
        <Login />
      </div>
    </>
  )
}

const Login = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'authenticated') {
    return (
      <div>
        <p>セッションの期限：{session.expires}</p>
        <p>ようこそ、{session.user.name}さん</p>
        <p>ようこそ、{session.user.email}さん</p>
        <img src={session.user.image} alt='' style={{ borderRadius: '50px' }} />
        <div>
          <button onClick={() => signOut()}>ログアウト</button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p>あなたはログインしていません</p>
        <button onClick={() => signIn('google', null, { prompt: 'login' })}>Googleでログイン</button>
      </div>
    )
  }
}

export default LoginPage
