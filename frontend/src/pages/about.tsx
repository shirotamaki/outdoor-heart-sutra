import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

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

const About = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='説明' />
      <Header />
      <main className=' bg-beige flex-grow'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl sm:text-4xl md:text-4xl lg:text-5xl text-black/50 font-kinuta mt-6 sm:mt-8 md:mt-10 lg:mt-12'>
            アウトドア般若心経とは...
          </h1>
          <div className='text-left text-lg sm:text-2xl md:text-2xl lg:text-2xl text-black/50 font-kinuta my-4 sm:my-8 md:my-10 lg:my-12 mx-6 sm:mx-12 md:mx-24 lg:mx-32 xl:mx-48'>
            <p className='my-2'>
              「般若心経」278文字を、家を出て（これを「出家」と称す）、街の看板から経文に含まれている文字を捜し写真に収める（これを「写経（写真経）」と称す）行為のことを指します。
            </p>
            <p className='my-2'>
              本家のマイルールとしてなるべく神社仏閣にあるものからは写経しないことになっていますが、すべてはあなた次第です。
            </p>
            <p className='my-2'>
              アウトドア般若心経には、ゴールも目的も存在しません。意味、結果を求めてはいけません。「自分探しならぬ、自分なくし」。アウトドア般若心経を通して般若心経の真髄を感じてください。
            </p>
            <p className='my-2'>
              経文は玄奘訳を基本としながらも一部が違う「流布本」を採用しています。本文266文字に首題12文字を含む合計278文字となります。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default About
