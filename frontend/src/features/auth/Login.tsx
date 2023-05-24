import { useSession, signIn } from 'next-auth/react'

const Login = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status !== 'authenticated') {
    return (
      <div>
        <button onClick={() => signIn('google', { prompt: 'login', callbackUrl: '/' })}>
          Googleでログインして始める
        </button>
      </div>
    )
  }
  return null
}

export default Login
