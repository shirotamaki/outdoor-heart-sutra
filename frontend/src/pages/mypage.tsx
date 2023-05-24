import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
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
    <div>
      <CustomHead title='マイページ' />
      <Header />
      <main>
        <div>
          <p>ようこそ、{session?.user?.name}さん</p>
        </div>
        <div>
          <Image
            src={session?.user?.image || ''}
            alt='UserIcon'
            width={50}
            height={50}
            style={{ borderRadius: '50px' }}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MyPage
