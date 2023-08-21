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
      <CustomHead title='説明' ogUrl='https://www.outdoor-heart-sutra.com/about' />
      <Header />
      <main className='bg-beige flex flex-grow justify-center'>
        <article className='max-w-screen-sm  font-kinuta text-black/50 p-8'>
          <h1 className='text-2xl md:text-4xl mb-8 text-center'>アウトドア般若心経とは...</h1>
          <p className='text-sm md:text-xl mb-4'>
            「般若心経」278文字を、家を出て（これを「出家」と称す）、街の看板から経文に含まれている文字を捜し写真に収める（これを「写経（写真経）」と称す）行為のことを指します。
          </p>
          <p className='text-sm md:text-xl mb-4'>
            本家のマイルールとしてなるべく神社仏閣にあるものからは写経しないことになっていますが、すべてはあなた次第です。
          </p>
          <p className='text-sm md:text-xl mb-4'>
            アウトドア般若心経には、ゴールも目的も存在しません。
          </p>
          <p className='text-sm md:text-xl mb-4'>
            意味、結果を求めてはいけません。アウトドア般若心経を通して般若心経の真髄を感じてください。
          </p>
          <p className='text-sm md:text-xl mb-4'>
            経文は玄奘訳を基本としながらも一部が違う「流布本」を採用しています。本文266文字に首題12文字を含む合計278文字となります。
          </p>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default About
