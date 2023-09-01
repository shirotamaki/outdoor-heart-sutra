import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import DeleteUser from '@/features/user/DeleteUser'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session || !session.user || !session.user.email) {
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

const DeleteAccount = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='退会' ogUrl='https://www.outdoor-heart-sutra.com/delete-account' />
      <Header />
      <main className=' bg-beige flex-grow'>
        <div className='flex flex-col justify-center items-center m-12'>
          <h1 className='text-mainBlack font-kinuta text-lg md:text-2xl mb-12'>
            アカウントを削除する
          </h1>
          <div className='items-left text-mainBlack font-kinuta text-base md:text-xl'>
            <p className='pb-4'>削除すると以下の情報が全て失われます</p>
            <ul className='list-disc px-6'>
              <li className='pb-2'>写真</li>
              <li className='pb-2'>位置情報</li>
              <li className='pb-2'>メモ</li>
            </ul>
          </div>
          <div className='mt-12'>
            <DeleteUser />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DeleteAccount
