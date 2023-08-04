import { useSession, signIn } from 'next-auth/react'

const Login = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status !== 'authenticated') {
    return (
      <button
        data-testid='login-button'
        onClick={() => signIn('google', { prompt: 'login', callbackUrl: '/' })}
        className='text-base bg-blue-600 hover:bg-blue-500 text-white font-notoSans py-2 px-4 rounded-full'
      >
        Googleでログインして始める
      </button>
    )
  }
  return null
}

export default Login
