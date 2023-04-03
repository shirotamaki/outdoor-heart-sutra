import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React from 'react'
import DeleteUser from '@/components/DeleteUser'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

const WelcomePage: React.FC = () => {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>アウトドア般若心経 | welcome</title>
      </Head>
      <div>
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
            <div>
              <Link href='/'>トップページへ</Link>
            </div>
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  )
}

export default WelcomePage
