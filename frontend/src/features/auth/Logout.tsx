import { useSession, signOut } from 'next-auth/react'

const Logout = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <span className='cursor-pointer hover:opacity-50 transition-all duration-100'>
        <span onClick={() => signOut()}>ログアウト</span>
      </span>
    )
  }
  return null
}

export default Logout
