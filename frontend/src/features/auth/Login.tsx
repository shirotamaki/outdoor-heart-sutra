import { useSession, signIn } from 'next-auth/react'
import LoadingSpinner from '@/components/LoadingSpinner'

const Login = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  if (status !== 'authenticated') {
    return (
      <button
        data-testid='login-button'
        onClick={() => signIn('google', { prompt: 'login', callbackUrl: '/' })}
        className='w-full sm:w-fit text-lg sm:text-xl bg-buttonBlack hover:opacity-75 transition-all duration-100 font-notoSans text-white mt-2 mb-6 py-4 px-auto sm:px-20 rounded-md'
      >
        Googleでログインして始める
      </button>
    )
  }
  return null
}

export default Login
