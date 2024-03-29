import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ComicsSmOrBelow from '@/features/comic/ComicsSmOrBelow'
import ComicsWidth552px from '@/features/comic/ComicsWidth552px'
import ComicsWidth776px from '@/features/comic/ComicsWidth776px'

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
      <Head>
        <title>説明 | アウトドア般若心経</title>
      </Head>
      <Header />
      <main className='bg-beige flex flex-grow justify-center'>
        <article className='flex flex-col items-center m-4'>
          <section className='font-kinuta text-mainBlack lg:max-w-776 sm:max-w-552 max-w-screen-sm mb-8'>
            <h1 className='text-lg md:text-2xl text-center m-4 md:m-8'>アウトドア般若心経とは</h1>
            <p className='text-sm md:text-base mb-4 leading-6 md:leading-8'>
              「般若心経」に含まれる
              278文字を、家を出て（これを「出家」と称す）、全国各地の看板や標識から探して写真に収める（これを「写経（写真経）」と称す）行為のことを指します。
            </p>
            <p className='text-sm md:text-base mb-4 leading-6 md:leading-8'>
              本家のマイルールとして、なるべく神社仏閣にあるものからは写経しないことになっていますが、すべてはあなた次第です。
            </p>
            <p className='text-sm md:text-base mb-4 leading-6 md:leading-8'>
              アウトドア般若心経には、ゴールも目的も存在しません。意味、結果を求めてはいけません。
            </p>
            <p className='text-sm md:text-base mb-4 leading-6 md:leading-8'>
              アウトドア般若心経を通して般若心経の真髄を感じてください。
            </p>
            <p className='italic text-sm md:text-base mb-4 leading-6 md:leading-8'>
              ※
              経文は玄奘訳を基本としながらも一部が違う「流布本」を採用しています。本文266文字に首題12文字を含む合計278文字となります。
            </p>
          </section>
          <section>
            <div className='sm:hidden mb-12'>
              <ComicsSmOrBelow />
            </div>
            <div className='hidden sm:flex lg:hidden mb-12'>
              <ComicsWidth552px />
            </div>
            <div className='hidden lg:flex mb-12'>
              <ComicsWidth776px />
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default About
