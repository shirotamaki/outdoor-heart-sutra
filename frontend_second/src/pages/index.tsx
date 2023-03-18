import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <div>
      {!session && (
        <>
          <h1>ログインしてください</h1>
          <button onClick={() => signIn('google')}>Googleでログイン</button>
        </>
      )}
      {session && (
        <>
          <h1>ようこそ、{session.user.name}さん！</h1>
          <button onClick={() => signOut()}>ログアウト</button>
        </>
      )}
    </div>
  )
}
