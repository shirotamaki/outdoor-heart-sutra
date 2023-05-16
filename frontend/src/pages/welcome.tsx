import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Login from '@/features/auth/Login'
import Logout from '@/features/auth/Logout'
import DeleteUser from '@/features/user/DeleteUser'

const WelcomePage = () => {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>アウトドア般若心経 | welcome</title>
      </Head>
      <div>
        {status === 'authenticated' ? (
          <div>
            <Link href='/'>トップページ</Link>
          </div>
        ) : null}
        <h1>アウトドア般若心経</h1>
        <p>自分探しならぬ、自分なくしの旅へ</p>
        {status === 'authenticated' ? (
          <>
            <p>セッションの期限：{session?.expires}</p>
            <p>ようこそ、{session?.user?.name}さん</p>
            <Image
              src={session?.user?.image || ''}
              alt='UserIcon'
              width={50}
              height={50}
              style={{ borderRadius: '50px' }}
            />
            <div>
              <Logout />
            </div>
            <DeleteUser />
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  )
}

export default WelcomePage
