import Head from 'next/head'
import React from 'react'
import { useSession } from 'next-auth/react'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import DeleteUser from '@/components/DeleteUser'

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
            <img src={session?.user?.image || ''} alt='' style={{ borderRadius: '50px' }} />
            <div>
              <Logout />
            </div>
            <DeleteUser />
            <div>
              <a href='/'>トップページへ</a>
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
