import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}

const MyPage = () => {
  const { data: session, status } = useSession()

  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='マイページ' />
      <Header />
      <main className=' bg-beige flex-grow'>
        <div className='flex flex-col justify-center items-center'>
          <div className='my-12'>
            <Image
              src={session?.user?.image || ''}
              alt='UserIcon'
              width={100}
              height={100}
              style={{ borderRadius: '50px' }}
            />
          </div>
          <p className='font-kinuta text-black/50 text-xl mb-12'>ユーザ名：{session?.user?.name}</p>
          <Link
            href='/delete-account'
            className='hover:opacity-50 transition-all duration-100 font-kinuta text-xl text-red-600'
          >
            退会する
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MyPage
